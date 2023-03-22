<template>
    <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
        <PageTitle primaryText="Flight" />
        <div class="flex flex-col gap-6 my-8">
            <div class="flex flex-col gap-1">
                <Label>Flight Number</Label>
                <Input />
            </div>
            <div class="flex flex-col gap-1">
                <Label>From</Label>
                <div class="flex gap-16">
                    <InputButton v-for="airport in airpots">
                        {{ airport.name }}
                    </InputButton>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <Label>Via</Label>
                <div class="flex gap-16">
                    <InputButton v-for="site in otherSites">
                        {{ site.name }}
                    </InputButton>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <Label>To</Label>
                <div class="flex gap-16">
                    <InputButton v-for="airport in airpots">
                        {{ airport.name }}
                    </InputButton>
                </div>
            </div>
            <div class="flex gap-16">
                <TimeInput>ETD</TimeInput>
                <TimeInput>Rotor Start</TimeInput>
                <TimeInput>ATD</TimeInput>
            </div>
            <div class="flex gap-16">
                <TimeInput>ETA</TimeInput>
                <TimeInput>Rotor Stop</TimeInput>
                <TimeInput>ATA</TimeInput>
            </div>
            <div class="flex gap-16">
                <div class="flex flex-col gap-1">
                    <Label>Block Time</Label>
                    <Input />
                </div>
                <div class="flex flex-col gap-1">
                    <Label>Flight Time</Label>
                    <Input />
                </div>
            </div>
            <div class="flex gap-16">
                <div class="flex flex-col gap-1">
                    <Label>Delay</Label>
                    <Input />
                </div>
                <div class="flex flex-col gap-1">
                    <Label>Delay Reason</Label>
                    <Select :options="options" />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <Label>Delay Description</Label>
                <TextArea></TextArea>
            </div>
            <div class="flex gap-16">
                <div class="flex flex-col gap-1">
                    <Label>PAX</Label>
                    <Input />
                </div>
                <div class="flex flex-col gap-1">
                    <Label>PAX TAX</Label>
                    <Input />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <Label>Cargo per Person</Label>
                <Input />
            </div>
            <div class="flex flex-col gap-1">
                <Label>Hoist Cycles</Label>
                <Input />
            </div>
        </div>
        <div class="flex self-end gap-4">
            <BackButton @click="navigate" />
            <ButtonReusable @click="navigate" />
        </div>
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

const router = useRouter();

const airpots: Types.Site[] = [
    {
        id: 1,
        name: "ESB",
    },
    {
        id: 2,
        name: "CPH",
    },
    {
        id: 3,
        name: "AAL",
    },
];
const otherSites: Types.OtherSite[] = [
    {
        id: 1,
        name: "B06",
    },
    {
        id: 2,
        name: "A32",
    },
    {
        id: 3,
        name: "B01",
    },
];
const options: String[] = ["Weather", "Technical", "Other"];

function navigate() {
    router.push({ name: "DailyReports" });
}
</script>
