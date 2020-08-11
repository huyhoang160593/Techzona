import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder, finishOrder } from '../actions/orderActions';

function OrdersScreen(props) {
    const orderList = useSelector(state => state.orderList);
    const { loading, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete);
    const {success: successDelete } = orderDelete;
    const orderFinish = useSelector(state => state.orderShipping)
    const {success: successFinish } = orderFinish;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successDelete,successFinish]);

    const deleteHandler = (order) => {
        dispatch(deleteOrder(order._id));
    }

    const finishedHandler = (order) =>{
        dispatch(finishOrder(order))
    }
    return loading ? <div>Loading...</div> :
        <div className="content content-margined">

            <div className="order-header">
                <h3>ĐƠN HÀNG</h3>
            </div>
            <div className="order-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NGÀY</th>
                            <th>TỔNG</th>
                            <th>TÀI KHOẢN</th>
                            <th>THANH TOÁN</th>
                            <th>THANH TOÁN VÀO LÚC</th>
                            <th>ĐÃ GIAO HÀNG</th>
                            <th>GIAO HÀNG VÀO LÚC</th>
                            <th>HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (<tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.user.name}</td>
                            <td>{order.isPaid?"ĐÃ THANH TOÁN":"CHƯA THANH TOÁN"}</td>
                            <td>{order.paidAt}</td>
                            <td>{order.isDelivered?"ĐÃ GIAO HÀNG":"CHƯA GIAO HÀNG"}</td>
                            <td>{order.deliveredAt}</td>
                            <td>
                                <Link to={"/order/" + order._id} className="button secondary" >Chi tiết</Link>
                                {' '}
                                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Xóa</button>
                                {' '}
                                {((order.payment.paymentMethod === "cod" || order.isPaid === true) && order.isDelivered===false) ?
                                    <button type="button" onClick={() => finishedHandler(order)} className="button secondary">Hoàn tất</button> :
                                    <button type="button" className="button secondary" disabled>Đã hoàn tất</button>
                                }
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
}
export default OrdersScreen; 