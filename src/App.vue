<template>
    <div class="flex">
        <Navbar />
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar/Navbar.vue";
import "@fortawesome/fontawesome-free/js/all.js";
</script>
