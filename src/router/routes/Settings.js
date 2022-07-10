import { lazy } from "react";

const Settings = [
  /*  {
    path: "/monachus/organization",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "manage",
      resource: "Monachus",
    },
  },
  {
    path: "/monachus/application",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "manage",
      resource: "Monachus",
    },
  }, */
  {
    path: "/monachus/users",
    component: lazy(() => import("../../views/pages/settings/users_2/users")),
    exact: true,
    meta: {
      action: "manage",
      resource: "Monachus",
    },
  },
  {
    path: "/monachus/rolesandpermission",
    component: lazy(() => import("../../views/pages/settings/RolesandPermission")),
    exact: true,
    meta: {
      action: "manage",
      resource: "Monachus",
    },
  },
  {
    path: "/monachus/templates",
    component: lazy(() => import("../../views/pages/misc/WIP")),
    exact: true,
    meta: {
      action: "manage",
      resource: "Monachus",
    },
  },
  // {
  //   path: "/monachus/userprofile",
  //   component: lazy(() => import("../../views/pages/misc/WIP")),
  //   exact: true,
  //   meta: {
  //     action: "manage",
  //     resource: "Monachus",
  //   },
  // },
];

export default Settings;
