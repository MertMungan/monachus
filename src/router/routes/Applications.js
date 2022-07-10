import { lazy } from "react";

const Applications = [
  {
    path: "/monachus/connectors",
    component: lazy(() => import("../../views/pages/actions")),
    exact: true,
    meta: {
      action: "manage",
      resource: "Monachus",
      menuCollapsed: true,
    },
  },

  {
    path: "/monachus/cms",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/integrations",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/monachus/intelligence",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
];

export default Applications;
