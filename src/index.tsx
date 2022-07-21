import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/app/app';
import { compose } from 'redux';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './utils/types/store';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename="/react-burger">
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
