import { BrowserRouter, Route, Routes } from "react-router-dom";
import routePaths from "@/routers";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { Suspense } from "react";
import { Loader, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <Routes>
              {routePaths.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
