import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "@lib/redux/store";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2752e7",
          colorBgContainer: "#fff",
          fontFamily: "Inter",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
