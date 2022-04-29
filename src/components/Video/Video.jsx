import React, { useState, useEffect, useLayoutEffect } from 'react';
import Quagga from 'quagga';
import InputCodeBar from '../InputCodeBar/InputCodeBar';
import ProductInfo from '../ProductInfo/ProductInfo';
import superagent from 'superagent';
import "./Video.css";

const Video = () => {
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [product, setProduct] = useState(null);
  const [codebar, setCodeBar] = useState("");

  const onProductFound = (product) => {
    console.log(product.product);
    setProduct(product.product);
    setCodeBar(product.code);
  }

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    superagent.get(`https://fr.openfoodfacts.org/api/v0/product/${result.codeResult.code}.json`)
      // eslint-disable-next-line no-use-before-define
      .then(res => onInfoFetched(res.body));
  }

  const onInfoFetched = (res) => {
    const { status } = res;
    setAttempts(prevState => prevState + 1);

    if (status === 1) {
      onProductFound(res);
    } else {
      setTimeout(() => {
        Quagga.onDetected(onDetected);
      }, 1000);
    }
  }

  useEffect(() => {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 1,
        locate: true,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
        if (err) {
          setVideoError(true);
          return;
        }
        onInitSuccess();
      });
      Quagga.onDetected(onDetected);
      return () => Quagga.stop();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (attempts > 3) {
      onProductFound({ status: 0 });
    }
  }, [attempts]);

  return (

    <div>
      <div className="flex justify-center text-2xl">
        scanner un produit
      </div>
      <div className="">
        {videoError ?
          <div className="text-center">
            <div>
              <p>Votre dispositif ne supporte pas la camera ou quelque chose c'est mal passer</p>
              <p>Vous pouvez entrer le code-bar ci-dessous</p>
            </div>
          </div>
          :
          <div>
            <div className="video h-4/6 w-4/6 table m-auto" id="video" />
            {videoInit ? '' : <div>loading...</div>}
          </div>
        }
      </div>
      <InputCodeBar code={codebar} />
      {product ? <ProductInfo product={product} /> :
      <div className='text-center text-3xl mt-3'>
        <div> veuillez scanner un code bar ou entrer un code bar valide</div>
      </div>}
    </div>
  );
}

export default Video;