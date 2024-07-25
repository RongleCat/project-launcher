<template>
  <div class="page-container common-list-card">
    <a-card>
      <template #title>
        <a-input :style="{ width: '320px' }" placeholder="输入项目类型信息筛选" allow-clear />
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
        <template #item="{ item }: { item: MatchRule }">
          <a-list-item class="list-demo-item" action-layout="vertical">
            <a-list-item-meta :title="item.name">
              <template #avatar>
                <a-avatar shape="square" class="avatar">
                  <!-- <img alt="avatar" :src="item.avatar" /> -->
                </a-avatar>
              </template>
            </a-list-item-meta>
            <template #extra>
              <div class="center-box">
                <a-select :style="{ width: '220px' }" placeholder="选择启动器">
                  <a-option>Beijing</a-option>
                  <a-option>Shanghai</a-option>
                  <a-option>Guangzhou</a-option>
                  <a-option disabled>Disabled</a-option>
                </a-select>
              </div>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IconRefresh, IconClose } from '@arco-design/web-vue/es/icon'
import { MatchRule } from 'project-launcher-core'

const projectList = ref<MatchRule[]>([
  {
    id: '10',
    name: 'vue',
    icon: './images/type/javascript.png',
    rule: '+package.json(+vue,-react) -node_modules'
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
