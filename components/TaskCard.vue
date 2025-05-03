<template>
  <div class="task-card">
    <!-- Mobile drag handle -->
    <span
      class="drag-handle block sm:hidden cursor-move text-gray-400 hover:text-black mt-1"
      title="Drag"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 10h16M4 14h16"
        />
      </svg>
    </span>

    <div class="flex gap-3 items-start sm:items-center w-full">
      <!-- Toggle -->
      <button
        @click="store.toggleTask(task.id)"
        class="task-toggle mt-0.5"
        :class="{ 'task-toggle-active': task.done }"
      >
        <CheckIcon
          :class="[
            'w-5 h-5',
            task.done ? 'text-white dark:text-black' : 'invisible',
          ]"
        />
      </button>

      <!-- Content -->
      <div class="flex-1 space-y-2">
        <!-- Edit mode -->
        <div v-if="isEditing" class="flex flex-col gap-2">
          <input v-model="editedTitle" class="form-input text-sm" />

          <div
            class="form-input flex flex-wrap items-center gap-2 min-h-[40px]"
          >
            <div
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
            </div>

            <input
              v-model="tagInput"
              @keydown="handleKeydown"
              @keydown.enter.prevent="addTag"
              class="form-input text-sm flex-1 min-w-[100px]"
              placeholder="Add tag"
            />
          </div>

          <div class="flex gap-2 justify-end">
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

        <!-- View mode -->
        <div v-else class="flex items-center gap-2">
          <div
            :class="{ 'task-done': task.done }"
            class="break-words sm:break-normal"
          >
            {{ task.title }}
          </div>

          <button
            @click="startEditing"
            class="btn-icon text-gray-400 hover:text-black mt-[2px]"
            title="Edit"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Tags -->
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

      <!-- Trash -->
      <button
        @click="store.deleteTask(task.id)"
        class="btn-icon text-gray-500 hover:text-black mt-1"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
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
  urgent: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
  work: 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
  personal: 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
  study:
    'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
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
  emit('start-editing');
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
  return (
    tagColorMap[tag.toLowerCase()] ||
    'bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-200'
  );
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
