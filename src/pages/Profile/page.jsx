// import React from 'react';
// import SideBar from '../../components/Profile/SideBar';
// import { BsArrowRight } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";
// import { Outlet } from 'react-router-dom';
// import { useState } from 'react';

// const Profile = () => {

//   const [sideBarDiv, setsideBarDiv] = useState(false);
//   console.log(setsideBarDiv);
  

//   return (
//     <div className="relative mb-4 py-4 flex items-start justify-between gap-8">
//       <div className={`bg-white ${sideBarDiv ? "text-2xl h-screen fixed top-0 left-0 w-[60%]" : "hidden"}  lg:text-normal lg:h-auto lg:block  flex flex-col items-center justify-center p-4 lg:p-0 border-r lg:relative lg:w-1/6 z-[10] `}>
//       <div className="absolute top-8 right-8 lg:hidden">
//        <button className="text-3xl" onClick={()=>setsideBarDiv(!sideBarDiv)}>  <RxCross2 /> </button>
//         </div>
//          <SideBar/>
//       </div>
//     <div className="absulote top-0 left-0 lg:hidden z-[2]">
//       <button onClick={()=>setsideBarDiv(!sideBarDiv)}>
//         <BsArrowRight className="text-2xl" />{"  "}
//       </button>
//     </div>


//       <div className="w-full lg:w-5/6 max-h-auto min-h-screen">
//         <Outlet/>
//       </div>
//     </div>
//   )
// }

// export default Profile;

import React, { useState } from 'react';
import SideBar from '../../components/Profile/SideBar';
import { BsArrowRight } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { Outlet } from 'react-router-dom';

const Profile = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const toggleSidebar = () => setSideBarVisible((prev) => !prev);

  return (
    <div className="relative mb-4 py-4 flex items-start justify-between gap-8">
      <div
        className={`bg-white z-[10] border-r flex flex-col items-center justify-center p-4 lg:p-0
        ${sideBarVisible ? 'fixed top-0 left-0 h-screen w-[60%] text-2xl' : 'hidden'} 
        lg:relative lg:block lg:w-1/6 lg:h-auto lg:text-base`}
      >
        <div className="absolute top-8 right-8 lg:hidden">
          <button
            className="text-3xl"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <RxCross2 />
          </button>
        </div>

        <SideBar />
      </div>

      {!sideBarVisible && (
        <div className="absolute top-4 left-4 lg:hidden z-[2]">
          <button
            onClick={toggleSidebar}
            aria-label="Open Sidebar"
          >
            <BsArrowRight className="text-2xl" />
          </button>
        </div>
      )}

      <div className="w-full lg:w-5/6 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;