import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {StoreProvider} from "./app/context/StoreContext";
import {Provider} from "react-redux";
import {store} from "./app/store/configureStore";





const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
<<<<<<< HEAD
                <App />
=======
                <Provider store={store}>
                    <App />
                </Provider>
              
>>>>>>> bbfd7ffc7d19fbc379c0c00f2e0dd80a92083fd4
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();