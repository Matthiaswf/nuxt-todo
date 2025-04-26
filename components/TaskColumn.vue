<template>
  <ClientOnly>
    <div>
      <div v-if="!localTasks.length" class="text-gray-400 text-center py-8">
        No tasks.
      </div>

      <draggable
        v-model="localTasks"
        item-key="id"
        class="task-list"
        :disabled="isAnyEditing"
        :animation="200"
        @end="onDragEnd"
        @start="onDragStart"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
            @select-tag="$emit('select-tag', $event)"
            @start-editing="isAnyEditing = true"
            @end-editing="isAnyEditing = false"
          />
        </template>
      </draggable>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ClientOnly } from '#components';
import TaskCard from './TaskCard.vue';
import draggable from 'vuedraggable';

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const isAnyEditing = ref(false);

onMounted(() => {
  isAnyEditing.value = false;
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

function onDragStart(event) {
  if (typeof window !== 'undefined' && event?.dataTransfer) {
    const ghost = document.createElement('div');
    ghost.style.position = 'absolute';
    ghost.style.top = '-9999px';
    ghost.style.width = '0px';
    ghost.style.height = '0px';
    document.body.appendChild(ghost);
    event.dataTransfer.setDragImage(ghost, 0, 0);

    setTimeout(() => document.body.removeChild(ghost), 0);
  }
}
</script>
