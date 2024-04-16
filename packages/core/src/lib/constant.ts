import { getEnv } from './system'

// 执行的命令
export enum COMMAND {
  OPEN = 'open',
  GIT_GUI_OPEN = 'git_gui_open',
  TERMINAL_OPEN = 'terminal_open',
  FOLDER_OPEN = 'folder_open',
  SET_APPLICATION = 'set_application'
}

// 系统平台枚举
export enum PlatformType {
  MAC = 'Mac',
  WINDOWS = 'Windows',
  LINUX = 'Linux'
}

// 错误代码对应的文字提示
export const ErrorCodeMessage: { [code: string]: string } = {
  '100': '文件读取失败',
  '101': '文件写入失败',
  '102': '文件删除失败',
  '103': '工作目录未配置',
  '104': '缓存文件路径未配置',
  '105': '系统平台未配置',
  '106': '环境变量读取失败',
  '107': '缓存文件写入失败',
  '108': '读取文件夹失败',
  '109': '未知的终端程序，降级为文件夹打开',
  '110': '缓存内无此项目',
  '111': '应用路径为空'
}

// 系统用户目录
export const HOME_PATH = getEnv('HOME') ?? getEnv('APPDATA') ?? ''
