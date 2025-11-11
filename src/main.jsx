import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./Root.jsx";
import Home from "./Home.jsx";
import AllJobs from "./AllJobs.jsx";
import AddJob from "./AddJob.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import MyAddedJobs from "./MyAddedJobs.jsx";
import UpdateJob from "./UpdateJob.jsx";
import JobDetails from "./JobDetails.jsx";
import DeleteJob from "./DeleteJob.jsx";
import MyAcceptedTasks from "./MyAcceptedTasks.jsx";
import NotFound from "./NotFound.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import { AuthProvider } from "./AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-jobs", element: <AllJobs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Protected routes wrapped individually
      { path: "add-job", element: <PrivateRoute><AddJob /></PrivateRoute> },
      { path: "my-tasks", element: <PrivateRoute><MyAcceptedTasks /></PrivateRoute> },
      { path: "myAddedJobs", element: <PrivateRoute><MyAddedJobs /></PrivateRoute> },
      { path: "updateJob/:id", element: <PrivateRoute><UpdateJob /></PrivateRoute> },
      { path: "allJobs/:id", element: <PrivateRoute><JobDetails /></PrivateRoute> },
      { path: "deleteJob/:id", element: <PrivateRoute><DeleteJob /></PrivateRoute> },
    ]
  }
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);


