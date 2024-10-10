import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to visit</h2>

        <div>
            {trip?.tripData?.itinerary.map((place, index) => (
                <div key={index} className='mt-5'>
                    <h2 className='font-medium text-lg'>Day {place.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {place.plan.map((item, index) => (
                        <div key={index}>
                            <h2 className='font-medium text-sm text-orange-600'>{item.time}</h2>
                            <PlaceCardItem item={item}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit