import { readCache, writeCache } from './core'
import { ResultItem, Project } from './types'
import { COMMAND } from './constant'

/**
 * @description: 兜底方案，返回文件夹打开的应用路径
 * @param {*}
 * @return {*}
 */
function openFolderAppPath(): string {
  const { platform } = global
  if (platform.isWindows) {
    return 'start'
  }

  return 'Finder'
}

/**
 * @description: windows 下终端命令处理
 * @param {string} realAppPath 应用路径
 * @param {string} projectPath 项目路径
 * @return {*}
 */
function windowsTerminal(realAppPath: string, projectPath: string): string {
  if (/powershell/i.test(realAppPath)) {
    return `start powershell -NoExit -Command "cd ${projectPath}"`
  }

  if (/cmd/i.test(realAppPath)) {
    return `start /D ${projectPath}`
  }

  throw new Error('109')
}

/**
 * @description: 处理 windows 路径
 * @param {string} path
 * @return {*}
 */
export function pathConvert(path: string): string {
  return platform.isMac ? path : path.replace(/\\/g, '\\\\')
}

/**
 * @description: 获取打开项目的命令
 * @param {string} commandType 命令类型
 * @param {ResultItem} projectItem 项目信息
 * @return {*}
 */
export async function getOpenCommand(projectItem: ResultItem, commandType: string = COMMAND.FOLDER_OPEN, defaultAppPath = ''): Promise<string> {
  const { editor } = await readCache()
  const { type = '', path = '', idePath } = projectItem ?? {}
  // 类型应用
  const typeAppPath = editor?.[type] ?? ''
  // 最终使用的应用
  const targetAppPath = idePath || typeAppPath || defaultAppPath

  let realAppPath = pathConvert(targetAppPath)
  const projectPath = pathConvert(path)

  // 打开文件夹为兜底选项
  if (!realAppPath) {
    realAppPath = openFolderAppPath()
  }

  if (platform.isMac) {
    return `open -a "${realAppPath}" "${projectPath}"`
  }

  if (commandType === COMMAND.TERMINAL_OPEN) {
    return windowsTerminal(realAppPath, projectPath)
  }

  if (realAppPath === 'start') {
    return `start ${projectPath}`
  }

  return `"${realAppPath}" "${projectPath}"`
}

/**
 * @description: 设置项目专属编辑器
 * @param {string} projectPath 被选择的项目条目
 * @param {string} appPath 应用路径
 * @return {*}
 */
export async function setProjectApp(projectPath: string, appPath: string): Promise<void> {
  const { cache: cacheList = [] } = await readCache()
  if (!appPath) {
    throw new Error('111')
  }

  const targetProject = cacheList.find((item: Project) => item.path === projectPath)

  if (!targetProject) {
    throw new Error('110')
  }

  // 更新项目编辑器
  targetProject.idePath = appPath
  await writeCache(cacheList)
}

/**
 * @description: 更新项目打开次数，用于排序
 * @param {string} projectPath 被选择的项目路径
 * @return {Promise<void>}
 */
export async function updateHits(projectPath: string): Promise<void> {
  const { cache: cacheList = [] } = await readCache()

  const targetProject = cacheList.find((item: Project) => item.path === projectPath)

  if (!targetProject) {
    throw new Error('110')
  }

  targetProject.hits += 1
  await writeCache(cacheList)
}
