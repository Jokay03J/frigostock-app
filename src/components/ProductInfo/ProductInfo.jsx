import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { Toaster, toast } from "react-hot-toast"
import { useRecoilValue, useSetRecoilState } from "recoil";
import productAtom from '../../state/product';
import app from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProductInfo = () => {
  const product = useRecoilValue(productAtom)
  const setProduct = useSetRecoilState(productAtom);
  const [userState,setUserstate] = useState({})
  const navigate = useNavigate();

  //all function
  function OnSelectChange(value) {
    const newProduct = { ...product, place: value };
    setProduct(newProduct);
  }

  function OnNameChange(value) {
    const newProduct = { ...product, name: value };
    setProduct(newProduct);
  }

  function OnAmountChange(value) {
    const newProduct = { ...product, amount: value };
    setProduct(newProduct);
  }

  useEffect(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) setUserstate(user)
      else return navigate("/auth")
    })

    return () => {
      
    }
  }, [])
  

  function submit({ product }) {
    return () => {
      console.log(product);
      //check if any input is empty
      if (product.place === "" || product.name === "" || product.amount === 0) return toast.error("veuillez remplir tout les champs");
      const promise = new Promise((resolve, reject) => {
        //create product
        superagent
          .post(`https://frigostock-api.herokuapp.com/fridge/${userState.uid}/products`)
          .send({ category: product.place, amount: product.amount, name: product.name })
          .end((err, res) => {
            if (res.status === 201) {
              resolve()
              setTimeout(() => {
                document.location.href = "/";
              }, 1000);
            } else return reject()
          })
      });
      toast.promise(promise, {
        loading: "ajout du produit en cours...",
        error: "une erreur est survenue !",
        success: "produit ajouté avec succès !"
      })
    };
  }

  return (
    <div>
      {/* Notification components */}
      <Toaster />
      {/* Form */}
      <div className='overflow-auto'>
        <div className='flex justify-center my-2'>
          {/* Placement input */}
          <select className='ml-3 rounded-lg bg-green-500 border-2 border-black h-10 flex justify-center' placeholder='veuillez sélectionner un type' onChange={(e) => OnSelectChange(e.target.value)} defaultValue={product.place}>
            <option value={null} className="text-black">placement</option>
            <option value="frigo">frigo</option>
            <option value="congélateur">congélateur</option>
            <option value="étagère">étagère</option>
          </select>
        </div>
        {/* amount input container */}
        <div className='flex justify-center'>
          {/* amount input */}
          <input type={"number"} placeholder='quantiter' className='placeholder:text-black border-2 border-black rounded-lg mr-3 h-10 w-5/6 text-3xl text-center bg-green-500' value={product.amount} onChange={(e) => OnAmountChange(e.target.value)}></input>
        </div>
        {/* product name container */}
        <div className='flex justify-center'>
          {/* product name input */}
          <input value={product.name} className="h-10 bg-green-500 border-2 border-black rounded-lg mr-3 mt-3 text-center text-2xl w-5/6 placeholder:text-black" onChange={(e) => OnNameChange(e.target.value)} placeholder="entrer le nom du produit"></input>
        </div>
      </div>
      {/* Submit button container */}
      <div className='flex justify-center'>
        {/* Submit button */}
        <button className='bg-green-500 border-2 border-black rounded-lg mt-3 h-12 text-3xl' onClick={submit({ product: product })}>ajouter le produit</button>
      </div>
    </div>
  );
};

export default ProductInfo;