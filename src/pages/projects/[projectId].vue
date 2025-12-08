<script setup lang="ts">
import { useRoute } from 'vue-router'

const { params } = useRoute()
const projectId = 'projectId' in params ? params.projectId : ''
</script>

<template>
  <h1>Project {{ projectId }}</h1>
</template>

<style scoped></style>
