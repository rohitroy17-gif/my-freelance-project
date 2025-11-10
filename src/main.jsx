import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root.jsx';
import Home from './Home.jsx';
import AllJobs from './AllJobs.jsx';
import AddJob from './AddJob.jsx';
import { LogIn } from 'lucide-react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import MyAddedJobs from './MyAddedJobs.jsx';
import UpdateJob from './UpdateJob.jsx';
import JobDetails from './JobDetails.jsx';
import DeleteJob from './DeleteJob.jsx';
import MyAcceptedTasks from './MyAcceptedTasks.jsx';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import NotFound from './NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
     errorElement: <NotFound />,
    children:[
      {
        index: true,
        Component:Home
      },
      {
        path:"/all-jobs",
        Component:AllJobs
      },
       {
        path:"/add-job",
        Component:AddJob
      },
       {
        path:"/my-tasks",
        Component:MyAcceptedTasks
      },
       {
        path:"/login",
        Component:Login
      },
       {
        path:"/register",
        Component:Register
      },
      {
        path:"/myAddedJobs",
        Component:MyAddedJobs
      },
      {
        path:"/updateJob/:id",
        Component:UpdateJob
      },
      {
        path:"/allJobs/:id",
        Component: JobDetails
      },
      {
        path:"/deleteJob/:id",
        Component: DeleteJob
      }
    
    ]
  },
]);



const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
   </QueryClientProvider>
  </React.StrictMode>,
)
