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
    component: () => import("@/views/DailyReports/DailyReportsView.vue"),
  },
  {
    path: "/DailyReports/:id",
    name: "DailyReportDetails",
    component: () => import("@/views/DailyReports/DailyReportDetails.vue"),
  },
  {
    path: "/DailyUpdates",
    name: "DailyUpdates",
    component: () => import("@/views/DailyUpdates/DailyUpdatesView.vue"),
  },
  {
    path: "/DailyUpdates/:id",
    name: "DailyUpdate",
    component: () => import("@/views/DailyUpdates/DailyUpdateDetails.vue"),
  },
  {
    path: "/DailyUpdates/new",
    name: "NewDailyUpdate",
    component: () => import("@/views/DailyUpdates/CreateDailyUpdate.vue"),
  },
  {
    path: "/Sites",
    name: "Sites",
    component: () => import("@/views/Locations/LocationsView.vue"),
  },
  {
    path: "/Sites/new",
    name: "NewLocation",
    component: () => import("@/views/Locations/CreateLocation.vue"),
  },
  {
    path: "/Locations/:id",
    name: "LocationDetails",
    component: () => import("@/views/Locations/LocationDetails.vue"),
  },
  {
    path: "/Sites/:id",
    name: "SiteDetails",
    component: () => import("@/views/Locations/SiteDetails.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/Flights",
    name: "Flights",
    component: () => import("@/views/Flights/FlightsView.vue"),
  },
  {
    path: "/Flights/:id",
    name: "FlightDetails",
    component: () => import("@/views/Flights/FlightDetails.vue"),
  },
  {
    path: "/Flights/new",
    name: "NewFlight",
    component: () => import("@/views/Flights/CreateFlight.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
