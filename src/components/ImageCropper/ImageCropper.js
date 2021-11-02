import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./GetCroppedImage";

export default function ImageCropper({ image, aspect, onChange }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [output, setOutput] = useState(null);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    const data = await getCroppedImg(image, croppedAreaPixels);
    setOutput(data);
  }, []);

  useEffect(() => {
    onChange(output);
  }, [output]);

  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={aspect || 5 / 4}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
}
