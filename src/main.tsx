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
          colorPrimary: "#991d03",
          colorBgContainer: "#fff",
          fontFamily: "Poppins, Inter, 'Noto Sans'",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
