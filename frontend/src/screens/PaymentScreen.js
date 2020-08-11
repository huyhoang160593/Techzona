import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = (props) =>{

    const [paymentMethod, setPaymentMethod] = useState('');


    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePayment({paymentMethod}))
        props.history.push('placeorder')
    }
    return (
    <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Phương thức thanh toán</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="paymentMethod">
                                Paypal
                            </label>
                            <input type="radio" name="paymentMethod" id="paymentMethod" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="paymentMethod">
                                Thanh toán khi nhận hàng
                            </label>
                        </div>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Tiếp tục</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    )  
}

export default PaymentScreen;