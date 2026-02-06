import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    const [rating,setRating]=useState(product.ratings ||0)
     
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-slate-100">
            <Link to={`/product/${product._id}`} className='group block'>
                <div className="h-56 overflow-hidden">
                    <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="max-h-full w-full object-contain group-hover:scale-105 transition"
                    />
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                    <p className='text-sm text-gray-500 line-clamp-2'>{product.description}</p>
                </div>
            </Link>
            <div className="px-4 pb-4 space-y-2">
                <div className='flex items-center gap-2'>
                    <Rating value={rating} onRatingChange={(r) => setRating(r)} />
                    <span className='text-xs text-gray-500 font-semibold'>({product.numOfReviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">₹{product.price}</span>
                    <button className='bg-blue-400 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product
