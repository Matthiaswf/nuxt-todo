<template>
  <div>
    <div v-if="!localTasks.length" class="text-gray-400 text-center py-8">
      No tasks.
    </div>

    <ClientOnly>
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
    </ClientOnly>
  </div>
</template>

<script setup>
import { ClientOnly } from '#components'; // <- this import is important
import TaskCard from './TaskCard.vue';
import draggable from 'vuedraggable';

const props = defineProps({
  tasks: {
    type: Array,
    default: () => [],
  },
});

const isAnyEditing = ref(false);
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
  emit('reorder', [...localTasks.value]);
}

function onDragStart(event) {
  const ghost = document.createElement('div');
  ghost.style.position = 'absolute';
  ghost.style.top = '-9999px';
  ghost.style.width = '0px';
  ghost.style.height = '0px';
  document.body.appendChild(ghost);
  event.dataTransfer.setDragImage(ghost, 0, 0);
  setTimeout(() => document.body.removeChild(ghost), 0);
}
</script>
