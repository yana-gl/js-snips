import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../../b-pages/home/ui/Page";


const router = createBrowserRouter([
  { path: '/', element: <HomePage/> },
  { path: '/folder/:folderId', element: <HomePage/> },
  // { path: '/trash', element: <TrashPage/> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
