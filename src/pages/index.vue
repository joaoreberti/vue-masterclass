<script setup lang="ts"></script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink :to="{ name: '/projects/[projectId]', params: { projectId: '1' } }"
      >Go to Projects</RouterLink
    >
  </div>
</template>

<style scoped></style>
