<template>
  <div class="layout">
    <div class="max-w-3xl w-full mx-auto space-y-6">
      <TaskForm />
      <TaskColumn />
    </div>
  </div>
</template>

<script setup>
import TaskForm from '@/components/TaskForm.vue';
import TaskColumn from '@/components/TaskColumn.vue';
</script>
