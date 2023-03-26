<!-- Unless otherwise specified, type will default to "button" -->
<template>
  <button
    :disabled="disabled === true || loading === true || success === true"
    :aria-disabled="disabled === true || loading === true || success === true"
    :aria-pressed="pressed"
    :type="props.type"
    class="inline-flex items-center rounded-lg border-gray-100 px-4 py-2 text-base font-medium shadow-md focus:outline-none focus:ring-2 bg-white border-2 hover:bg-gray-50 text-gray-800 focus:ring-indigo-500 focus:ring-offset-2 h-fit w-fit"
  >
    <div v-if="props.loading === false" class="rotate-180">
      <i aria-hidden="true" class="fas fa-long-arrow-right ml-2"></i>
    </div>
    <div v-if="props.success === true">
      <i role="status" aria-hidden="true" class="fa-solid fa-check mr-2"></i>
    </div>
    <div v-else-if="props.loading === true" class="mr-2">
      <svg
        class="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <span v-if="props.loading === false">{{ props.text }}</span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue";

interface Props {
  type?: ButtonHTMLAttributes["type"];
  pressed?: boolean | undefined;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  pressed: undefined,
  disabled: false,
  loading: false,
  success: false,
  text: "Back",
});
</script>
