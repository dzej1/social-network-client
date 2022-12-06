import React, { FC } from 'react'
import PostList from "./PostList";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import "./app.css"

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <PostList />
        </QueryClientProvider>
    </div>
  )
}

export default App
