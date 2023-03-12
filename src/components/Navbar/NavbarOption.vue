<template>
    <router-link
        v-if="option.replaceAll(' ', '') === currentRoute"
        class="flex bg-[#222] text-white items-center rounded-xl p-1 px-3"
        :to="{ name: option.replaceAll(' ', '') }"
    >
        <div class="flex items-center px-1.5">
            <img
                :src="`/icons/${option.replaceAll(' ', '')}.png`"
                alt=""
                class="w-10 p-2"
            />
            <span class="mr-4">{{ option }}</span>
        </div>
    </router-link>

    <router-link v-else :to="{ name: option.replaceAll(' ', '') }">
        <div class="flex items-center px-1.5">
            <img
                :src="`/icons/${option.replaceAll(' ', '')}.png`"
                alt=""
                class="w-10 p-2"
            />
            <span class="mr-4">{{ option }}</span>
        </div>
    </router-link>
</template>
<script setup lang="ts">
defineProps<{
    option: string;
    currentRoute: any;
}>();
</script>
