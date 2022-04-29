import React from 'react';
import newImg from "./add_circle.svg";
import listIcon from "./list_icon.svg";
import accountIcon from "./account_icon.svg";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center mt-2 inset-x-0 bottom-0'>
      <div className='grid grid-cols-3 border bg-green-500 w-11/12 h-20 rounded-lg mb-2 border-black'>
        <img src={listIcon} alt="all product" className="cursor-pointer h-20 mx-auto" onClick={() => navigate("/")}/>
        <img src={newImg} alt="new product" className="cursor-pointer h-20 mx-auto" onClick={() => navigate("/newProduct")}/>
        <img src={accountIcon} alt="account" className='cursor-pointer h-20 mx-auto' onClick={() => navigate("/auth")}/>
      </div>
    </div>
  );
};

export default NavBar;