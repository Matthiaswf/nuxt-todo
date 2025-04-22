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
        <div v-if="isEditing" class="w-full flex flex-col gap-2">
          <input v-model="editedTitle" class="form-input text-sm" />

          <div
            class="form-input flex flex-wrap items-center gap-2 min-h-[40px]"
          >
            <span
              v-for="tag in editedTags"
              :key="tag"
              class="tag bg-gray-300 text-gray-800"
            >
              {{ tag }}
              <button
                @click.prevent="removeTag(tag)"
                class="ml-1 text-xs font-bold hover:text-red-600"
                title="Remove tag"
              >
                &times;
              </button>
            </span>

            <input
              v-model="tagInput"
              @keydown="handleKeydown"
              @keydown.enter.prevent="addTag"
              class="flex-1 min-w-[100px] outline-none text-sm"
              placeholder="Add tag"
            />
          </div>
          <div class="flex gap-2 justify-end mt-2">
            <button
              type="button"
              class="btn btn-primary text-sm"
              @click="saveEdit"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-primary text-sm"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </div>
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
            class="tag cursor-pointer"
            :class="getTagColor(tag)"
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

const tagColorMap = {
  urgent: 'bg-red-200 text-red-800',
  work: 'bg-blue-200 text-blue-800',
  personal: 'bg-green-200 text-green-800',
  study: 'bg-purple-200 text-purple-800',
};

const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const editedTags = ref([...props.task.tags]);
const tagInput = ref('');

const emit = defineEmits(['select-tag', 'start-editing', 'end-editing']);

function handleKeydown(e) {
  if (e.key === ',') {
    e.preventDefault();
    addTag();
  }
}

function startEditing() {
  isEditing.value = true;
  editedTitle.value = props.task.title;
  editedTags.value = [...props.task.tags];
  tagInput.value = '';
}

function saveEdit() {
  const trimmedTitle = editedTitle.value.trim();
  if (trimmedTitle) {
    store.editTask(props.task.id, trimmedTitle, [...editedTags.value]);
  }
  isEditing.value = false;
  emit('end-editing');
}

function cancelEdit() {
  isEditing.value = false;
  emit('end-editing');
}

function getTagColor(tag) {
  return tagColorMap[tag.toLowerCase()] || 'bg-gray-200 text-gray-700';
}

function addTag() {
  const tag = tagInput.value.trim().toLowerCase();
  if (tag && !editedTags.value.includes(tag)) {
    editedTags.value.push(tag);
  }
  tagInput.value = '';
}

function removeTag(tag) {
  editedTags.value = editedTags.value.filter((t) => t !== tag);
}

const store = useTaskStore();
</script>
