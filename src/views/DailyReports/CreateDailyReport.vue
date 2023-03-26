<template>
  <div class="flex flex-col m-14 gap-12">
    <PageTitle primaryText="New Daily Report" />
    <!-- Flight Number -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <div class="flex flex-col gap-1">
        <Label>Flight Number</Label>
        <Input />
      </div>
    </div>
    <!-- Flight Number -->
    <!-- A/C Model -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <div class="flex flex-col gap-1">
        <Label>A/C Model</Label>
        <div class="flex flex-wrap gap-x-10 gap-y-4">
          <div v-for="helicopter in helicopters">
            <InputButton
              v-model="flight.acModel"
              :isSelected="flight.acModel === helicopter.model"
              :value="helicopter.model"
              :key="helicopter.id"
              @click="flight.acModel = helicopter.model"
            >
              {{ helicopter.model }}
            </InputButton>
          </div>
        </div>
      </div>
    </div>
    <!-- A/C Model -->
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import Input from "@/components/Input/Input.vue";
import InputButton from "@/components/Buttons/InputButton.vue";
import Label from "@/components/Headers/Label.vue";
import TimeInput from "@/components/Input/TimeInput.vue";
import Select from "@/components/Select/Select.vue";
import TextArea from "@/components/Input/TextArea.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useRouter } from "vue-router";
import { Ref, ref } from "vue";

const router = useRouter();

const flight = ref({
  id: "",
  acModel: "",
  acRegistration: "",
  date: "",
  pilot: "",
  hoistOperator: "",
  dailyUpdate: false,
});

const helicopters: Types.Helicopter[] = [
  {
    id: "1",
    model: "Bell 206",
    registration: "N206",
  },
  {
    id: "2",
    model: "Bell 206",
    registration: "N207",
  },
  {
    id: "3",
    model: "Bell 206",
    registration: "N208",
  },
];

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
