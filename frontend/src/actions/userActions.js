import { 
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL ,
    USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";
import Cookie from 'js-cookie'
import Axios from 'axios';

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
        const { data } = await Axios.put("/api/users/" + userId,
            { name, email, password }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }});
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}


const signin = (email, password) => async (dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try{
        const {data} = await Axios.post("/api/users/signin", {email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch(error) {
        error.msg = " Tài khoản và mật khẩu chưa đúng, mời nhập lại "
        dispatch({type: USER_SIGNIN_FAIL, payload: error.msg});
    }
}

const register = (name,email, password) => async (dispatch) =>{
    dispatch({type: USER_REGISTER_REQUEST, payload: { name, email, password}});
    try{
        const {data} = await Axios.post("/api/users/register", { name, email, password})
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch(error) {
        error["msg"] = "Email của bạn đã được đăng kí"
        dispatch({type: USER_REGISTER_FAIL, payload: error.msg});
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}

export { signin, register, logout, update }; 