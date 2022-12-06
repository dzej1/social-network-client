import React, { FC } from 'react'
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import "./app.css"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PostList />,
    },
    {
        path: "/detail/:id",
        element: <PostDetail />,
    },
]);

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </div>
  )
}

export default App
