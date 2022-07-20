import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/app/app';
import { compose } from 'redux';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './utils/types/store';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename="/react-burger">
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
