import { lazy } from "react";

export const MainPage = lazy(() => import("@/pages/Main"));
export const MemoPage = lazy(() => import("@/pages/Memo"));
export const MemoViewPage = lazy(() => import("@/pages/Memo/View"));
export const QuestionPage = lazy(() => import("@/pages/Question"));
export const QuestionViewPage = lazy(() => import("@/pages/Question/View"));
export const ResultPage = lazy(() => import("@/pages/Result"));
export const StatsPage = lazy(() => import("@/pages/Stats"));
export const TestPage = lazy(() => import("@/pages/Test"));
export const NotFoundPage = lazy(() => import("@/pages/NotFound"));
