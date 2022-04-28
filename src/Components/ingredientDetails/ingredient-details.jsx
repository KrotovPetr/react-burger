import React, { useContext, useEffect } from 'react';
import ingredientStyles from './ingredient-styles.module.css';
import IngredientList from '../burgerIngridients/ingredientList/ingredient-list';
import PropTypes from 'prop-types';
import { AppContext } from '../../Services/appContext';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
const IngredientDetails = (props) => {
    const app = useContext(AppContext);
    const createOrder = () => {
        app.setOrder(props.data);
    };
    return (
        <div className={ingredientStyles.main}>
            {/*блок с картинкой*/}
            <div className={ingredientStyles.imageDiv}>
                <img src={props.data.image} alt={props.data.name} />
            </div>

            {/*описание ингридиента*/}
            <h2 className="text text_type_main-medium">{props.data.name}</h2>
            <div className={ingredientStyles.descriptionDiv}>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-small text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {props.data.calories}
                    </p>
                </div>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-small text_color_inactive">
                        Белки г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {props.data.proteins}
                    </p>
                </div>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-small text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {props.data.fat}
                    </p>
                </div>
                <div className={ingredientStyles.subDescription}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {props.data.carbohydrates}
                    </p>
                </div>
            </div>
            <Button onClick={createOrder} type="primary" size="small">
                Добавить
            </Button>
        </div>
    );
};

IngredientDetails.propTypes = {
    data: PropTypes.object.isRequired,
};
export default IngredientDetails;
