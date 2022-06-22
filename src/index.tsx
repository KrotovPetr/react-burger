import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/app/app';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Services/reducers/components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
