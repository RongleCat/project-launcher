/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, '..', 'dist')
const pluginJsonSrc = path.join(__dirname, '..', 'plugin.json')
const pluginJsonDest = path.join(distDir, 'plugin.json')

// 检查 dist 文件夹是否存在，如果不存在则创建
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
  console.log('已创建 dist 文件夹')
}

// 复制 plugin.json 文件
try {
  fs.copyFileSync(pluginJsonSrc, pluginJsonDest)
  console.log('plugin.json 文件已成功复制到 dist 文件夹')
} catch (err) {
  console.error('复制 plugin.json 文件时出错:', err)
}
