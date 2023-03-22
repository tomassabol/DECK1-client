<template>
    <div
        class="flex w-80 px-4 bg-[#F5F5F5] h-screen flex-col justify-between items-center sticky top-0"
    >
        <router-link :to="{ name: 'Dashboard' }" class="mt-10">
            <img
                :src="`/images/deck1-logo.svg`"
                class="initial loading w-64"
                data-was-processed="true"
            />
        </router-link>
        <ol class="flex flex-col gap-1.5 font-bold text-2xl">
            <div v-for="option in menuOptions">
                <NavbarOption :currentRoute="currentRoute" :option="option" />
            </div>
        </ol>
        <router-link :to="{ name: 'Dashboard' }">
            <div class="flex gap-2 items-center text-2xl mb-14 font-bold">
                <i class="fa-solid fa-right-from-bracket rotate-180" />
                <span>Log Out</span>
            </div>
        </router-link>
    </div>
</template>
<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";
import NavbarOption from "./NavbarOption.vue";

import.meta.glob("../../public/images/deck1-logo.svg", {
    as: "raw",
});

const router = useRouter();

const menuOptions: string[] = [
    "Dashboard",
    "Daily Reports",
    "Daily Updates",
    "Sites",
    "Profile",
];

const currentRoute: ComputedRef<string> = computed(() => {
    return router.currentRoute.value.name as string;
});
</script>
