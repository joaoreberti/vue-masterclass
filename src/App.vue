<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import AppErrorPage from './components/AppError/AppErrorPage.vue'
import AuthLayout from './components/Layout/main/AuthLayout.vue'
import { useErrorStore } from './stores/error'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
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
