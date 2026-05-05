import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy, useMemo } from "react";
import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";

import ScrollToTop from "./components/UI/ScrollToTop";
import ScrollToTopButton from "./components/UI/ScrollToTopButton";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

//  Lazy load pages (performance boost 🚀)
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Forex = lazy(() => import("./pages/Forex").then(m => ({ default: m.Forex })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const ErrorPage = lazy(() => import("./pages/ErrorPage").then(m => ({ default: m.ErrorPage })));
const PopularDestinations = lazy(() =>
  import("./pages/PopularDestinations").then(m => ({ default: m.PopularDestinations }))
);
const Maldives = lazy(() => import("./pages/Maldives"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const FAQ = lazy(() => import("./pages/FAQ").then(m => ({ default: m.FAQ })));
const UnderConstruction = lazy(() => import("./pages/UnderConstruction"));


//  Layout wrapper (no re-render)
const LayoutWithScroll = () => (
  <>
    <ScrollToTop />
    <ScrollToTopButton />
    <AppLayout />
  </>
);

//  Router (memoized for stability)
const useAppRouter = () =>
  useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <LayoutWithScroll />,
          errorElement: (
            <Suspense fallback={<div>Loading...</div>}>
              <ErrorPage />
            </Suspense>
          ),
          children: [
            {
              path: "/",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              ),
            },
            {
              path: "about",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
              ),
            },
            {
              path: "Popular-Destinations",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PopularDestinations />
                </Suspense>
              ),
            },
            {
              path: "Forex",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Forex />
                </Suspense>
              ),
            },
            {
              path: "contact",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </Suspense>
              ),
            },
            {
              path: "maldives",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Maldives />
                </Suspense>
              ),
            },
            {
              path: "/package/:id",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PackageDetails />
                </Suspense>
              ),
            },
            {
              path: "/payment/:id",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PaymentPage />
                </Suspense>
              ),
            },
            {
              path: "under-construction",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <UnderConstruction />
                </Suspense>
              ),
            },
            {
              path: "faq",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <FAQ />
                </Suspense>
              ),
            },
                        {
              path: "Admin",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Admin />
                </Suspense>
              ),
            },
                                    {
              path: "Login",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              ),
            },
                                                {
              path: "Profile",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              ),
            },
                                                            {
              path: "Settings",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Settings />
                </Suspense>
              ),
            },
          ],
        },
      ]),
    []
  );

function App() {
  const router = useAppRouter();
  return <RouterProvider router={router} />;
}

export default App;