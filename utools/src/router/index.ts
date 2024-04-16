import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { IconSettings, IconFolder, IconApps, IconMindMapping } from '@arco-design/web-vue/es/icon'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '基础设置',
      icon: IconSettings
    },
    component: () => import('@/views/index.vue')
  },
  {
    path: '/projects',
    meta: {
      title: '项目列表',
      icon: IconFolder
    },
    component: () => import('@/views/projects.vue')
  },
  {
    path: '/launchers',
    meta: {
      title: '启动器管理',
      icon: IconApps
    },
    component: () => import('@/views/launchers.vue')
  },
  {
    path: '/project-types',
    meta: {
      title: '项目类型管理',
      icon: IconMindMapping
    },
    component: () => import('@/views/project-types.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
