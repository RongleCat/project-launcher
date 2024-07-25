import { PlatformType } from './constant'

// 版本控制类型
export type VersionCtrlType = 'Git' | 'Svn' | 'Mercurial' | 'None'

// 平台类型判断
export type Platforms = {
  isMac: boolean
  isWindows: boolean
  isLinux: boolean
}

// 匹配规则拆解
export type MatchRuleDetails = {
  file?: string
  includes?: string[]
  excludes?: string[]
}

// 匹配规则
export type MatchRule = {
  id: string
  name: string
  rule: string
  icon: string
  weight?: number
  details?: MatchRuleDetails
}

// 启动器
export type Launcher = {
  id: string // 唯一标识符
  name: string // 名称
  path: string // 应用路径
  command: string // 启动命令
  isCommand: boolean // 是否以命令模式运行
}

// 初始化参数
export type InitParams = {
  cachePath: string
  workspaces: string
  ignoreFileNames: string[]
  platformType?: PlatformType
}

// 遍历文件夹时获取的文件信息
export type ChildInfo = {
  name: string
  path: string
  isDir: boolean
}

// 项目类型的编辑器绑定
export type ProjectTypeItem = {
  matchRule: MatchRule
  launcher?: Launcher['id']
}

// 项目信息
export type Project = {
  name: string
  path: string
  type: string
  hits: number
  isCustom?: boolean
  versionCtrl?: VersionCtrlType
  launcher?: Launcher['id']
  top?: boolean
}

// 返回给 List 的条目信息
export type ResultItem = {
  title: string
  description: string
  icon: string
  type?: string
  arg?: string
  path?: string
  isCustom?: boolean
  versionCtrl?: VersionCtrlType
  launcher?: string
}

// 缓存/设置对象
export type Config = {
  projectTypeCache: ProjectTypeItem[]
  projectCache: Project[]
  ignoreFileNames: string[]
  customProjectFolders: string[]
  launcher: Launcher[]
}
