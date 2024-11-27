import App from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root") as HTMLElement;

const rootElement = createRoot(root);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // 모든 쿼리에 대해 suspense 활성화
    },
  },
});

rootElement.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
