import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import superagent from 'superagent';
import app from '../../firebase';
import closeIcon from "./removeIcon.svg";

const ListProduct = () => {
  //state
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [isUserConnected, setUserConnected] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  //componentDidMount & fetch products

  useEffect(() => {
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setUserConnected(true);
        superagent
          .get(`https://frigostock-api.herokuapp.com/fridge/${user.uid}/products`)
          .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              //success,set products and set loading to false
              setProducts(res.body);
              setLoading(false);
            }
          })
      }
      else setUserConnected(false);
    })
  }, [])

  return (
    <div>
      {/* Notification components */}
      <Toaster />
      {/* List products */}
      {
        isUserConnected ?
          isloading ? <div className="text-center text-3xl">chargement en cours...</div> :
            products.length === 0 ? <div className='flex justify-center text-3xl'>aucun produit</div> :
              <div className='flex items-center flex-col p-2 max-h-screen overflow-scroll'>
                {products.map(product => renderProducts(product, user))}
              </div>

          : <div className='flex justify-center'>
            <button className='bg-green-500 border-2 border-black h-16 w-5/6 mt-6 rounded-lg' onClick={() => navigate("/auth")}>se connecter ou s'enregistrer</button>
          </div>
      }
    </div>
  );
};

export default ListProduct;

function renderProducts(product, user) {
  return (
    <div key={product.id} className="w-11/12 h-14 m-1 rounded-lg bg-green-500 border border-black flex items-center">
      <div className='text-2xl h-14 w-8/12 flex items-center overflow-auto'>{product.name}</div>
      <div className='flex items-center ml-auto'>
        <div className='text-3xl'>x{product.amount}</div>
        <img src={closeIcon} alt="remove product" height={50} width={50} className="float-right h-12 w-12" onClick={() => remove(product.id, user)} />
      </div>
    </div>
  )
}

function remove(id, user) {
  //promise
  const promise = new Promise((resolve, reject) => {
    //fetch specific product by id
    superagent
      .delete(`https://frigostock-api.herokuapp.com/fridge/${user.uid}/products/${id}`)
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