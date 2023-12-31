import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// pages
import { message } from "antd";
import Dashboard from "@pages/dashboard";

message.config({
  duration: 3,
  maxCount: 3,
  prefixCls: "my-message",
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/users/*",
      element: <Dashboard />,
    },
    {
      path: "/*",
      element: <Navigate to={"/users"} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
