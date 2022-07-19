import React, { FC } from 'react';
import constStyles from './burger-constructor.module.css';

//импортироуемые компоненты
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

//модальное окно
import OrderDetails from '../orderDetails/order-details';
import { v4 as uuidv4 } from 'uuid';
//экшены
import {
    clearInfo,
    decreaseCounter,
    deleteElement,
    dragElement,
    getOrder,
    increaseCounter,
    replaceElement,
    setActive,
    setDragOver,
} from '../../Services/actions/componentAction/components';
import { profileRequest } from '../../Services/actions/requestAction/requestsActions';
import { useHistory } from 'react-router-dom';
import { TCard } from '../../utils/types/types';
import Modal from '../Modals/modal/modal';
import { useDispatch, useSelector } from '../../utils/types/store';

//доделать
const BurgerConstructor: FC = () => {
    const {
        buns,
        ingredients,
        components,
        orderInfo,
        totalPrice,
        draggedElement,
        underDraggedElement,
        cart,
        isReady,
        isOrderActive,
        profileRequestError,
        baseURL,
        isLogin,
    } = useSelector((store) => ({
        ingredients: store.component.ingredients,
        buns: store.component.order.buns,
        components: store.component.order.components,
        isActive: store.component.isActiv,
        isOrderActive: store.component.isOrderActiv,
        orderInfo: store.component.orderInfo,
        totalPrice: store.component.totalPrice,
        draggedElement: store.component.draggedElement,
        underDraggedElement: store.component.underDraggedElement,
        cart: store.component.cart,
        isReady: store.component.isReady,
        isOrderSuccess: store.orderData.isOrderSuccess,
        isOrderSend: store.orderData.isOrderSend,
        profileRequestError: store.requests.profileRequestError,
        baseURL: store.requests.baseURL,
        isLogin: store.requests.isLogin,
    }));

    const dispatch = useDispatch();
    const history = useHistory();

    const closeWindow = (): void => {
        orderInfo &&
            dispatch(clearInfo(ingredients)) &&
            dispatch(setActive(false));
    };
    // console.log(buns);
    return (
        <div className={constStyles.area}>
            <div className={constStyles.orderArea}>
                <div
                    className={constStyles.orderDropnDrag}
                    onDrop={(e: React.DragEvent<HTMLDivElement>): void => {
                        e.preventDefault();
                        if (cart === 'ingredients') {
                            dispatch(
                                increaseCounter(draggedElement!, ingredients)
                            );
                        }
                        dispatch(
                            replaceElement(
                                draggedElement!,
                                underDraggedElement!,
                                components,
                                buns,
                                cart,
                                isReady
                            )
                        );
                    }}
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                        e.preventDefault()
                    }>
                    <div className={constStyles.edgeElement}>
                        {buns && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={buns.name + ' (верх)'}
                                price={buns.price}
                                thumbnail={buns.image}
                            />
                        )}
                    </div>

                    {/*Блок формирования центральной части бургера*/}
                    <div className={constStyles.middle}>
                        {isOrderActive && (
                            <Modal
                                title=""
                                info={orderInfo}
                                onClose={(): void => closeWindow()}>
                                <OrderDetails />
                            </Modal>
                        )}
                        {components &&
                            components.map((cards: TCard, index: number) => (
                                <div
                                    className={constStyles.position}
                                    key={uuidv4()}
                                    draggable
                                    onDrag={(
                                        e: React.DragEvent<HTMLDivElement>
                                    ): void => {
                                        e.preventDefault();
                                        dispatch(
                                            dragElement(
                                                cards,
                                                'constructor',
                                                false
                                            )
                                        );
                                    }}
                                    onDrop={(
                                        e: React.DragEvent<HTMLDivElement>
                                    ): void => {
                                        e.preventDefault();
                                        replaceElement(
                                            draggedElement!,
                                            underDraggedElement!,
                                            components,
                                            buns,
                                            cart,
                                            false
                                        );
                                    }}
                                    onDragOver={(
                                        e: React.DragEvent<HTMLDivElement>
                                    ): void => {
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
                                                handleClose={(): void => {
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
                                text={buns.name + ' (низ)'}
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
                            onClick={(): void => {
                                if (isLogin) {
                                    dispatch(profileRequest(baseURL));
                                    if (profileRequestError) {
                                        dispatch(profileRequest(baseURL));
                                    }
                                    dispatch(
                                        getOrder(
                                            buns,
                                            components,
                                            baseURL + '/orders'
                                        )
                                    );
                                } else {
                                    history.replace({ pathname: '/login' });
                                }
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
