import React, { lazy ,Suspense, useEffect, useState } from 'react';
import dataHandler from "./dataHandler";

const Video = lazy(() => import('./Video'));

const CameraHandler = () => {
  const [isCameraSupported, setCameraSupported] = useState(false);
  const [isCameraEnabled, setCameraEnabled] = useState(false);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraSupported(true);
    }
  }, [])

  const onCamEnabled = () => {
    dataHandler.cameraPermissionGranted();
    setCameraEnabled(true);
  }

  return (
    <div>
      {/* check if device support camera and check if camera is enabled */}
      {isCameraSupported && isCameraEnabled ?
        <Suspense fallback={<div>Loading...</div>}>
          {/* return Video components */}
          <Video />
        </Suspense>
        :
        ""
      }
      {/* Camera is supported but it is not enabled */}
      {isCameraSupported && !isCameraEnabled ?
        <>
          <div className="cameraHandler__message">Enable your camera with the button below
            <br />
          </div>
          <button type="button" aria-label="Enable Camera" className="btn__round camera__enable" onClick={onCamEnabled}>
            camera
          </button>
        </>
        :
        ""
      }
      {/* Camera is not supported */}
      {!isCameraSupported ?
        <div className="cameraHandler__unsopported">
          <div>
            <p>Your device does not support camera access or something went wrong <span role="img" aria-label="thinking-face">🤔</span></p>
            <p>You can enter the barcode below</p>
            <input placeholder='entrer le code bar'/>
          </div>
        </div>
        :
        ""
      }
    </div>
  );
};

export default CameraHandler;