<template>
  <div class="page-container common-list-card">
    <a-card>
      <template #title>
        <a-input :style="{ width: '320px' }" placeholder="输入启动器信息筛选" allow-clear />
      </template>
      <template #extra>
        <div class="btn-group">
          <a-button type="primary">
            <template #icon>
              <icon-close />
            </template>
            添加
          </a-button>
        </div>
      </template>
      <a-list class="list-demo-action-layout" :bordered="false" :data="projectList" max-height="100%">
        <template #item="{ item }: { item: Launcher }">
          <a-list-item class="list-demo-item" action-layout="vertical">
            <template #extra>
              <div class="btn-group">
                <a-button type="text" size="large">
                  <template #icon>
                    <icon-edit />
                  </template>
                </a-button>
                <a-button status="danger" type="text" size="large">
                  <template #icon>
                    <icon-delete />
                  </template>
                </a-button>
              </div>
            </template>
            <a-list-item-meta :title="`${item.name} (${item.isCommand ? '自定义命令' : '应用打开'})`" :description="item.path" />
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IconDelete, IconClose, IconEdit } from '@arco-design/web-vue/es/icon'
import { Launcher } from 'project-launcher-core'

const projectList = ref<Launcher[]>([
  {
    id: '10',
    name: 'vscode',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    command: '',
    isCommand: false
  },
  {
    id: '10',
    name: 'vscode',
    path: 'E:\\self\\tools\\cheetah-for-utools',
    command: '',
    isCommand: true
  }
])
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  overflow: hidden;
  padding: 12px;
}
</style>
