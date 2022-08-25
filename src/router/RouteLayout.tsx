import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

const BasicRoute = React.memo((props: any) => {
  const { component: Component, title, ...rest } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Suspense fallback={<div>loading...</div>}>
        <Component {...rest} />
      </Suspense>
    </>
  );
});

BasicRoute.displayName = 'Route';

export default BasicRoute;
