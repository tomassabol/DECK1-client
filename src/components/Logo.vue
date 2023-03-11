<template>
    <!-- TODO: fix this-->
    <i v-html="svg" class="text-transparent" />
    <!-- end -->
    <img
        :src="`/images/deck1-logo.svg`"
        class="initial loading w-64"
        data-was-processed="true"
    />
</template>

<script lang="ts" setup>
const svg = import.meta.glob("../../public/images/deck1-logo.svg", {
    as: "raw",
});
</script>
