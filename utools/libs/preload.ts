import path from 'path'
// import { draw } from './draw'

import { env } from '../package.json'

const prefix = utools.isDev() ? `http://${env.VITE_DEV_SERVER_HOST}:${env.VITE_DEV_SERVER_PORT}` : __dirname

window.exports = {
  setting: {
    mode: 'none',
    args: {
      enter: async (action, callbackSetList) => {
        utools.setExpendHeight(520)
        let appRoot = document.getElementById('app')

        if (appRoot) {
          appRoot?.classList?.remove?.('hide')
          return
        }

        // 创建 #app 元素
        appRoot = document.createElement('div')
        appRoot.id = 'app'
        document.body.appendChild(appRoot)

        // 开发环境，引入 vite 相关文件
        if (utools.isDev()) {
          const script = document.createElement('script')
          script.type = 'module'
          script.src = path.join(prefix, '/@vite/client')
          document.head.appendChild(script)

          const script1 = document.createElement('script')
          script1.type = 'module'
          script1.src = path.join(prefix, 'src/main.ts')
          document.head.appendChild(script1)
          return
        }

        // 正式环境
        // 引入 css 文件
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = path.join(prefix, 'assets/index.css')
        document.head.appendChild(link)

        // 引入 js 文件
        const script = document.createElement('script')
        script.type = 'module'
        script.src = path.join(prefix, 'assets/index.js')
        document.body.appendChild(script)
      }
    }
  },
  open: {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        // #app 元素隐藏,考虑元素不存在的情况
        document.getElementById('app')?.classList?.add?.('hide')
        // 如果进入插件应用就要显示列表数据
        callbackSetList([
          {
            title: '这是标题',
            description: '这是描述',
            icon: '' // 图标(可选)
          }
        ])
      },
      search(action: any, keyword: string, callbackSetList: any) {
        const result = [
          {
            title: '没有找到名称包含的项目',
            description: '请尝试更换关键词，回车返回重新搜索',
            icon: 'assets/empty.png',
            type: 'empty'
          }
        ]

        callbackSetList(result)
      },
      async select(action, item) {
        console.log(item)

        // const base64 = await draw()
        // console.log(base64)
        // utools.copyText(base64)
        utools.hideMainWindow()
        utools.outPlugin()
      },
      placeholder: '搜索项目'
    }
  }
}
