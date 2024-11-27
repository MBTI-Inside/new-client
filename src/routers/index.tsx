import { lazy } from "react";

const MainPage = lazy(() => import("@/pages/Main"));
const MemoPage = lazy(() => import("@/pages/Memo"));
const MemoViewPage = lazy(() => import("@/pages/Memo/View"));
const QuestionPage = lazy(() => import("@/pages/Question"));
const QuestionViewPage = lazy(() => import("@/pages/Question/View"));
const ResultPage = lazy(() => import("@/pages/Result"));
const StatsPage = lazy(() => import("@/pages/Stats"));
const TestPage = lazy(() => import("@/pages/Test"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const routePaths = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/memo",
    element: <MemoPage />,
  },
  {
    path: "/memo/:id",
    element: <MemoViewPage />,
  },
  {
    path: "/question",
    element: <QuestionPage />,
  },
  {
    path: "/question/:id",
    element: <QuestionViewPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/stats",
    element: <StatsPage />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routePaths;
