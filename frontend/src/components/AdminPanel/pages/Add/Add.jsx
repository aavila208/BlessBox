import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../../../assets/assets';
import api from '../../../../api'; // centralized axios instance
import { toast } from 'react-toastify';

const Add = ({ onAdded }) => {
  
  const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Canned Goods"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const token = localStorage.getItem('token');

        try {
          console.log("📤 Submitting form with token:", token);
          console.log("🖼️ Image file selected:", image);

            const response = await api.post(
                '/api/food/add',
                formData,
                {
                    headers: {
                        token: token
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: data.category
                })
                setImage(false);

                if (typeof onAdded === 'function') {
                    onAdded();
                  }

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('Network error');
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} value={data.category}>
                            <option value="Canned Goods">Canned Goods</option>
                            <option value="Grains">Grains</option>
                            <option value="Produce">Produce</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Sauces">Sauces</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Protein">Protein</option>
                        </select>

                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
