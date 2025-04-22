<template>
  <div>
    <div v-if="!localTasks.length" class="text-gray-400 text-center py-8">
      No tasks.
    </div>

    <draggable
      v-model="localTasks"
      item-key="id"
      class="task-list"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <TaskCard :task="element" @select-tag="$emit('select-tag', $event)" />
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import TaskCard from './TaskCard.vue';
import draggable from 'vuedraggable';

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const localTasks = ref([]);

watch(
  () => props.tasks,
  (newVal) => {
    localTasks.value = [...newVal];
  },
  { deep: true, immediate: true }
);

const emit = defineEmits(['reorder', 'select-tag']);

function onDragEnd() {
  emit('reorder', [...localTasks.value]); // emit the new order immediately
}
</script>
