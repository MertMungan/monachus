import {
  Home,
  Circle,
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  ShoppingCart,
  User,
  Codesandbox,
  Settings,
  AlignLeft,
  Activity,
  Cloud,
  Grid
} from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    //  badge: 'light-warning',
    action: 'read',
    resource: 'ACL',
    badgeText: '',
    children: [
      {
        id: 'analytics',
        title: 'Analytics',
        icon: <Circle size={12} />,
        navLink: '/monachus/analytics',
        action: 'read',
        resource: 'ACL'
      },
      {
        id: 'cube',
        title: 'Cube',
        icon: <Circle size={12} />,
        navLink: '/monachus/cube',
        action: ['create', 'read'],
        resource: 'ACL'
      },
      {
        id: 'monitor',
        title: 'Event Monitor',
        icon: <Circle size={12} />,
        navLink: '/monachus/monitor',
        action: ['create', 'read'],
        resource: 'ACL'
      }
    ]
  },
  {
    id: 'cep',
    title: 'CEP',
    icon: <Activity size={20} />,
    badgeText: '',
    action: 'manage',
    resource: 'ACL',
    children: [
      {
        id: 'eventBuilder',
        title: 'Events',
        icon: <Circle size={12} />,
        navLink: '/monachus/eventbuilder',
        action: 'manage',
        resource: 'ACL'
      },
      {
        id: 'ruleCategories',
        title: 'Rule Categories',
        icon: <Codesandbox size={12} />,
        navLink: '/monachus/rulecategories',
        action: 'manage',
        resource: 'Monachus'
      },
      // {
      //   id: "QueryBuilder",
      //   title: "Rule Builder",
      //   icon: <Codesandbox size={12} />,
      //   navLink: "/monachus/rulebuilder",
      //   action: "manage",
      //   resource: "Monachus",
      // },
      {
        id: 'rules',
        title: 'Rules',
        icon: <Circle size={12} />,
        navLink: '/monachus/rules',
        action: 'manage',
        resource: 'ACL'
      },

      // {
      //   id: "flow",
      //   title: "Flow Designer",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/flow",
      //   action: "manage",
      //   resource: "Monachus",
      // },
      {
        id: 'alerts',
        title: 'Alerts',
        icon: <Circle size={12} />,
        navLink: '/monachus/alerts',
        action: 'manage',
        resource: 'Monachus'
      }
    ]
  },
  /*   {
    id: "digitalservices",
    title: "Digital Services",
    icon: <Cloud size={20} />,
    badgeText: "",
    children: [
      {
        id: "search",
        title: "Search",
        icon: <Circle size={12} />,
        navLink: "/monachus/search",
        action: "read",
        resource: "ACL",
      },
      {
        id: "recommendation",
        title: "Recommendation",
        icon: <Circle size={12} />,
        navLink: "/monachus/recommendation",
        action: "read",
        resource: "ACL",
      },
      {
        id: "collections",
        title: "Collections",
        icon: <Circle size={12} />,
        navLink: "/monachus/collections",
        action: "read",
        resource: "ACL",
      },
      {
        id: "notifications",
        title: "Notifications",
        icon: <Circle size={12} />,
        navLink: "/monachus/notifications",
        action: "read",
        resource: "ACL",
      },
      {
        id: "studio",
        title: "Studio",
        icon: <Circle size={12} />,
        navLink: "/monachus/studio",
        action: "read",
        resource: "ACL",
      },
      // {
      //   id: "analytics",
      //   title: "Analytics",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/analytics",
      //   action: "read",
      //   resource: "ACL",
      // },

      // {
      //   id: "location",
      //   title: "Location",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/location",
      //   action: "read",
      //   resource: "ACL",
      // },
      // {
      //   id: "commerce",
      //   title: "Commerce",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/commerce",
      //   action: "read",
      //   resource: "ACL",
      // },
    ],
  }, */
  {
    id: 'dataflow',
    title: 'Data Flow',
    icon: <Grid size={20} />,
    //  badge: 'light-warning',
    badgeText: '',
    action: 'read',
    resource: 'Post',
    children: [
      {
        id: 'connectors',
        title: 'Connectors',
        icon: <Codesandbox size={12} />,
        navLink: '/monachus/connectors',
        action: 'read',
        resource: 'Post'
      },
      // {
      //   id: "cms",
      //   title: "CMS",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/cms",
      //   action: "read",
      //   resource: "ACL",
      // },
      {
        id: 'integrations',
        title: 'Integrations',
        icon: <Circle size={12} />,
        navLink: '/monachus/integrations',
        action: 'read',
        resource: 'Post'
      }
      // {
      //   id: "intelligence",
      //   title: "Intelligence",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/intelligence",
      //   action: "read",
      //   resource: "ACL",
      // },
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings size={20} />,
    badgeText: '',
    action: 'manage',
    resource: 'Monachus',
    children: [
      /* {
        id: "organization",
        title: "Organization",
        icon: <Circle size={12} />,
        navLink: "/monachus/organization",
        action: "manage",
        resource: "Monachus",
      },
      {
        id: "application",
        title: "Application",
        icon: <Circle size={12} />,
        navLink: "/monachus/application",
        action: "manage",
        resource: "Monachus",
      }, */
      {
        id: 'rolesandpermission',
        title: 'Roles & Permission',
        icon: <Circle size={12} />,
        navLink: '/monachus/rolesandpermission',
        action: 'read',
        resource: 'Monachus'
      },
      {
        id: 'users',
        title: 'Users',
        icon: <Circle size={12} />,
        navLink: '/monachus/users',
        action: 'manage',
        resource: 'Monachus'
      },
      {
        id: 'templates',
        title: 'Templates',
        icon: <Circle size={12} />,
        navLink: '/monachus/templates',
        action: 'manage',
        resource: 'Monachus'
      }
      // {
      //   id: "profile",
      //   title: "Profile",
      //   icon: <Circle size={12} />,
      //   navLink: "/monachus/userprofile",
      //   action: "manage",
      //   resource: "Monachus",
      // },
    ]
  },
  {
    id: 'logs',
    title: 'Logs',
    icon: <AlignLeft size={20} />,
    navLink: '/monachus/logs',
    action: 'read',
    resource: 'ACL'
  }
]
