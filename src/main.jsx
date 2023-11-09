import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostLayout from './components/postLayout.jsx'
import DynamicEditor from './draftRichText.jsx'

const routes = [
  { path: "/", element: <App /> },
  { path: "/post-layout", element: <PostLayout /> },
  { path: "/draftjs", element: <DynamicEditor /> },
];
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </NextUIProvider>
  // </React.StrictMode>
);
