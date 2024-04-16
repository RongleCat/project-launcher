import path from 'path-browserify'
import { readFile, writeFile, readDir, unlink, pathNormalization } from './system'
import { ChildInfo, Project, Config, InitParams, Platforms, Editors } from './types'
import { PlatformType } from './constant'
import { ignoreFoldersReg } from './config'

/**
 * @description: 初始化核心模块，将缓存文件路径，工作区参数挂载到全局对象
 * @param {InitParams} initParams
 * @return {*}
 */
export function init(initParams: InitParams): void {
  const { cachePath, workspaces, platformType } = initParams

  const platform: Platforms = {
    isMac: platformType === PlatformType.MAC,
    isWindows: platformType === PlatformType.WINDOWS,
    isLinux: platformType === PlatformType.LINUX
  }

  Object.assign(global, {
    cachePath,
    workspaces: workspaces.split(/[,，]/),
    platform
  })
}

/**
 * @description: 合并编辑器配置
 * @param {Editors} editor 缓存中的编辑器配置
 * @param {Project[]} cache 项目合集
 * @return {Editors} 合并后的编辑器配置
 */
function combinedEditorList(editor: Editors, cache: Project[]): Editors {
  const newEditor = { ...editor }
  const currentEditor = Object.keys(newEditor)
  cache.forEach(({ type }: Project) => {
    if (!currentEditor.includes(type)) {
      newEditor[type] = ''
    }
  })
  return newEditor
}

/**
 * @description: 读取缓存
 * @return {Promise<Config>} 缓存内容
 */
export async function readCache(): Promise<Config> {
  const { cachePath } = global
  if (!cachePath) {
    throw new Error('104')
  }

  try {
    const history = await readFile(cachePath)
    return JSON.parse(history) ?? { editor: {}, cache: [] }
  } catch (error: any) {
    if (error.message === '100') {
      // eslint-disable-next-line no-use-before-define
      writeCache([])
      return { editor: {}, cache: [] }
    }
    return { editor: {}, cache: [] }
  }
}

/**
 * @description: 写入缓存
 * @param {Project} newCache 最新的项目查找结果集合
 * @return {Promise<void>}
 */
export async function writeCache(newCache: Project[]): Promise<void> {
  const { cachePath } = global
  if (!cachePath) {
    throw new Error('104')
  }

  const { editor } = await readCache()
  const newEditorList = combinedEditorList(editor, newCache)
  const newConfig = { editor: newEditorList, cache: newCache }
  const historyString = JSON.stringify(newConfig, null, 2)
  await writeFile(cachePath, historyString)
}

/**
 * @description: 更新缓存时合并项目点击数
 * @param {Project[]} newCache 最新的项目查找结果集合
 * @return {Promise<Project[]>} 合并后的项目集合
 */
async function combinedCache(newCache: Project[]): Promise<Project[]> {
  const { cache } = await readCache()
  // 筛选有点击记录的项目
  const needMergeList = {} as { [key: string]: Project }
  cache
    .filter((item: Project) => item.hits > 0 || item.idePath)
    .forEach((item: Project) => {
      needMergeList[item.path] = item
    })
  // 合并点击数
  newCache.forEach((item: Project) => {
    const selfItem = item
    const cacheItem = needMergeList[selfItem.path] ?? {}
    const { hits = 0, idePath = '' } = cacheItem
    selfItem.hits = selfItem.hits > hits ? selfItem.hits : hits
    selfItem.idePath = idePath
  })
  return newCache
}

/**
 * @description: 查找项目内的 submodule
 * @param {string} projectPath 项目路径
 * @return {Promise<ChildInfo[]>} submodule 目录合集
 */
export async function findSubmodules(projectPath: string): Promise<ChildInfo[]> {
  const fileContent = await readFile(projectPath)
  const matchModules = fileContent.match(/(?<=path = )([\S]*)(?=\n)/g) ?? []
  return matchModules.map((module) => ({
    name: module,
    isDir: true,
    path: path.join(path.dirname(projectPath), module)
  }))
}

/**
 * @description: 判断文件集合中是否包含指定文件
 * @param {ChildInfo} allFile 所有文件集合
 * @param {string} fileNames 文件名称
 * @return {boolean}
 */
function findFileFromProject(allFile: ChildInfo[], fileNames: string[]): boolean {
  const reg = new RegExp(`^(${fileNames.join('|')})$`, 'i')
  const findFileList = allFile.filter(({ name }: { name: string }) => reg.test(name))

  return findFileList.length === fileNames.length
}

/**
 * @description: 判断依赖集合中是否包含指定依赖
 * @param {string} allDependList 总依赖集合
 * @param {string} dependList 包含的依赖集合
 * @return {boolean}
 */
function findDependFromPackage(allDependList: string[], dependList: string[]): boolean {
  const reg = new RegExp(`^(${dependList.join('|')})$`, 'i')
  const findDependList = allDependList.filter((item: string) => reg.test(item))

  return findDependList.length >= dependList.length
}

/**
 * @description: 获取 package.json 文件内的依赖列表
 * @param {ChildInfo} allFile 所有用于判断的文件列表
 * @return {Promise<string[]>} 查找到的所有依赖名称集合
 */
async function getDependList(allFile: ChildInfo[]): Promise<string[]> {
  const packageJsonFilePath = allFile.find(({ name }) => name === 'package.json')?.path ?? ''
  if (!packageJsonFilePath) {
    return []
  }
  const { dependencies = [], devDependencies = [] } = JSON.parse(await readFile(packageJsonFilePath))
  const dependList = { ...dependencies, ...devDependencies }
  return Object.keys(dependList)
}

