<template>
  <!-- <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle :primaryText="'Daily Update'" /> -->
  <!-- flight on this day -->
  <!-- <div class="flex flex-col gap-1">
      <Label>Flight on this day:</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <InputButton>Yes</InputButton>
        <InputButton>No</InputButton>
      </div>
    </div> -->
  <!-- flight on this day -->
  <!-- reason -->
  <!-- <div class="flex flex-col gap-1">
      <Label>Reason:</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="reason in reasons">
          <InputButton>{{ reason }}</InputButton>
        </div>
      </div>
    </div> -->
  <!-- reason -->
  <!-- specify the reason -->
  <!-- <div class="flex flex-col gap-1">
      <Label>Specify the reason: </Label>
      <Label>(why there was no flight)</Label>
      <TextArea></TextArea>
    </div> -->
  <!-- specify the reason -->

  <!-- maintenance -->
  <!-- <div>
      <PageTitle primaryText="Maintenance" class="py-4" />
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <Label>Planned maintenance</Label>
          <div class="flex flex-wrap gap-x-10 gap-y-4">
            <InputButton>Yes</InputButton>
            <InputButton>No</InputButton>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <Label>Unplanned maintenance</Label>
          <div class="flex flex-wrap gap-x-10 gap-y-4">
            <InputButton>Yes</InputButton>
            <InputButton>No</InputButton>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <Label>Others</Label>
          <div class="flex flex-wrap gap-x-10 gap-y-4">
            <InputButton>Yes</InputButton>
            <InputButton>No</InputButton>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <Label>Specify the reason: </Label>
          <Label>(for other maintenance)</Label>
          <TextArea></TextArea>
        </div>
      </div>
    </div>
    <div class="flex self-end gap-x-4">
      <BackButton @click="navigate" />
      <ButtonReusable @click="navigate" />
    </div>
  </div> -->
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import Label from "@/components/Headers/Label.vue";
import InputButton from "@/components/Buttons/InputButton.vue";
import { ref, Ref } from "vue";
import TextArea from "@/components/Input/TextArea.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function navigate() {
  router.push({ name: "DailyUpdates" });
}
</script>
