<template>
    <div class="flex flex-col gap-1">
        <label for="" class="font-medium text-2xl">
            {{ label }}
        </label>
        <button class="border-2 border-gray-100 w-64 h-12 rounded-md text-lg">
            <slot></slot>
        </button>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    label?: string;
}>();
</script>
