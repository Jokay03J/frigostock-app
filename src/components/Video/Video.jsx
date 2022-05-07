import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';
import InputCodeBar from '../InputCodeBar/InputCodeBar';
import ProductInfo from '../ProductInfo/ProductInfo';
import superagent from 'superagent';
import { useRecoilValue, useSetRecoilState } from "recoil";
import productAtom from '../../state/product';
import "./Video.css";
import toast, { Toaster } from 'react-hot-toast';

const Video = () => {
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const setProduct = useSetRecoilState(productAtom);
  const product = useRecoilValue(productAtom);
  const [codebar, setCodeBar] = useState("");

  const onProductFound = (res) => {
    console.log(res.product);
    if(res.status === 0) return
    //set product name
    if (!res.product.generic_name_fr || !res.product.product_name_fr) toast.error("produit introuvable");
    else {
      setProduct({ ...product, name: res.product.generic_name_fr? res.product.generic_name_fr : res.product.product_name_fr });
      setCodeBar(res.code);
    }
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
      <Toaster />
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
      <ProductInfo />
    </div>
  );
}

export default Video;