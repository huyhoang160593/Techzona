import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update({ userId: userInfo._id, email, name, password }))
    }

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const myOrderList = useSelector(state => state.myOrderList);
    console.log(myOrderList)
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setPassword(userInfo.password);
        }
        dispatch(listMyOrders());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitHandler} >
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div className="error">{error}</div>}
                            {success && <div>Profile Saved Successfully.</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Tên
                            </label>
                            <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="password">Mật khẩu</label>
                            <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                        </li>
                        <li>
                            <button type="submit" className="button primary">Cập nhật</button>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="button secondary full-width">Đăng xuất</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div className="profile-orders content-margined">
        {
            loadingOrders ? <div>Loading...</div> :
            errorOrders ? <div>{errorOrders} </div> :
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NGÀY</th>
                        <th>TỔNG</th>
                        <th>THANH TOÁN</th>
                        <th>GIAO HÀNG</th>
                        <th>HÀNH ĐỘNG</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                        <td>{order.isDelivered ? "Đã vẫn chuyển" : "Chưa vận chuyển"}</td>
                        <td>
                            <Link to={"/order/" + order._id}>CHI TIẾT</Link>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        }
        </div>
    </div>
}
export default ProfileScreen; 