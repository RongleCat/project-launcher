/* eslint-disable global-require */
import path from 'path-browserify'
import fs from 'fs'
import { ChildInfo } from './types'

/**
 * @description: 获取环境变量
 * @param {string} envName 要获取的环境变量名称
 * @param {any} defaultValue 默认值
 * @return {string} 获取到的环境变量值
 */
export function getEnv(envName: string, defaultValue?: any): string {
  try {
    return process.env[envName]!
  } catch (error) {
    return defaultValue
  }
}

/**
 * @description: 读取文件内容
 * @param {string} filePath 文件路径
 * @return {Promise<string>} 文件内容
 */
export async function readFile(filePath: string): Promise<string> {
  let fileContent = ''

  try {
    fileContent = fs.readFileSync(filePath).toString()

    return fileContent
  } catch (error) {
    throw new Error('100')
  }
}

/**
 * @description: 写入文件内容
 * @param {string} filePath 文件路径
 * @param {string} content 文件内容
 * @return {Promise<void>}
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  try {
    const dirname = filePath.replace(/(\/|(\\)+)\w*\.json/, '')
    console.log(dirname)

    fs.mkdirSync(dirname, { recursive: true })
    fs.writeFileSync(filePath, content)
  } catch (error) {
    throw new Error('101')
  }
}

/**
 * @description: 读取文件夹下所有内容
 * @param {string} dirPath 文件夹路径
 * @return {ChildInfo[]} 文件夹下文件对象集合
 */
export async function readDir(dirPath: string): Promise<ChildInfo[]> {
  let dirIter
  try {
    dirIter = fs.readdirSync(dirPath)

    const files: ChildInfo[] = []

    for await (const item of dirIter) {
      const name: string = item

      if (['System Volume Information', '$RECYCLE.BIN'].includes(name)) {
        continue
      }

      const itemPath = path.join(dirPath, name)

      const isDir = fs.statSync(itemPath).isDirectory()

      files.push({
        name,
        isDir,
        path: itemPath
      })
    }
    return files
  } catch (error) {
    throw new Error('108')
  }
}

/**
 * @description: 删除文件
 * @param {string} filePath 文件路径
 * @return {Promise<void>}
 */
export async function unlink(filePath: string): Promise<void> {
  try {
    fs.unlinkSync(filePath)
  } catch (error) {
    throw new Error('102')
  }
}

export function pathNormalization(path: string) {
  if (!platform.isWindows) {
    return path
  }
  return path.replace(/((\\)+(\/)?)|(\/)/g, '\\')
}
