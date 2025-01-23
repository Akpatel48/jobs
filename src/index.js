import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/Careersite.css"
import { store, persistor } from './redux/store';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


