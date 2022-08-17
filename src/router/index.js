import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/components',
    meta: {
      hidden:true
    },
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/board',
    meta: {
      title: "组件",
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'quill',
        component: () => import('@/views/components/quill-editor/index.vue'),
        name: 'quill',
        meta: {
          title: 'Quill',
          roles: ['admin']
        }
      },
      {
        path: 'board',
        component: () => import('@/views/components/kanban/board.vue'),
        name: 'board',
        meta: {
          title: '看板',
          roles: ['admin']
        }
      },
      {
        path: 'kanban',
        component: () => import('@/views/components/kanban/components/kanban.vue'),
        name: 'kanban',
        meta: {
          title: '看板详情',
          roles: ['admin'],
          hidden: true
        }
      },
      {
        path: 'editable',
        component: () => import('@/views/components/editable/index.vue'),
        name: 'editable',
        meta: {
          title: 'EdiTable',
          roles: ['admin'],
        },
      },
      {
        path: 'tree-table-inline-edit',
        component: () => import('@/views/components/tree-table-inline-edit/index.vue'),
        name: 'tree-table-inline-edit',
        meta: {
          title: '行内编辑树形表格',
          roles: ['admin'],
        },
      },
      {
        path: 'horizon-infinite-rolling',
        component: () => import('@/views/components/horizon-infinite-rolling/index.vue'),
        name: 'horizon-infinite-rolling',
        meta: {
          title: '无线滚动拖动',
          roles: ['admin'],
        },
      },
      {
        path: 'mini-components',
        name: 'mini-components',
        component: () => import('@/views/components/mini-components/index.vue'),
        meta: {
          title: '小组件',
        }
      },
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/scientific-notation',
    meta: {
      title: 'ECharts',
    },
    children: [
      {
        path: 'scientific-notation',
        name: 'scientific-notation',
        component: () => import('@/views/echarts-tricks/scientific-notation/index.vue'),
        meta: {
          title: '科学计数法',
        }
      },
      {
        path: 'translation',
        name: 'translation',
        component: () => import('@/views/echarts-tricks/translation/index.vue'),
        meta: {
          title: '拖拽平移',
        }
      },
      {
        path: 'brush',
        name: 'brush',
        component: () => import('@/views/echarts-tricks/brush/index.vue'),
        meta: {
          title: '刷选操作',
        }
      },
      {
        path: 'enlarge',
        name: 'enlarge',
        component: () => import('@/views/echarts-tricks/enlarge/index.vue'),
        meta: {
          title: '放大和拖拽',
        }
      },
      {
        path: 'fund',
        name: 'fund',
        component: () => import('@/views/echarts-tricks/fund/index.vue'),
        meta: {
          title: '基金',
        }
      },
    ]
  },
  {
    path: '/gojs',
    component: Layout,
    redirect: '/gojs/tournament',
    meta: {
      title: 'GoJS',
    },
    children: [
      {
        path: 'tournament',
        name: 'tournament',
        component: () => import('@/views/gojs/tournament/index.vue'),
        meta: {
          title: '竞赛',
        }
      },
      {
        path: 'decision-tree',
        name: 'decision-tree',
        component: () => import('@/views/gojs/decision-tree/index.vue'),
        meta: {
          title: '决策树',
        }
      },
    ]
  },
  {
    path: '/css',
    component: Layout,
    redirect: '/css/flex',
    meta: {
      title: 'CSS',
    },
    children: [
      {
        path: 'flex',
        name: 'flex',
        component: () => import('@/views/css-tricks/flex.vue'),
        meta: {
          title: 'flex布局',
        }
      },
      // TODO: fix router bug
      {
        path: 'flex1',
        name: 'flex1',
        meta: {
          title: 'flex布局1',
        },
        children:[
          {
            path: 'flex11',
            name: 'flex11',
            component: () => import('@/views/css-tricks/flex.vue'),
            meta: {
              title: 'flex布局11',
            }
          },
          {
            path: 'flex12',
            name: 'flex12',
            meta: {
              title: 'flex布局12',
            }
          },
        ]
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
