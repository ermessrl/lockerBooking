import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/styles.css'; 
import { AppProvider } from "@toolpad/core/AppProvider";
import { createTheme } from "@mui/material/styles"
const root = ReactDOM.createRoot(document.getElementById('root'));
const BRANDING = {
  logo: (
      <img
      src="logo.png"
      alt="BagLockers Logo"
      style={{ height: 24 }}
      />
  ),
  title: "BagLockers",
};
const ThemeWrapper = () => {
  const theme = createTheme();
  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <App />
    </AppProvider>
  );
};

root.render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
