
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const images=[
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
];

    const ImageSlider = () => { 
     const[current, setCurrent]= useState(0);
    
        useEffect(() => {
         
        const interval=setInterval(() => {
            setCurrent((prev) => (prev + 1)%images.length);
        },5000);
        return()=>clearInterval(interval);

        }, []);
        const prevSlide=()=>{
            setCurrent((prev) => (prev ===0?images.length-1 : prev -1));
        };
        const nextSlide=()=>{
            setCurrent((prev) => (prev +1)%images.length);
        };




    return (<div className='relative w-full shadow-lg  overflow-hidden'>
        {/*Slides*/}
        <div className='flex transition-transform duration-700 ease-in-out' style={{transform:`translateX(-${current*100}%`}}>
            {images.map((image,index)=>(
                <img src={image} key={index} className='h-75 w-full md:112.5 object-cover shrink-0'/>
            ))}
        </div>
        {/*Prev  Buttons*/}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"><ChevronLeft/></button>
        
        {/*Next Buttons*/}
        <button onClick={nextSlide} className="absolute right-4 top-1/2  bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"> <ChevronRight/></button>
        {/*Indicator Buttons*/}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
            <button key={index} onClick={() => setCurrent(index)}className={`h-2 rounded-full transition-all ${current === index ? "bg-slate-500 w-6" : "bg-white w-2"}`}></button>  
           ))}
    </div>


  </div>

)
}

export default ImageSlider;