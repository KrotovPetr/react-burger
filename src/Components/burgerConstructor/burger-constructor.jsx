import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import constStyles from './burger-constructor.module.css';

//импортироуемые компоненты
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

//модальное окно
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/order-details';

//экшены
import {
    decreaseCounter,
    deleteElement,
    dragElement,
    getOrder,
    increaseCounter,
    replaceElement,
    setDragOver,
} from '../../Services/actions/components';

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    //данные из хранилища
    const {
        buns,
        ingredients,
        components,
        fetchURL,
        isActive,
        orderInfo,
        totalPrice,
        draggedElement,
        underDraggedElement,
        cart,
        isReady,
        isSuccess,
    } = useSelector(
        (store) => ({
            ingredients: store.component.ingredients,
            buns: store.component.order.buns,
            components: store.component.order.components,
            fetchURL: store.component.fetchURL,
            isActive: store.component.isActiv,
            orderInfo: store.component.orderInfo,
            totalPrice: store.component.totalPrice,
            draggedElement: store.component.draggedElement,
            underDraggedElement: store.component.underDraggedElement,
            cart: store.component.cart,
            isReady: store.component.isReady,
            isSuccess: store.component.isSuccess,
        }),
        shallowEqual
    );

    return (
        <div className={constStyles.area}>
            <div className={constStyles.orderArea}>
                <div
                    className={constStyles.order}
                    onDrop={(e) => {
                        e.preventDefault();
                        if (cart === 'ingredients') {
                            dispatch(
                                increaseCounter(draggedElement, ingredients)
                            );
                        }
                        dispatch(
                            replaceElement(
                                draggedElement,
                                underDraggedElement,
                                components,
                                buns,
                                cart,
                                isReady
                            )
                        );
                    }}
                    onDragOver={(e) => e.preventDefault()}>
                    <div className={constStyles.edgeElement}>
                        {buns && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={buns.name}
                                price={buns.price}
                                thumbnail={buns.image}
                            />
                        )}
                    </div>

                    {/*Блок формирования центральной части бургера*/}
                    <div className={constStyles.middle}>
                        {isActive && isSuccess && (
                            <Modal title="">
                                <OrderDetails />
                            </Modal>
                        )}
                        {components &&
                            components.map((cards, index) => (
                                <div
                                    className={constStyles.position}
                                    key={index}
                                    draggable
                                    onDrag={(e) => {
                                        e.preventDefault();
                                        dispatch(
                                            dragElement(
                                                cards,
                                                'constructor',
                                                false
                                            )
                                        );
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        replaceElement(
                                            draggedElement,
                                            underDraggedElement,
                                            components,
                                            buns,
                                            cart
                                        );
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        dispatch(setDragOver(cards));
                                    }}>
                                    <div className={constStyles.test}>
                                        <DragIcon type="primary" />
                                        <div
                                            className={
                                                constStyles.middleElement
                                            }>
                                            <ConstructorElement
                                                text={cards.name}
                                                price={cards.price}
                                                thumbnail={
                                                    cards['image_mobile']
                                                }
                                                handleClose={(e) => {
                                                    dispatch(
                                                        deleteElement(
                                                            index,
                                                            cards,
                                                            ingredients,
                                                            components.length
                                                        )
                                                    );
                                                    dispatch(
                                                        decreaseCounter(
                                                            cards,
                                                            ingredients
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/*Конец блока части формирования центральной части*/}
                    <div className={constStyles.edgeElement}>
                        {buns && (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={buns.name}
                                price={buns.price}
                                thumbnail={buns.image}
                            />
                        )}
                    </div>
                </div>

                {/*Блок цены*/}
                <div className={constStyles.price}>
                    <div className={constStyles.priceArea}>
                        <p className="text text_type_digits-medium">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={(e) => {
                                dispatch(getOrder(buns, components, fetchURL));
                            }}
                            disabled={buns === null}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                {/*Конец блока цены*/}
            </div>
        </div>
    );
};

//propTypes - нету

export default BurgerConstructor;
