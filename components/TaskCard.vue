<template>
  <div class="task-card">
    <div class="flex items-center gap-3 flex-1">
      <button
        @click="store.toggleTask(task.id)"
        class="task-toggle"
        :class="{ 'task-toggle-active': task.done }"
      >
        <CheckIcon v-if="task.done" class="w-5 h-5 text-white" />
      </button>
      <div>
        <div v-if="isEditing" class="w-full">
          <input
            v-model="editedTitle"
            @keydown.enter="saveEdit"
            @blur="saveEdit"
            class="form-input text-sm"
            autofocus
          />
        </div>

        <div v-else class="flex items-center gap-2">
          <div :class="{ 'task-done': task.done }">
            {{ task.title }}
          </div>
          <button
            @click="startEditing"
            class="btn-icon text-gray-400 hover:text-black"
            title="Edit"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
        </div>

        <div v-if="task.tags.length" class="task-tags">
          <span
            v-for="tag in task.tags"
            :key="tag"
            class="tag cursor-pointer hover:bg-gray-300"
            @click="$emit('select-tag', tag)"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <button
      @click="store.deleteTask(task.id)"
      class="btn-icon text-gray-500 hover:text-black"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { PencilIcon } from '@heroicons/vue/24/solid';
import { useTaskStore } from '@/stores/tasks';
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  task: Object,
});

const isEditing = ref(false);
const editedTitle = ref(props.task.title);

const emit = defineEmits(['select-tag', 'start-editing', 'end-editing']);

function startEditing() {
  isEditing.value = true;
  editedTitle.value = props.task.title;
  emit('start-editing');
}

function saveEdit() {
  const trimmed = editedTitle.value.trim();
  if (trimmed && trimmed !== props.task.title) {
    store.editTask(props.task.id, trimmed);
  }
  isEditing.value = false;
  emit('end-editing');
}

const store = useTaskStore();
</script>
