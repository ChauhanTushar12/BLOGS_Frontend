import React from "react";
import BlogCrad from "../BlogCrad/BlogCrad";

const AllBlogsComponent = ({ data }) => {
  return (
    <div className="">
      {Array.isArray(data) && data.map((items, i) => (
        <div key={i} className="flex m-4 flex-col lg:flex-row gap-2 lg:gap-12">
          <BlogCrad items={items} />
        </div>
      ))}
    </div>
  );
};

export default AllBlogsComponent;