import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const RegisterScreen = (props) =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validateError, setValidateError] = useState('');
    const [repassword, setRePassword] = useState('')
    const userRegister = useSelector(state=>state.userRegister)
    const {loading, userInfo, error} = userRegister

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/'; 
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])

    const submitHandler = (e) =>{
        e.preventDefault();
        if(checkPassword()){
            dispatch(register(name, email, password))
        } else {
            setValidateError('Mật khẩu của bạn nhập không trùng khớp')
        }
    }

    const checkPassword = () =>{
        let compareResult = (password === repassword) ? true : false
        return compareResult
    }
    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Khởi tạo tài khoản mới</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div className="error">{error}</div>}
                    {validateError && <div className="error">{validateError}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Tên
                    </label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
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
                    <label htmlFor="rePassword">Nhập lại mật khẩu</label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)} />
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Bạn đã có tài khoản?  <Link to={redirect === "/" ? "signin" : "signin?register="+redirect} className="button secondary text-center" >Đăng nhập</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;