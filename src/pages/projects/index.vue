<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { usePageStore } from '@/stores/page'
import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { ref } from 'vue'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>([])

const getProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) console.log({ error })
  projects.value = data

  console.log({ projects: projects.value })
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
