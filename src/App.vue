<template>
    <div class="flex">
        <Navbar />
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
