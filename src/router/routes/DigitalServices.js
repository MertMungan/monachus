import { lazy } from "react";

const DigitalServices = [
  {
    path: "/monachus/notifications",
    component: lazy(() => import("../../views/pages/notification/")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/studio",
    component: lazy(() => import("../../views/pages/designer")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/analytics",
    component: lazy(() => import("../../views/dashboard/analytics")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/search",
    component: lazy(() => import("../../views/pages/search/index")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/collections",
    component: lazy(() => import("../../views/pages/collection/index")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/recommendation",
    component: lazy(() => import("../../views/pages/recommedition/index")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/location",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/commerce",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
];

export default DigitalServices;
