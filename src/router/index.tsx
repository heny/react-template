import React from 'react';
import { Routes, useLocation, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NotFound from '@/views/404';
import RouteLayout from '@/router/RouteLayout';
import routes from './routes';

function renderRoutes(routeList) {
  return routeList.map((item) => {
    const { children, path, ...rest } = item;
    if (children) {
      return (
        <Route path={path} element={<RouteLayout {...rest} />} key={path}>
          {renderRoutes(children)}
        </Route>
      );
    }
    return <Route path={path} element={<RouteLayout {...rest} />} key={path} />;
  });
}

function Router() {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary FallbackComponent={NotFound} resetKeys={[pathname]}>
      <Routes>{renderRoutes(routes)}</Routes>
    </ErrorBoundary>
  );
}

export default Router;
