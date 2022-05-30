import React from 'react';
import nfStyles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
const NotFoundPage = () => {
    const history = useHistory();
    return (
        <div className={nfStyles.commonContainer}>
            <div className={nfStyles.formContainer}>
                <div className={nfStyles.headerContainer}>
                    <h1 className="text">404</h1>
                    <h2 className="text">Page not found</h2>
                </div>

                <Button
                    type="primary"
                    size="medium"
                    onClick={() => history.replace({ pathname: '/' })}>
                    Назад
                </Button>
            </div>
        </div>
    );
};

//propTypes - нету
export default NotFoundPage;
