// Docs: https://router.vuejs.org/
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "dashboard",
        component: () => import("../components/Dashboard.vue"),
    },
    {
        path: "/DailyReports",
        name: "DailyReports",
        component: () => import("../components/DailyReports.vue"),
    },
    {
        path: "/DailyUpdates",
        name: "DailyUpdates",
        component: () => import("../components/DailyUpdates.vue"),
    },
    {
        path: "/Sites",
        name: "Sites",
        component: () => import("../components/Sites.vue"),
    },
    {
        path: "/Profile",
        name: "Profile",
        component: () => import("../components/Profile.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
