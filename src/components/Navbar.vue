<template>
    <div
        class="flex w-80 bg-[#F5F5F5] h-screen flex-col justify-between items-center"
    >
        <div class="logo mt-10">
            <Logo />
        </div>
        <ol class="flex flex-col font-bold text-2xl">
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
            <router-link :to="{ name: 'DailyReports' }"
                >Daily Reports</router-link
            >
            <router-link :to="{ name: 'DailyUpdates' }"
                >Daily Updates</router-link
            >
            <router-link :to="{ name: 'Sites' }">Sites</router-link>
            <router-link :to="{ name: 'Profile' }">Profile</router-link>
        </ol>
        <div class="mb-14">Log Out</div>
    </div>
</template>
<script setup lang="ts">
import Logo from "./Logo.vue";
</script>
