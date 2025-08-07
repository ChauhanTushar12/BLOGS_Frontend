import React from 'react';
import { Link } from 'react-router-dom';

const BlogCrad = ({ items }) => {
  const isProfilePage = window.location.href.includes('/profile');

  return (
    <>
      <div className="w-full lg:w-4/6">
        <img
          src={items.image?.url}
          alt={items.title || 'Blog Image'}
          className="rounded object-contain w-full size-[auto]"
        />
      </div>
      <div className="w-full lg:w-4/6">
        <h1 className={`text-2xl font-semibold ${!isProfilePage ? 'mt-4' : ''}`}>
          {items.title}
        </h1>

        {!isProfilePage && (
          <p className="mt-2">
            {items.description?.slice(0, 200)}{items.description?.length > 200 ? '...' : ''}
          </p>
        )}

        <Link
          to={`/description/${items._id}`}
          className="inline-block mt-2 bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600 transition-all duration-300"
        >
          Read Blog
        </Link>
      </div>
    </>
  );
};

export default BlogCrad;
