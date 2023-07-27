import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const UserLayout = lazy(() => import("../layouts/UserLayout"));

//pages
const LoginPage = lazy(() => import("../pages/AuthPage/SignInPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/AuthPage/RegisterPage"));
const DetailPage = lazy(() => import("../pages/DetailPage/DetailPage"));
const CreateProjectPage = lazy(() =>
  import("../pages/CreateProjectPage/CreateProjectPage")
);

const routes = [
  { path: "/", layout: UserLayout, element: HomePage },
  {
    path: "/projectDetail/:projectId",
    layout: UserLayout,
    element: DetailPage,
  },
  { path: "/login", layout: null, element: LoginPage },
  { path: "/register", layout: null, element: RegisterPage },
  { path: "/createProject", layout: UserLayout, element: CreateProjectPage },
];
export default function RouteMain() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {routes.map((item, index) => {
            let { path, layout, element } = item;
            const Component = element;
            const Layout = layout || Fragment;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
