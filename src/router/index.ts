// Docs: https://router.vuejs.org/
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: "/DailyReports",
    name: "DailyReports",
    component: () => import("@/views/DailyReportsView.vue"),
  },
  {
    path: "/DailyReports/new",
    name: "NewDailyReport",
    component: () => import("@/views/DailyReports/CreateDailyReport.vue"),
  },
  {
    path: "/DailyReports/:id",
    name: "DailyReport",
    component: () => import("@/views/DailyReports/DailyReportView.vue"),
  },
  {
    path: "/DailyUpdates",
    name: "DailyUpdates",
    component: () => import("@/views/DailyUpdatesView.vue"),
  },
  {
    path: "/DailyUpdates/new",
    name: "NewDailyUpdate",
    component: () => import("@/views/DailyUpdates/CreateDailyUpdate.vue"),
  },
  {
    path: "/DailyUpdates/:id",
    name: "DailyUpdate",
    component: () => import("@/views/DailyUpdates/DailyUpdateDetails.vue"),
  },
  {
    path: "/Flights/new",
    name: "NewFlight",
    component: () => import("@/views/Flights/FlightDetails.vue"),
  },
  {
    path: "/Flights/:id",
    name: "Flight",
    component: () => import("@/views/Flights/FlightDetails.vue"),
  },
  {
    path: "/Sites",
    name: "Sites",
    component: () => import("@/views/SitesView.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("@/views/ProfileView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
