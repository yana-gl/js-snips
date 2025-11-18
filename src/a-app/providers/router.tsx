import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../../b-pages/homePage/homePage";

const router = createBrowserRouter([
    { path: '/', element: <HomePage/> },
    { path: '/folder/:folderId', element: <HomePage/> },
]);

export const AppRouter = () => <RouterProvider router={router} />;
