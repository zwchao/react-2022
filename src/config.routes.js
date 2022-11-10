/**
 * @file: /react-2022/src/config.routes.js
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */

import { lazy } from 'react';
import { lazyWithAuth, navigateTo } from '@/components/RouteUtils';
import { Page404 } from '@/pages/exception';
export const routeList = [
  {
    index: true,
    element: navigateTo('/test1'),
  },
  {
    path: '/test1',
    element: lazyWithAuth(lazy(() => import('@/pages/test1'))),
  },
  {
    path: '/test2',
    children: [
      {
        path: 'page1',
        children: [
          {
            index: true,
            element: lazyWithAuth(lazy(() => import('@/pages/test2/page1'))),
          }
        ],
      },
    ],
  },
  {
    path: '404',
    element: Page404(),
  },
  { path: '*', element: navigateTo('/404') },
];