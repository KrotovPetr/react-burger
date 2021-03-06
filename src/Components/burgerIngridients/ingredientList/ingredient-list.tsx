import React, { FC, useEffect } from 'react';
import constructBurger from '../burger-ingredients.module.css';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from './ingredient-list.module.css';
import {
    setData,
    setActive,
    dragElement,
} from '../../../Services/actions/componentAction/components';
import { Redirect, useLocation } from 'react-router-dom';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';
import { TCard } from '../../../utils/types/types';
import { useDispatch, useSelector } from '../../../utils/types/store';

interface IProps {
    typeOfMeal: string | undefined;
}

const IngredientList: FC<IProps> = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { ingredients, cardData } = useSelector((store) => ({
        ingredients: store.component.ingredients,
        cardData: store.component.cardData,
    }));
    // console.log(cardData);
    useEffect(() => {
        if (getCookie('isActive') !== undefined) {
            dispatch(setActive(true));
            let getCookieResp: string | undefined = getCookie('data');
            getCookieResp !== undefined &&
                dispatch(setData(JSON.parse(getCookieResp)));
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
    // console.log(ingredients);

    return (
        <div className={cardStyle.cardArea}>
            {ingredients &&
                ingredients.map(
                    (cards: TCard) =>
                        props.typeOfMeal === cards.type && (
                            <div
                                key={cards['_id']}
                                data-cy="ing"
                                draggable
                                className={cardStyle.cardBox}
                                onDrag={(
                                    e: React.DragEvent<HTMLDivElement>
                                ): void => {
                                    e.preventDefault();
                                    dispatch(
                                        dragElement(cards, 'ingredients', false)
                                    );
                                }}>
                                <div
                                    className={cardStyle.cardContainer}
                                    onClick={(): void => {
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
                                        alt="???????? ??????????????????????"
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

export default IngredientList;
