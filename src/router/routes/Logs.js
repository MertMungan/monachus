import { lazy } from 'react'


const Logs=[
    {
        path: '/monachus/logs',
        component: lazy(() => import('../../views/pages/misc/WIP')),
        exact: true,
        meta: {
          action: 'read',
          resource: 'logs'
        }
      },
]

export default Logs