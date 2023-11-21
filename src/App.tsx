import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      path: "/",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
