import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  // {
  //   path: "/monachus/rulebuilder/:id",
  //   component: lazy(() => import("../../views/dashboard/querybuilder")),
  //   meta: {
  //     action: "read",
  //     resource: "ACL",
  //   },
  // },
  {
    path: '/monachus/profile',
    component: lazy(() => import('../../views/pages/profile')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  },
  {
    path: '/monachus/accounts',
    component: lazy(() => import('../../views/pages/misc/WIP')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  },
  {
    path: '/monachus/authentication',
    component: lazy(() => import('../../views/pages/misc/WIP')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  },
  {
    path: '/monachus/monitor',
    component: lazy(() => import('../../views/dashboard/testdashboard')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  },
  {
    path: '/monachus/analytics',
    component: lazy(() => import('../../views/pages/misc/WIP')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'dashboard'
    }
  }
]

export default DashboardRoutes
