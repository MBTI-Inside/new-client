import { BrowserRouter, Route, Routes } from "react-router-dom";
import routePaths from "@/routers";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { Suspense } from "react";
import { Loader, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { Layout } from "@/components/Layout";
import { globalTheme } from "@/styles/global";
import { ModalStackManager } from "@/components/Modal";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={globalTheme} withGlobalClasses withStaticClasses>
        <ModalStackManager>
          <Notifications />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
              <Layout>
                <Routes>
                  {routePaths.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </Layout>
            </Suspense>
          </ErrorBoundary>
        </ModalStackManager>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
