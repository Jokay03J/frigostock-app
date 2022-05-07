import React from 'react';
import newImg from "./add_circle.svg";
import listIcon from "./list_icon.svg";
import accountIcon from "./account_icon.svg";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='border bg-green-500 w-10/12 h-20 rounded-lg border-black flex absolute mx-auto left-0 right-0 bottom-0 z-50'>
      <img src={listIcon} alt="all product" className="cursor-pointer h-20 mx-auto" onClick={() => navigate("/")} />
      <img src={newImg} alt="new product" className="cursor-pointer h-20 mx-auto" onClick={() => navigate("/newProduct")} />
      <img src={accountIcon} alt="account" className='cursor-pointer h-20 mx-auto' onClick={() => navigate("/auth")} />
    </div>
  );
};

export default NavBar;