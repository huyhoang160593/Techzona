import React, { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';


const ProductScreen = (props) =>{
    const [qty,setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(props.match.params.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productSaveSuccess])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
            saveProductReview(props.match.params.id, {
                name: userInfo.name,
                rating: rating,
                comment: comment,
            })
        );
    };


    const handleAddToCart = () =>{
        props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
    }

    return (
    <div>
        <div className="back-to-result">
            <Link to="/">Quay trở lại kết quả</Link>
        </div>
        {loading ? <div>Xin vui lòng chờ trong giây lát...</div> :
        error ? <div className="error">{error}</div> : 
        (
        <>
            <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"/>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            {product.rating} Sao ({product.numReviews} Reviews)
                        </li>
                        <li>
                            Giá: <b>${product.price}</b>
                        </li>
                        <li>
                            Miêu tả thông số:
                            <div>
                                <pre>{product.description}</pre>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Giá: ${product.price}
                        </li>
                        <li>
                            Tình trạng: {product.countInStock > 0 ? product.countInStock + " sản phẩm còn lại" : "Liên Hệ"}
                        </li>
                        <li>
                            Số lượng:   <select value={qty} onChange={(e) =>{setQty(e.target.value)}}>
                                {[...Array(product.countInStock).keys()].map(x=>
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                    )}
                            </select>
                        </li>
                        <li>
                            {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Thêm vào giỏ hàng</button>}                           
                        </li>
                    </ul>
                </div>
            </div>
            <div className="content-margined">
                <h2>Reviews</h2>
                    {!product.reviews.length && <div>Không có bình luận nào</div>}
                <ul className="review" id="reviews">
                    {product.reviews.map((review) => (
                    <li key={review._id}>
                        <div>{review.name}</div>
                        <div>
                            <Rating value={review.rating}></Rating>
                        </div>
                        <div>{review.createdAt.substring(0, 10)}</div>
                        <div>{review.comment}</div>
                    </li>
                    ))}
                    <li>
                        <h3>Hãy cho chúng tôi biết nhận xét của bạn</h3>
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <ul className="form-container">
                                    <li>
                                        <label htmlFor="rating">Đánh giá</label>
                                        <select
                                            name="rating"
                                            id="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="1">1- Tệ</option>
                                            <option value="2">2- Cũng được</option>
                                            <option value="3">3- Tốt</option>
                                            <option value="4">4- Rất tốt</option>
                                            <option value="5">5- Tuyệt vời</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label htmlFor="comment">Bình luận</label>
                                        <textarea
                                            name="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </li>
                                    <li>
                                        <button type="submit" className="button primary">
                                            Gửi bình luận
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        ) 
                        : 
                        (
                            <div>
                                Hãy <Link to="/signin">đăng nhập</Link> để có thể viết được nhận xét.
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </>
        )}        
    </div>
)}

export default ProductScreen;