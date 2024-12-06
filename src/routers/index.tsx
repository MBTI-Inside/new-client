import {
  MainPage,
  MemoPage,
  MemoViewPage,
  QuestionPage,
  QuestionViewPage,
  ResultPage,
  StatsPage,
  TestPage,
  NotFoundPage,
} from "@/pages";

const routePaths = [
  { path: "/", element: <MainPage /> },
  { path: "/memo", element: <MemoPage /> },
  { path: "/memo/:id", element: <MemoViewPage /> },
  { path: "/question", element: <QuestionPage /> },
  { path: "/question/:id", element: <QuestionViewPage /> },
  { path: "/result/:mbti", element: <ResultPage /> },
  { path: "/stats", element: <StatsPage /> },
  { path: "/test", element: <TestPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default routePaths;
