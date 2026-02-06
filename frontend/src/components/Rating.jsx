import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'

 
const Rating = ({ value = 0, onRatingChange, disabled = false, showValue = true }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(value);

  useEffect(() => { setRating(value); },
    [value]
  )

  const handleClick = (star) => {
    if (!disabled) {
      setRating(star);
      onRatingChange(star);
    }
  }
  return (
    <div className='flex items-center gap-2.5'>
      <div className='flex items-center gap-1.5'>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = hover ? star <= hover : star <= rating;
          return <Star size={18} className={`transition-all duration-200 ${filled ? 'fill-amber-400 text-amber-300' : 'text-gray-200'}`}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(0)}
            onClick={() => handleClick(star)}

          />
        })}
      </div>
      {showValue && <span className='text-xs font-semibold text-gray-500'>
        {value}/5</span>}
    </div>
  )
}

export default Rating