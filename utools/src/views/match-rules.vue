<template>
  <div class="page-container common-list-card">
    <a-card>
      <template #title>
        <a-input :style="{ width: '320px' }" placeholder="输入匹配规则信息筛选" allow-clear />
      </template>
      <template #extra>
        <a-button type="primary">
          <template #icon>
            <icon-close />
          </template>
          添加
        </a-button>
      </template>
      <a-list class="list-demo-action-layout" :bordered="false" :data="projectList" max-height="100%">
        <template #item="{ item }: { item: MatchRule }">
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
            <a-list-item-meta :title="item.name" :description="item.rule" />
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IconDelete, IconClose, IconEdit } from '@arco-design/web-vue/es/icon'
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
