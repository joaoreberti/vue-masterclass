<script setup lang="ts">
import AuthLayout from './components/Layout/main/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense :key="route.fullPath">
          <Component :is="Component"></Component>
          <template #fallback>
            <span>Loading ...</span>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </AuthLayout>
</template>
