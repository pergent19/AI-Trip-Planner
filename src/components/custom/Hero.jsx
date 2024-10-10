import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-10 lg:mx-56 gap-9 hero-container'>
        <h1 className='font-extrabold text-[25px] md:text-[50px] text-center mt-16'>
            <span className='text-[#f56551]'>Let AI Guide You to Your Next Adventure: </span> 
            Tailored Itineraries, Right at Your Fingertips
        </h1>
        <p className='text-md md:text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom iteneraries tailored to your interest and budget.</p>

        <Link to={'/create-trip'}>
            <Button>Get Started, It's Free</Button>
        </Link>

        <img src="/macbook_view.png" className='-mt-9' alt="landing" />
    </div>
  )
}

export default Hero