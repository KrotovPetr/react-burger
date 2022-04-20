import React from 'react';
import constructBurger from "../burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyle from "./ingredient-list.module.css"
import Data from "../../../utils/data";
import PropTypes from "prop-types"


class IngredientList extends React.Component{

    state=Data();

    clickHandler = index => {
        this.setState(prevState => ({
            ...prevState,
            cards: [
                ...prevState.cards,
                ++prevState.cards[index].__v

            ],



        }));
    };

    render(){
        return (
            <div className={cardStyle.cardArea}>
                {
                    this.state.cards.map((cards, index) => (
                        (this.props.typeOfMeal === cards.type) && <div key={cards._id}>
                            <div className={cardStyle.card} onClick={() => this.clickHandler(index)}>{
                                (cards.__v !== 0 && <Counter count={cards.__v} size="default"/>)

                            }
                                <img alt="Фото ингридиента" src={cards.image} className={cardStyle.cardImage}/>
                                <div className={constructBurger.price}>
                                    <p className="text text_type_digits-default">{cards.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                                <p className="text text_type_main-default">{cards.name}</p>
                            </div>


                        </div>

                    ))

                }
            </div>
        );
    }

}

IngredientList.propTypes = {
    typeofMeal: PropTypes.string
}

export default IngredientList;