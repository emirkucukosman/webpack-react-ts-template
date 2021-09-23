import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

export const renderRoutes = (routes: any[]) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFoundView")),
  },
  {
    path: "*",
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("src/views/home/HomeView")),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
