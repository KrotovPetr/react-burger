import React, { useEffect, useState } from 'react';
import ingredientStyles from './ingredStyles.module.css';
import { useRouteMatch } from 'react-router-dom';
import { TCard } from '../../utils/types/types';
import { RootState, useSelector } from '../../utils/types/store';

const Ingredient = () => {
    const [ingredientData, setIngredientData] = useState<TCard | null>(null);
    const { ingredients } = useSelector((store) => ({
        ingredients: store.component.ingredients,
    }));

    const { url } = useRouteMatch();
    useEffect((): void => {
        let idIngredient = -1;
        ingredients.map((cards: TCard, index: number): void => {
            if (cards['_id'] === url.split('/')[2]) {
                idIngredient = index;
            }
            setIngredientData(ingredients[idIngredient]);
        });
    }, [ingredients]);

    return (
        <div className={ingredientStyles.commonContainer}>
            {ingredientData && (
                <div className={ingredientStyles.ingredContainer}>
                    <h1 className="text text_type_main-large">
                        Детали ингредиента
                    </h1>
                    <img
                        src={ingredientData.image_large}
                        alt={ingredientData.name}
                    />

                    <h2 className="text text_type_main-medium text_color_active">
                        {ingredientData.name}
                    </h2>
                    <div className={ingredientStyles.descriptionDiv}>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-small text_color_inactive">
                                Калории,ккал
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.calories}*/}
                                {ingredientData.calories}
                            </p>
                        </div>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-small text_color_inactive">
                                Белки г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.proteins}*/}
                                {ingredientData.proteins}
                            </p>
                        </div>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-small text_color_inactive">
                                Жиры, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.fat}*/}
                                {ingredientData.fat}
                            </p>
                        </div>
                        <div className={ingredientStyles.subDescription}>
                            <p className="text text_type_main-default text_color_inactive">
                                Углеводы, г
                            </p>
                            <p className="text text_type_main-default text_color_inactive">
                                {/*{cardData.carbohydrates}*/}
                                {ingredientData.carbohydrates}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

//propTypes - нету
export default Ingredient;
