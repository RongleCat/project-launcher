<template>
  <div class="page-container common-list-card">
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
              <a-tooltip content="项目点击量, 点击可更改" @click="openHitChangePopup(item)">
                <span><icon-bar-chart />{{ item.hits }}</span>
              </a-tooltip>
              <a-tooltip content="版本控制工具">
                <span><icon-branch />{{ item.versionCtrl }}</span>
              </a-tooltip>
              <a-tooltip content="启动器，点击可更改">
                <span>
                  <icon-common />
                  <a-select default-value="无" size="mini" placeholder="无">
                    <a-option>Beijing</a-option>
                    <a-option>Shanghai</a-option>
                    <a-option>Guangzhou</a-option>
                    <a-option disabled>Disabled</a-option>
                  </a-select>
                </span>
              </a-tooltip>
              <a-tooltip content="此项目为手动添加" v-if="item.isCustom">
                <span><icon-folder-add /></span>
              </a-tooltip>
              <a-tooltip content="已置顶" v-if="item.top">
                <span><icon-to-top /></span>
              </a-tooltip>
            </template>
            <template #extra>
              <a-button status="success" :type="item.top ? 'primary' : 'text'" size="large" :title="item.top ? '取消置顶' : '置顶'" @click="item.top = !item.top">
                <template #icon>
                  <icon-to-top />
                </template>
              </a-button>
              <a-button status="danger" type="text" size="large">
                <template #icon>
                  <icon-delete />
                </template>
              </a-button>
            </template>
            <a-list-item-meta :title="item.name" :description="item.path">
              <template #avatar>
                <a-avatar shape="square" class="avatar">
                  <!-- <img alt="avatar" :src="item.avatar" /> -->
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
  <a-modal v-model:visible="showHitChangePopup" title="修改点击量" @ok="onHitChangeSave" width="300px" unmount-on-close>
    <a-input v-if="currentEditProject" :model-value="currentEditProject.hits.toString()" @input="onHitsInput" placeholder="请输入点击量" />
  </a-modal>
</template>

<script setup lang="ts">
import { IconBarChart, IconDelete, IconBranch, IconToTop, IconCommon, IconFolderAdd, IconRefresh, IconClose } from '@arco-design/web-vue/es/icon'
import { Project } from 'project-launcher-core'

const showHitChangePopup = ref(false)
const currentEditProject = ref<Project | null>(null)

const projectList = ref<Project[]>([
  {
    name: 'cheetah-for-utools',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    type: 'typescript',
    hits: 10,
    isCustom: false,
    versionCtrl: 'Git',
    launcher: 'vscode',
    top: true
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

function openHitChangePopup(project: Project) {
  currentEditProject.value = project
  showHitChangePopup.value = true
}

function onHitsInput(hits: string) {
  if (!currentEditProject.value) {
    return
  }
  currentEditProject.value.hits = Number(hits)
}

function onHitChangeSave() {
  console.log(currentEditProject)
}
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  overflow: hidden;
  padding: 12px;

  .avatar {
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 2px #1890ff;
    }
  }
}
</style>
