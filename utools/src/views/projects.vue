<template>
  <div class="page-container project-list-card">
    <a-card>
      <template #title>
        <a-input :style="{ width: '320px' }" placeholder="输入项目关键字筛选" allow-clear />
      </template>
      <template #extra>
        <div class="btn-group">
          <a-button>
            <template #icon>
              <icon-refresh />
            </template>
            刷新
          </a-button>
          <a-button status="danger">
            <template #icon>
              <icon-close />
            </template>
            清空
          </a-button>
        </div>
      </template>
      <a-list class="list-demo-action-layout" :bordered="false" :data="projectList" max-height="100%">
        <template #item="{ item }: { item: Project }">
          <a-list-item class="list-demo-item" action-layout="vertical">
            <template #actions>
              <a-tooltip content="项目点击量">
                <span><icon-bar-chart />{{ item.hits }}</span>
              </a-tooltip>
              <a-tooltip content="版本控制工具">
                <span><icon-branch />{{ item.versionCtrl }}</span>
              </a-tooltip>
              <a-tooltip content="启动器" v-if="item.launcher">
                <span><icon-common />{{ item.launcher }}</span>
              </a-tooltip>
              <a-tooltip content="此项目为手动添加" v-if="item.isCustom">
                <span><icon-folder-add /></span>
              </a-tooltip>
            </template>
            <template #extra>
              <a-button status="danger" type="text" size="large">
                <template #icon>
                  <icon-delete />
                </template>
              </a-button>
            </template>
            <a-list-item-meta :title="item.name" :description="item.path">
              <template #avatar>
                <a-avatar shape="square">
                  <!-- <img alt="avatar" :src="item.avatar" /> -->
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IconBarChart, IconDelete, IconBranch, IconCommon, IconFolderAdd, IconRefresh, IconClose } from '@arco-design/web-vue/es/icon'
import { Project } from 'project-launcher-core'

const names = ['Socrates', 'Balzac', 'Plato']
const projectList = ref<Project[]>([
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Git',
    launcher: 'vscode'
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: true,
    versionCtrl: 'Git',
    launcher: 'vscode'
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Git'
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Svn',
    top: true
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Mercurial'
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'None'
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Git',
    launcher: 'vscode'
  },
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Git',
    launcher: 'vscode'
  }
])
const avatarSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp'
]
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp'
]
const dataSource = new Array(15).fill(null).map((_, index) => {
  return {
    index,
    avatar: avatarSrc[index % avatarSrc.length],
    title: names[index % names.length],
    description:
      'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: imageSrc[index % imageSrc.length]
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  overflow: hidden;
  padding: 12px;
}
</style>
