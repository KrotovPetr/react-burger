import React from 'react';
import constructBurger from "../burgerIngridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyle from "./card.module.css"
import Data from "../../../utils/data";
import PropTypes from "prop-types"


class Card extends React.Component{
    constructor(props) {
        super(props);
    }
    state=Data();

    clickHandler = index => {
        this.setState(prevState => ({
            // Сохраняем текущие значения, над которыми не производим действий
            ...prevState,
            cards: [
                // Сохраняем текущий список новостей
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
                        (this.props.typeOfMeal === cards.type) ? (
                            <div className={cardStyle.card} key={index}  onClick={() => this.clickHandler(index)}>{
                                (cards.__v === 0) ? (<></>) :( <Counter count={cards.__v} size="default"/>)
                            }
                                <img src={cards.image}/>
                                <div className={constructBurger.price}>
                                    <CurrencyIcon type="primary"/>
                                    <p className="text text_type_main-default">{cards.price}</p>
                                </div>
                                <p className="text text_type_main-default">{cards.name}</p>
                            </div>
                        ):(
                            <>
                            </>
                        )

                    ))


                }
            </div>
        );
    }

}

Card.propTypes = {
       cards: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.number.isRequired,
           name:PropTypes.string.isRequired,
           type: PropTypes.string.isRequired,
           proteins: PropTypes.number.isRequired,
           fat: PropTypes.number.isRequired,
           carbohydrates: PropTypes.number.isRequired,
           calories: PropTypes.number.isRequired,
           price: PropTypes.number.isRequired,
           image:PropTypes.string.isRequired,
           image_mobile:PropTypes.string.isRequired,
           image_large:PropTypes.string.isRequired,
           __v:PropTypes.number.isRequired
       }))
}

export default Card;