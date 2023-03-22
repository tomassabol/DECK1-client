<template>
    <div class="flex flex-col gap-1">
        <Label>
            <slot></slot>
        </Label>
        <input
            type="time"
            id="appt"
            name="appt"
            required
            class="border-2 border-gray-100 w-64 h-10 rounded-md text-lg text-center"
        />
    </div>
</template>

<script setup lang="ts">
import Label from "@/components/Headers/Label.vue";
</script>
