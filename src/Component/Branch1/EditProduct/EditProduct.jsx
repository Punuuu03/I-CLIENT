// EditProduct.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [productId, setProductId] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [existingImage, setExistingImage] = useState('');
    const [existingImagePublicId, setExistingImagePublicId] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://i-server-eight.vercel.app/api/products/${id}`);
                if (response.data.Status) {
                    const product = response.data.Result;
                    setName(product.name);
                    setPrice(product.price);
                    setStock(product.stock);
                    setProductId(product.product_id);
                    setExistingImage(product.image); // Set existing image URL
                    setExistingImagePublicId(product.imagePublicId); // Set existing image public ID
                    setPreview(product.image); // Preview the existing image
                } else {
                    setMessage(`Error: ${response.data.Error}`);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setMessage('Error fetching product. Please try again.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show a preview of the newly selected image
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('product_id', productId);
        formData.append('old_image_public_id', existingImagePublicId); // Send the existing image public ID
        if (image) {
            formData.append('image', image); // Append the new image if selected
        }

        try {
            const response = await axios.put(`https://i-server-eight.vercel.app/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.Status) {
                setMessage('Product updated successfully!');
                navigate('/Component/Branch1/ProductList/ProductList'); // Navigate to the ProductList component
            } else {
                setMessage(`Error: ${response.data.Error}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product. Please try again.');
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger the file input dialog when the image is clicked
    };

    return (
        <div className="product-form-overlay">
            <div id="product-form-container">
                <div className="product-form-content">
                    <div className="image-preview-container">
                        {preview ? (
                            <div className="image-preview-wrapper" onClick={handleImageClick}>
                                <img src={preview} alt="Preview" className="image-preview" />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }} // Hide the file input
                                />
                            </div>
                        ) : (
                            <div className="file-upload-group">
                                <input
                                    type="file"
                                    id="image-upload"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    required
                                    style={{ display: 'none' }} // Hide the file input
                                />
                                <button type="button" onClick={handleImageClick} className="upload-image-button">
                                    Select Image
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="form-inputs">
                        <h1 id="product-form-heading">Edit Product</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="product-name">Product Name</label>
                                    <input
                                        type="text"
                                        id="product-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="product-price">Price</label>
                                    <input
                                        type="number"
                                        id="product-price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <label htmlFor="product-stock">Stock</label>
                                    <input
                                        type="number"
                                        id="product-stock"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="product-id">Product ID</label>
                                    <input
                                        type="text"
                                        id="product-id"
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" id="product-form-submit-button">
                                Update Product
                            </button>
                        </form>
                    </div>
                </div>
                {message && (
                    <p
                        id="product-form-message"
                        className={
                            message.includes("Error") ? "error-message" : "success-message"
                        }
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default EditProduct;
