// Docs: https://router.vuejs.org/
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Dashboard",
        component: () => import("../views/DashboardView.vue"),
    },
    {
        path: "/DailyReports",
        name: "DailyReports",
        component: () => import("../views/DailyReportsView.vue"),
    },
    {
        path: "/DailyReports/:id",
        name: "DailyReport",
        component: () => import("../views/Flights/DailyReportView.vue"),
    },
    {
        path: "/DailyUpdates",
        name: "DailyUpdates",
        component: () => import("../views/DailyUpdatesView.vue"),
    },
    {
        path: "/Sites",
        name: "Sites",
        component: () => import("../views/SitesView.vue"),
    },
    {
        path: "/Profile",
        name: "Profile",
        component: () => import("../views/ProfileView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
