<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>([])

;(async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) console.log({ error })
  tasks.value = data

  console.log({ projects: tasks.value })
})()
</script>

<template>
  <div class="projects-view">
    <h1>Welcome to the Tasks View</h1>
    <RouterLink to="/">Go back to Home</RouterLink>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
