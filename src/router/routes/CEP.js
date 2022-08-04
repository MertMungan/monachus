import { lazy } from 'react'

const CEPRoutes = [
  {
    path: '/monachus/events',
    component: lazy(() => import('../../views/dashboard/testdashboard')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  {
    path: '/monachus/rules',
    component: lazy(() => import('../../views/pages/rules/index.js')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  // {
  //   path: "/monachus/rulebuilder",
  //   component: lazy(() => import("../../views/dashboard/querybuilder")),
  //   exact: true,
  //   meta: {
  //     action: "manage",
  //     resource: "Monachus",
  //   },
  // },

  {
    path: '/monachus/flow',
    component: lazy(() => import('../../views/pages/misc/WIP')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  {
    path: '/monachus/rulecategories',
    component: lazy(() => import('../../views/pages/ruleCategory')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  {
    path: '/monachus/eventbuilder',
    component: lazy(() => import('../../views/dashboard/factbuilder')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  {
    path: '/monachus/alerts',
    component: lazy(() => import('../../views/pages/alert')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  {
    path: '/monachus/cube',
    component: lazy(() => import('../../views/cube/index')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  },
  {
    path: '/monachus/explore',
    component: lazy(() => import('../../views/cube/explore')),
    exact: true,
    meta: {
      action: 'read',
      resource: 'cep'
    }
  }
]

export default CEPRoutes
