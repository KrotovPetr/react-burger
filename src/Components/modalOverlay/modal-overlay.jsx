import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    clearInfo,
    setActive,
    setData,
} from '../../Services/actions/components';
import { useHistory } from 'react-router-dom';

const ModalOverlay = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { orderInfo } = useSelector(
        (store) => ({
            orderInfo: store.component.orderInfo,
        }),
        shallowEqual
    );
    return (
        <div
            className={overlayStyles.modalActive}
            onClick={() => {
                orderInfo ? dispatch(clearInfo()) : dispatch(setData(null));
                dispatch(setActive(false));
                history.replace({
                    pathname: '/',
                });
            }}
        />
    );
};

export default ModalOverlay;
