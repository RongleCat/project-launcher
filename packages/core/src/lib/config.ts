// 搜索项目时需要排除的目录
const ignoreFolders = ['node_modules']

// 排除目录的正则表达式
export const ignoreFoldersReg = new RegExp(ignoreFolders.join('|'), 'i')
