import React, { useState } from 'react';
import superagent from 'superagent';
import { Toaster, toast } from "react-hot-toast"

const ProductInfo = ({ status, product }) => {
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState(null);
  const [productName, setProductName] = useState(product.generic_name_fr || product.product_name_fr);
  const [place, setPlace] = useState(null);

  return (
    <div>
      {/* Notification components */}
      <Toaster />
      {/* Form */}
      <div className='overflow-auto'>
        <div className='grid grid-cols-2 p-3 mt-4'>
          {/* Placement input */}
          <select className='ml-3 rounded-lg bg-green-500 border-2 border-black h-10' placeholder='veuillez sélectionner un type' onChange={(e) => setPlace(e.target.value)} defaultValue={place}>
            <option value={null} className="text-black">placement</option>
            <option value="frigo">frigo</option>
            <option value="congélateur">congélateur</option>
            <option value="étagère">étagère</option>
          </select>
          {/* Type input */}
          <select className='ml-3 rounded-lg bg-green-500 border-2 border-black h-10' placeholder='veuillez sélectionner un type' onChange={(e) => setType(e.target.value)} defaultValue={type}>
            <option value={null} className="text-black">type</option>
            <option value="frais">frais</option>
            <option value="sec">sec</option>
            <option value="laitier">laitier</option>
          </select>
        </div>
        {/* amount input container */}
        <div className='flex justify-center'>
          {/* amount input */}
        <input type={"number"} placeholder='quantiter' className='border-2 border-black rounded-lg mr-3 h-10 w-5/6 text-3xl text-center bg-green-500' value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </div>
        {/* product name container */}
        <div className='flex justify-center'>
          {/* product name input */}
          <input value={productName} className="h-10 bg-green-500 border-2 border-black rounded-lg mt-3 text-center text-2xl w-5/6" onChange={(e) => setProductName(e.target.value)}></input>
        </div>
      </div>
      {/* Submit button container */}
      <div className='flex justify-center'>
        {/* Submit button */}
        <button className='bg-green-500 border-2 border-black rounded-lg mt-3 h-12 text-3xl' onClick={submit({ productName: productName, amount: amount, type: type, place: place })}>ajouter le produit</button>
      </div>
    </div>
  );
};

export default ProductInfo;

function submit({ type, place, amount, productName }) {
  return () => {
    //check if any input is empty
    if (type === null) return toast.error("veuillez sélectionner un type");
    if (place === null) return toast.error("veuillez sélectionner un placement");
    const promise = new Promise((resolve, reject) => {
      //create product
      superagent
        .post('https://frigostock-api.herokuapp.com/fridge/products')
        .send({ type, category: place, amount, name: productName })
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