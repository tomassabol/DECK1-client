<template>
  <div
    class="flex border border-gray-100 rounded-xl shadow-md w-full overflow-hidden"
  >
    <table class="w-full">
      <tr>
        <th v-for="header in tableHeaders" class="p-3">
          {{ header }}
        </th>
      </tr>
      <slot></slot>
    </table>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  tableHeaders: Types.TableHeader;
}>();
</script>