/**
 * @description: 解析项目类型
 * @param {ChildInfo} children 项目下包含的文件列表
 * @return {*}
 */
async function projectTypeParse(children: ChildInfo[]): Promise<string> {
  if (findFileFromProject(children, ['cargo.toml'])) {
    return 'rust'
  }
  if (findFileFromProject(children, ['pubspec.yaml'])) {
    return 'dart'
  }
  if (findFileFromProject(children, ['.*.xcodeproj'])) {
    return 'applescript'
  }
  if (findFileFromProject(children, ['app', 'gradle'])) {
    return 'android'
  }
  // js 项目还可以细分
  if (findFileFromProject(children, ['package.json'])) {
    if (findFileFromProject(children, ['nuxt.config.js'])) {
      return 'nuxt'
    }
    if (findFileFromProject(children, ['vue.config.js'])) {
      return 'vue'
    }
    if (findFileFromProject(children, ['.vscodeignore'])) {
      return 'vscode'
    }

    const isTS = findFileFromProject(children, ['tsconfig.json'])
    const dependList = await getDependList(children)

    if (findDependFromPackage(dependList, ['react'])) {
      return isTS ? 'react_ts' : 'react'
    }

    if (findDependFromPackage(dependList, ['hexo'])) {
      return 'hexo'
    }

    return isTS ? 'typescript' : 'javascript'
  }
  return 'unknown'
}

/**
 * @description: 递归查找指定目录下的 git 项目
 * @param {string} dirPath 目录路径
 * @return {Promise<Project[]>} 查找到的项目集合
 */
export async function findProject(dirPath: string): Promise<Project[]> {
  const result: Project[] = []
  let currentChildren: ChildInfo[] = []

  if (ignoreFoldersReg.test(dirPath)) {
    return result
  }

  try {
    currentChildren = await readDir(dirPath)
  } catch (error) {
    console.log(error)

    return result
  }

  const isGitProject = currentChildren.some(({ name }: { name: string }) => name === '.git')

  const hasSubmodules = currentChildren.some(({ name }: { name: string }) => name === '.gitmodules')

  if (isGitProject) {
    result.push({
      name: path.basename(dirPath),
      path: pathNormalization(dirPath),
      type: await projectTypeParse(currentChildren),
      hits: 0,
      idePath: ''
    })
  }

  let nextLevelDir: ChildInfo[] = []
  if (!isGitProject) {
    nextLevelDir = currentChildren.filter(({ isDir }: { isDir: boolean }) => isDir)
  }
  if (isGitProject && hasSubmodules) {
    nextLevelDir = await findSubmodules(path.join(dirPath, '.gitmodules'))
  }

  for (let i = 0; i < nextLevelDir.length; i += 1) {
    const dir = nextLevelDir[i]
    // eslint-disable-next-line no-await-in-loop
    result.push(...(await findProject(path.join(dirPath, dir.name))))
  }
  return result
}

/**
 * @description: 根据关键字过滤项目
 * @param {Project} projectList 项目合集
 * @param {string} keyword 关键字
 * @return {Project[]} 符合关键字匹配的项目合集
 */
export function filterProject(projectList: Project[], keyword: string): Project[] {
  const result = projectList.filter(({ name }: { name: string }) => {
    const reg = new RegExp(keyword, 'i')
    return reg.test(name)
  })

  // 排序规则：项目名称以关键词开头的权重最高，剩余的以点击量降序排序
  const startMatch: Project[] = []
  const otherMatch: Project[] = []
  result.forEach((item) => {
    if (item.name.startsWith(keyword)) {
      startMatch.push(item)
    } else {
      otherMatch.push(item)
    }
  })

  return [...startMatch.sort((a: Project, b: Project) => b.hits - a.hits), ...otherMatch.sort((a: Project, b: Project) => b.hits - a.hits)]
}

/**
 * @description: 在多个工作目录下搜索项目
 * @return {Promise<Project[]>} 查找到的项目合集
 */
async function batchFindProject(): Promise<Project[]> {
  const { workspaces } = global
  if (!workspaces.length) {
    throw new Error('103')
  }

  const projectList: Project[] = []
  for (let i = 0; i < workspaces.length; i += 1) {
    const dirPath = workspaces[i]
    console.log(`searching ${dirPath}`)

    // eslint-disable-next-line no-await-in-loop
    const children = await findProject(dirPath)
    projectList.push(...children)
  }
  return projectList
}

/**
 * @description: 从缓存中过滤
 * @param {string} keyword 关键字
 * @return {Promise<Project[]>} 匹配结果项目合集
 */
export async function filterWithCache(keyword: string): Promise<Project[]> {
  const { cache } = await readCache()
  return filterProject(cache, keyword)
}

/**
 * @description: 从搜索结果中过滤
 * @param {string} keyword 关键字
 * @return {Promise<Project[]>} 匹配结果项目合集
 */
export async function filterWithSearchResult(keyword: string): Promise<Project[]> {
  try {
    const projectList: Project[] = await batchFindProject()
    await writeCache(await combinedCache(projectList))
    return filterWithCache(keyword)
  } catch (error: any) {
    console.log(error.message)
    return Promise.resolve([])
  }
}

/**
 * @description: 清除缓存
 * @return {*}
 */
export async function clearCache(): Promise<void> {
  const { cachePath } = global
  if (!cachePath) {
    throw new Error('104')
  }

  await unlink(cachePath)
}

export default {
  filterWithCache,
  filterWithSearchResult
}
