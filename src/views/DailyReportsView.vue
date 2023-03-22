<template>
    <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
        <PageTitle :primaryText="title" />
        <div class="flex items-end justify-end">
            <ButtonReusable text="New Report" />
        </div>
        <Table
            :tableHeaders="tableHeaders"
            :tableData="tableData"
            :reports="true"
        />
    </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";

const title = "Daily Reports";

// TODO: retrieve data from api
const tableHeaders: Types.TableHeader = {
    id: "ID",
    acModel: "A/C Model",
    acRegistration: "A/C Registration",
    date: "Date",
    pilot: "Pilot",
    hoistOperator: "Hoist Operator",
    dailyUpdate: "Daily Update",
};
const tableData: Types.Report[] = [
    {
        id: "123",
        acModel: "EC 145",
        acRegistration: "D-HTMK",
        date: new Date("2023-02-14"),
        pilot: "SRO",
        hoistOperator: "BRA",
        dailyUpdate: true,
    },
    {
        id: "124",
        acModel: "EC 145",
        acRegistration: "D-HTMK",
        date: new Date("2023-02-14"),
        pilot: "SRO",
        hoistOperator: "BRA",
        dailyUpdate: true,
    },
];
</script>
