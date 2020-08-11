import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successPay) {
            props.history.push("/profile");
        } else {
            dispatch(detailsOrder(props.match.params.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successPay]);

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;
    console.log(order)

    return loading ? <div>Loading ...</div> : error ? <div className="error">{error}</div> :
    <div>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>
                        Vận chuyển
                    </h3>
                    <div>
                        {order.shipping.address}, {order.shipping.city},
                        {order.shipping.postalCode}, {order.shipping.country},
                    </div>
                    <div>
                        {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                    </div>
                </div>
                <div>
                    <h3>Thanh toán</h3>
                    <div>
                        Payment Method: {order.payment.paymentMethod}
                    </div>
                    <div>
                        {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>
                                Giỏ hàng
                            </h3>
                        <div>
                            Price
                        </div>
                        </li>
                        {
                            order.orderItems.length === 0 ?
                            <div>
                                Giỏ hàng đang trống
                            </div>
                            :
                            order.orderItems.map(item =>
                            <li  key={item._id}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Số lượng: {item.qty}
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li className="placeorder-actions-payment">
                        {loadingPay && <div>Finishing Payment...</div>}
                        {
                            (!order.isPaid && order.payment.paymentMethod==='paypal') &&
                            <PaypalButton
                                amount={order.totalPrice}
                                onSuccess={handleSuccessPayment} 
                            /> 
                        }
                    </li>
                    <li>
                        <h3>Tổng hợp hóa đơn</h3>
                    </li>
                    <li>
                        <div>Mặt hàng</div>
                        <div>${order.itemsPrice}</div>
                    </li>
                    <li>
                        <div>Cước vận chuyển</div>
                        <div>${order.shippingPrice}</div>
                    </li>
                    <li>
                        <div>Thuế</div>
                        <div>${order.taxPrice}</div>
                    </li>
                    <li>
                        <div>Tổng chi:</div>
                        <div>${order.totalPrice}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default OrderScreen; 