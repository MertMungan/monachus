import {
  Home,
  Activity,
  ShoppingCart,
  Circle,
  CheckSquare,
  Calendar
} from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    badge: 'light-warning',
    badgeText: 'Test',
    children: [
      {
        id: 'analyticsDash',
        title: 'Analytics',
        icon: <Activity />,
        navLink: '/dashboard/analytics'
      },
      // {
      //   id: 'eCommerceDash',
      //   title: 'eCommerce',
      //   icon: <ShoppingCart />,
      //   navLink: '/dashboard/ecommerce'
      // },
      {
        id: 'eCommerceDash2',
        title: 'eCommerce2',
        icon: <ShoppingCart />,
        navLink: '/dashboard/test'
      },
      {
        id: 'QueryBuilder',
        title: 'Query',
        icon: <Circle size={12} />,
        navLink: '/dashboard/querybuilder'
      },
      {
        id: 'FactBuilder',
        title: 'Facts',
        icon: <Circle size={12} />,
        navLink: '/dashboard/factbuilder'
      },
      {
        id: 'todo',
        title: 'Todo',
        icon: <CheckSquare />,
        navLink: '/apps/todo'
      },
      {
        id: 'calendar',
        title: 'Calendar',
        icon: <Calendar />,
        navLink: '/apps/calendar'
      }
    ]
  }
]
