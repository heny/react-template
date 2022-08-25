import React, { lazy } from 'react';

const ErrorPage = lazy(() => import('@/views/404'));
const Home = lazy(() => import('@/views/Home'));

interface Routes {
  title?: string;
  path: string;
  component?: React.LazyExoticComponent<any>;
  to?: string;
  children?: Routes[];
}

const routes: Routes[] = [
  {
    title: 'Home',
    path: '/',
    component: Home,
  },
  {
    path: 'redirect',
    to: '/',
  },
  {
    title: '404',
    path: '*', // 表示任意路由
    component: ErrorPage,
  },
];

export default routes;
