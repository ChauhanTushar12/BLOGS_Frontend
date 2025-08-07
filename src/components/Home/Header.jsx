import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="my-4   flex items-center justify-center flex-col ">
      <div className="text-4xl leading-loose flex-col bg-zinc-200 w-full items-start">
        <h1 className="font-bold px-2">Entertainment Hub</h1>
      <h2 className='px-2'>Stream top movies, web series, anime, and cartoons — all your favorites in one powerful hub!</h2>
      </div>
    <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-1/2">
        <img src="./pic5.jpeg" alt="" className="rounded w-full h-[30vh] md:[40vh] lg:h-[50vh] object-cover"/>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold">Unlimited Fun Starts Here!</h1>
        <p className="mt-2 mb-2">Welcome to your ultimate Entertainment Hub — a world of movies, binge-worthy web series, thrilling anime, and fun-packed cartoons. Explore top content from every genre and language, all in one place. Whether you're into action, romance, or fantasy, we've got something exciting for every mood and moment!</p>
      </div>

    </div>

    </div>
  )
}

export default Header;
