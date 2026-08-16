import React from "react";
import ReactDOM from "react-dom/client";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/legal/privacy";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LegalPage doc={privacyPolicy} />
  </React.StrictMode>,
);
