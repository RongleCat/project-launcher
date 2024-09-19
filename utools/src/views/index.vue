<template>
  <div class="page-container">
    <a-card title="工作区设置1111">
      <template #extra>
        <a-button type="primary" @click="onAdd">
          <template #icon>
            <icon-plus />
          </template>
          添加
        </a-button>
      </template>
      <div class="desc-box">工具将在您配置的工作区目录搜索 <span class="highlight">Git/Svn/Mercurial</span> 项目，可添加多个工作区。</div>
      <a-list class="workspace-list">
        <a-list-item v-for="(item, index) in workspaces" :key="index">
          <div class="path-item">
            {{ item }}
          </div>
          <template #actions>
            <a-button status="danger" type="text">
              <template #icon>
                <icon-delete />
              </template>
            </a-button>
          </template>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="排除关键字">
      <template #extra>
        <a-button type="primary" @click="onAdd">
          <template #icon>
            <icon-plus />
          </template>
          添加
        </a-button>
      </template>
      <div class="desc-box">查找项目时，跳过一些不需要查找的目录可以加快搜索速度，例如 <span class="highlight">node_modules</span> 等。</div>
      <a-space>
        <a-tag size="large" closable v-for="(item, index) in ignoreFileNames" :key="index" @close="() => ignoreFileNames.splice(index, 1)">{{ item }}</a-tag>

        <template v-if="ignoreFileNames.length === 0">
          <div class="empty-text">暂无排除关键字</div>
        </template>
      </a-space>
    </a-card>
    <a-card title="其他操作">
      <div class="btn-group">
        <a-button type="primary" size="large">打开配置文件</a-button>
        <a-button type="outline" status="danger" size="large">清除缓存</a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { IconPlus, IconDelete } from '@arco-design/web-vue/es/icon'

const workspaces = ref<string[]>(['/Users/xxx/workspace/project1'])
const ignoreFileNames = ref<string[]>(['node_modules'])

function onAdd() {
  utools.showNotification('功能暂未实现')
}
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;

  .path-item {
    height: 32px;
    display: flex;
    align-items: center;
  }
}
</style>
