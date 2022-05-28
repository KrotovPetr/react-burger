import React, { useEffect } from 'react';
import constructBurger from '../burger-ingredients.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './ingredient-list.module.css';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    setData,
    setActive,
    dragElement,
} from '../../../Services/actions/components';
import { Redirect, useLocation } from 'react-router-dom';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';

const IngredientList = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { ingredients, cardData } = useSelector(
        (store) => ({
            ingredients: store.component.ingredients,
            cardData: store.component.cardData,
        }),
        shallowEqual
    );
    // console.log(cardData);
    useEffect(() => {
        if (getCookie('isActive') !== undefined) {
            dispatch(setActive(true));
            getCookie('data') !== undefined &&
                dispatch(setData(JSON.parse(getCookie('data'))));
        } else {
            dispatch(setActive(false));
        }
    }, []);

    if (cardData) {
        return (
            <Redirect
                to={{
                    pathname: '/ingredients/' + cardData['_id'],
                    state: { background: location },
                }}
            />
        );
    }

    return (
        <div className={cardStyle.cardArea}>
            {ingredients &&
                ingredients.map(
                    (cards) =>
                        props.typeOfMeal === cards.type && (
                            <div
                                key={cards['_id']}
                                draggable
                                onDrag={(e) => {
                                    e.preventDefault();
                                    dispatch(
                                        dragElement(cards, 'ingredients', false)
                                    );
                                }}>
                                <div
                                    className={cardStyle.card}
                                    onClick={() => {
                                        dispatch(setData(cards));
                                        dispatch(setActive(true));
                                    }}>
                                    {cards['__v'] > 0 && (
                                        <Counter
                                            count={cards['__v']}
                                            size="default"
                                        />
                                    )}
                                    <img
                                        alt="Фото ингридиента"
                                        src={cards.image}
                                        className={cardStyle.cardImage}
                                    />
                                    <div className={constructBurger.price}>
                                        <p className="text text_type_digits-default">
                                            {cards.price}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className="text text_type_main-default">
                                        {cards.name}
                                    </p>
                                </div>
                            </div>
                        )
                )}
        </div>
    );
};

// Передаются
// typeOfMeal

IngredientList.propTypes = {
    typeOfMeal: PropTypes.string.isRequired,
};

export default IngredientList;
