import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

const HomeScreen = (props) =>{
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const category = props.match.params.id ? props.match.params.id : '';

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(category));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }
    const sortHandler = (e) => {
        setSortOrder(e.target.value);
        dispatch(listProducts(category, searchKeyword, e.target.value))
    }

    return (
    <>
        {category &&
            <h2>{category}</h2>}

            <ul className="filter">
                <li>
                    <form onSubmit={submitHandler}>
                        <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                        <button type="submit">Tìm kiếm</button>
                    </form>
                </li>
                <li>
                    Sắp xếp{' '}
                    <select name="sortOrder" onChange={sortHandler}>
                        <option value="newest">Mới nhất</option>
                        <option value="lowest">Giá thấp nhất</option>
                        <option value="highest">Giá cao nhất</option>
                    </select>
                </li>
            </ul>
                {loading ? <div>Loading...</div> :
                    error ? <div className="error">{error}</div> :
                        <ul className="products">
                        {
                        products.map(product =>
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={'/product/' + product._id}>
                                        <img className="product-image" src={product.image} alt="product" />
                                    </Link>
                                    <div className="product-name">
                                        <Link to={'/product/' + product._id}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-price">${product.price}</div>
                                    <div className="product-rating">
                                        <Rating
                                            value={product.rating}
                                            text={product.numReviews + ' reviews'}
                                        />
                                    </div>
                                </div>
                            </li>)
                        }
            </ul>
        }
    </>)
}

export default HomeScreen