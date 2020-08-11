import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

const ProductsScreen = (props) =>{
    const [modalVisible, setModalVisible] = useState(false)
    const [id, setID] = useState('')
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const [uploading, setUploading] = useState(false);
    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    const productSave = useSelector(state=>state.productSave)
    const { loading: loadingSave, success: successSave, error: errorSave} = productSave

    const productDelete = useSelector(state=>state.productDelete)
    const { success: successDelete } = productDelete

    const dispatch = useDispatch(); 
    useEffect(() => {
        if(successSave){
            setModalVisible(false)
        }
        dispatch(listProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successSave,successDelete])

    const openModal = (product) => {
        setModalVisible(true)
        setID(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description)
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveProduct({_id: id,name,price,image,brand,category,countInStock,description}))
    }

    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id))
    }

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setUploading(true);
        axios
            .post('/api/uploads/s3', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setImage(response.data);
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    return <div className="content content-margined">
        <div className="product-header content-margined">
            <h3>Mặt hàng</h3>
            <button className="button primary" onClick={() => openModal({})}>Thêm mặt hàng</button>
        </div>
{modalVisible && 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Tạo mặt hàng mới</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div className="error">{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Tên
                    </label>
                    <input type="text" name="name" id="name" value={name || ""} onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="price">Mức giá</label>
                    <input type="text" id="price" name="price" value={price || ""} onChange={(e) => setPrice(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="image">Hình ảnh minh họa</label>
                    <input type="text" name="image" id="image" value={image || ""} onChange={(e) => setImage(e.target.value)}/>
                    <input type="file" onChange={uploadFileHandler} />
                    {uploading && <div>Uploading...</div>}
                </li>
                <li>
                    <label htmlFor="brand">Thương hiệu</label>
                    <input type="text" id="brand" name="brand" value={brand || ""} onChange={(e) => setBrand(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="category">Danh mục</label>
                    <input type="text" id="category" name="category" disabled value={category || ""} onChange={(e) => setCategory(e.target.value)} />
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option key="Camera" value="Camera">Camera</option>
                        <option key="Computer" value="Computer">Computer</option>
                        <option key="SmartPhone" value="SmartPhone">Smart Phone</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="countInStock">Số lượng còn lại</label>
                    <input type="text" id="countInStock" name="countInStock" value={countInStock || ""} onChange={(e) => setCountInStock(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="description">Miêu tả chi tiết</label>
                    <textarea name="description" id="description" rows="10" cols="10" value={description || ""} onChange={(e)=> setDescription(e.target.value)}></textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?'Cập nhật':'Tạo mới'}</button>
                </li>
                <li>
                    <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Quay trở lại</button>
                </li>
            </ul>
        </form>
    </div>
}
    <div className="product-list">
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Giá(USD)</th>
                    <th>Mục</th>
                    <th>Thương hiệu</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <button className="button" onClick={()=>openModal(product)} >Sửa</button>
                        {' '}
                        <button className="button" onClick={()=>deleteHandler(product)} >Xóa</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    </div>
}

export default ProductsScreen;