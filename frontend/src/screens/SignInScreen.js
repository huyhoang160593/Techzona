import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

const SigninScreen = (props) =>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state=>state.userSignin)
    const {loading, userInfo, error} = userSignin
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password))
    }
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Đăng nhập</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div className="error">{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Đăng nhập</button>
                </li>
                <li>
                    Bạn mới ghé thăm Techzona?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?register="+redirect} className="button secondary text-center" >Tạo tài khoản mới cho riêng bạn</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SigninScreen;