import path from 'path'
import { startServer, port } from './server'

const prefix = utools.isDev() ? `http://localhost:${port}` : __dirname

window.exports = {
  setting: {
    mode: 'none',
    args: {
      enter: async (action, callbackSetList) => {
        try {
          utools.setExpendHeight(520)
          let appRoot = document.getElementById('app')
          if (appRoot) {
            return
          }

          await startServer()
          appRoot = document.createElement('div')
          appRoot.id = 'app'
          document.body.appendChild(appRoot)
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
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  open: {
    mode: 'list',
    args: {
      enter: (action, callbackSetList) => {
        // #app 元素隐藏,考虑元素不存在的情况
        const appRoot = document.getElementById('app')
        if (appRoot) {
          appRoot.style.display = 'none'
        }
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
      select(action, item) {
        console.log(item)
        utools.hideMainWindow()
        utools.outPlugin()
      },
      placeholder: '搜索项目'
    }
  }
}
