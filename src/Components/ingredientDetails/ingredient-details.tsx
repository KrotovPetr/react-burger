import React, { FC } from 'react';
import ingredientStyles from './ingredient-styles.module.css';
import { useSelector } from '../../utils/types/store';

const IngredientDetails: FC = () => {
    const { cardData } = useSelector((store: any) => ({
        cardData: store.component.cardData,
    }));
    console.log(cardData);
    return (
        <div className={ingredientStyles.main}>
            {/*блок с картинкой*/}
            <div className={ingredientStyles.imageDiv}>
                <img src={cardData.image} alt={cardData.name} />
            </div>
            {/*описание ингридиента*/}
            <h2 className="text text_type_main-medium">{cardData.name}</h2>
            <div className={ingredientStyles.descriptionDiv}>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-small text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {cardData.calories}
                    </p>
                </div>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-small text_color_inactive">
                        Белки г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {cardData.proteins}
                    </p>
                </div>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-small text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {cardData.fat}
                    </p>
                </div>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {cardData.carbohydrates}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;
