import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import superagent from 'superagent';
import closeIcon from "./removeIcon.svg";

const ListProduct = () => {
  //state
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);

  //componentDidMount & fetch products
  useEffect(() => {
    superagent
      .get("https://frigostock-api.herokuapp.com/fridge/products")
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          //success,set products and set loading to false
          setProducts(res.body);
          setLoading(false);
        }
      })
    return () => {
      // cleanup
    }
  }, [])


  return (
    <div>
      {/* Notification components */}
      <Toaster />
      {/* List products */}
      {isloading ? <div className="text-center text-3xl">chargement en cours...</div> :
        !products ? <div className='flex justify-center text-3xl'>aucun produit</div> :
        <div className='flex items-center flex-col p-2 max-h-screen'>
          {products.map(product => renderProducts(product))}
        </div>
      }
    </div>
  );
};

export default ListProduct;

function renderProducts(product) {
  return (
        <div key={product.id} className="w-11/12 h-14 m-1 rounded-lg bg-green-500 border border-black flex justify-between items-center">
          <div className='text-1xl'>{product.name}</div>
          <div className='text-3xl'>x{product.amount}</div>
          <img src={closeIcon} alt="remove product" height={50} width={50} className="float-right h-12 w-12" onClick={() => remove(product.id)} />
        </div>
  )
}

function remove(id) {
  //promise
  const promise = new Promise((resolve, reject) => {
    //fetch specific product by id
    superagent
      .delete(`https://frigostock-api.herokuapp.com/fridge/products/${id}`)
      .end((err, res) => {
        if (res.status === 204) {
          setTimeout(() => {
            resolve()
            document.location.href = "/";
          }, 500);
        } else return reject()
      })
  });
  toast.promise(promise, {
    loading: "suppression en cours...",
    error: <div>une erreur est survenue lors de la suppression du produit</div>,
    success: <div>produit supprimé avec succès !</div>
  })
}