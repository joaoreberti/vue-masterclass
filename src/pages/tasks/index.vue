<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { useErrorStore } from '@/stores/error'
import { usePageStore } from '@/stores/page'
import { tasksWithProjects, type TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import { ref } from 'vue'

usePageStore().pageData.title = 'My tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjects

  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data

  console.log({ projects: tasks.value })
}
await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
