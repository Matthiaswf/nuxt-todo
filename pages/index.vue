<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto space-y-6">
      <TaskForm />
      <TaskColumn />
    </div>
  </div>
</template>

<script setup>
import TaskForm from '@/components/TaskForm.vue';
import TaskColumn from '@/components/TaskColumn.vue';
</script>
