import React, { useEffect, useState } from 'react';
import ingredientStyles from './ingredStyles.module.css';
import { shallowEqual, useSelector } from 'react-redux';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { getCookie } from '../../Services/actions/requestsActions';
const Ingredient = () => {
    const [ingred, setIngred] = useState(null);
    const { ingredients } = useSelector(
        (store) => ({
            ingredients: store.component.ingredients,
        }),
        shallowEqual
    );
    const history = useHistory();
    const isAuth = () => {
        return getCookie('accessToken') !== undefined;
    };
    const { url } = useRouteMatch();
    useEffect(() => {
        if (!isAuth()) {
            history.replace({ pathname: '/' });
        } else {
            let idIngr = -1;
            ingredients.map((cards, index) => {
                if (cards['_id'] === url.split('/')[2]) {
                    idIngr = index;
                }
                // console.log(idIngr);
                setIngred(ingredients[idIngr]);
            });
        }
    }, [ingredients]);

    return (
        <div className={ingredientStyles.commonContainer}>
            {ingred && (
                <div className={ingredientStyles.ingredContainer}>
                    <h1 className="text text_type_main-large">
                        Детали ингредиента
                    </h1>
                    <img src={ingred.image_large} alt={ingred.name} />

                    <h2 className="text text_type_main-medium text_color_active">
                        {ingred.name}
                    </h2>
                    <div className={ingredientStyles.descriptionDiv}>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-small text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.calories}*/}
                                {ingred.calories}
                            </p>
                        </div>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-small text_color_inactive">
                                Белки г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.proteins}*/}
                                {ingred.proteins}
                            </p>
                        </div>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-small text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.fat}*/}
                                {ingred.fat}
                            </p>
                        </div>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.carbohydrates}*/}
                                {ingred.carbohydrates}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ingredient;
