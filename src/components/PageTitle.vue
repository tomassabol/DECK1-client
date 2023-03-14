<template>
    <div class="ml-14 mt-14">
        <h1 class="font-bold text-3xl">{{ primaryText }}</h1>
        <h2 v-if="secondaryText" class="text-xl">{{ secondaryText }}</h2>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    primaryText: string;
    secondaryText?: string;
}>();
</script>
