import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import AppRoutes from "./routes/AppRoutes";
import styles from "./App.module.css";

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <div className={styles.app}>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
