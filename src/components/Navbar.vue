<template>
    <div
        class="flex w-80 bg-[#F5F5F5] h-screen flex-col justify-between items-center"
    >
        <!-- TODO: add logic for styling active link -->
        <router-link :to="{ name: 'dashboard' }" class="mt-10">
            <img
                :src="`/images/deck1-logo.svg`"
                class="initial loading w-64"
                data-was-processed="true"
            />
        </router-link>
        <ol class="flex flex-col gap-1.5 font-bold text-2xl">
            <router-link :to="{ name: 'dashboard' }">
                <div
                    class="flex bg-[#222] text-white items-center rounded-xl p-1 px-3"
                >
                    <img
                        :src="`/icons/dashboard-icon.png`"
                        alt=""
                        class="w-10 p-2"
                    />
                    <span class="mr-4">Dashboard</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'DailyReports' }">
                <div class="flex items-center px-1.5">
                    <img :src="`/icons/activity.png`" alt="" class="w-10 p-2" />
                    <span class="mr-4">Daily Reports</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'DailyUpdates' }">
                <div class="flex items-center px-1.5">
                    <img :src="`/icons/update.png`" alt="" class="w-10 p-2" />
                    <span class="mr-4">Daily Updates</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'Sites' }">
                <div class="flex items-center px-1.5">
                    <img :src="`/icons/map.png`" alt="" class="w-10 p-2" />
                    <span class="mr-4">Sites</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'Profile' }">
                <div class="flex items-center px-1.5">
                    <img :src="`/icons/user.png`" alt="" class="w-10 p-2" />
                    <span class="mr-4">Profile</span>
                </div>
            </router-link>
        </ol>
        <div class="flex gap-2 items-center text-2xl mb-14 font-bold">
            <i class="fa-solid fa-right-from-bracket rotate-180" />
            <span>Log Out</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import.meta.glob("../../public/images/deck1-logo.svg", {
    as: "raw",
});

// TODO: add logic for styling active ling
</script>
