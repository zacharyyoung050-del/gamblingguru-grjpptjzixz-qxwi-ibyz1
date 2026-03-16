import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { CasinosPage } from '@/pages/CasinosPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { CasinoDetailPage } from '@/pages/CasinoDetailPage'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "casinos",
        element: <CasinosPage />,
      },
      {
        path: "casinos/:id",
        element: <CasinoDetailPage />,
      },
      {
        path: "articles",
        element: <ArticlesPage />,
      },
      {
        path: "articles/:id",
        element: <ArticleDetailPage />,
      }
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)