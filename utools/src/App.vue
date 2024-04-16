<template>
  <div class="layout-container">
    <div class="menu-slide">
      <a-menu mode="vertical" :selected-keys="currentKey" @menu-item-click="onRouteChange">
        <a-menu-item v-for="route in routes" :key="route.path">
          <template #icon>
            <component :is="route.meta!.icon" />
          </template>
          {{ route.meta!.title }}
        </a-menu-item>
      </a-menu>
    </div>

    <a-scrollbar type="track" outer-style="flex: 1" class="content-scrollbar" style="height: 100%; width: 100%; overflow: auto">
      <div class="page-content">
        <router-view />
      </div>
    </a-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { routes } from '@/router'

const router = useRouter()
const route = useRoute()

const currentKey = computed(() => [route.fullPath])

function onRouteChange(url: string) {
  router.replace(url)
}
</script>

<style lang="scss" scoped>
@import url('./style.scss');
.layout-container {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;

  .menu-slide {
    width: 180px;
    flex-shrink: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .page-content {
    flex: 1;
    overflow-y: auto;
    // padding: 12px;
    min-height: 100%;
  }
}
</style>
