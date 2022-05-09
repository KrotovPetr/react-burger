import React from 'react';
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

const IngredientList = (props) => {
    const dispatch = useDispatch();

    const { ingredients } = useSelector(
        (store) => ({
            ingredients: store.component.ingredients,
        }),
        shallowEqual
    );

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
                                    onClick={(e) => {
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
