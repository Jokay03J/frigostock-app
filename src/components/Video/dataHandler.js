class DataHandler {
  static cameraPermissionGranted() {
    localStorage.setItem('CAM_PERMISSION', 'true');
  }

  static isCameraPermissionGranted() {
    return localStorage.getItem('CAM_PERMISSION') !== null;
  }

  static async askCameraPermission() {
    await navigator.permissions.query({ name: "camera" })
    .then((res) => {
      if(res.state === "granted") return true
      else if(res.state === "prompt") return "prompt"
      else return false
    })
  }
}

export default DataHandler;