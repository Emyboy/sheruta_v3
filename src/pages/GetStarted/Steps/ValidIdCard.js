import { notification } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import Btn from "../../../components/Btn/Btn";
import { storage } from "../../../Firebase";
import { compressImage } from "../../../utils/Sheruta";
import Compressor from "compressorjs";
import { ProgressBar } from "react-bootstrap";

const ValidIdCard = (props) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [frontImageURL, setFrontImageURL] = useState(null);
  const [backImageURL, setBackImageURL] = useState(null);
  const [progress, setProgress] = useState(0);
  const { user, jwt } = props.auth.user;

  const upload = (image) => {
    if (image === 1) {
      document.getElementById("1").click();
    }
    if (image === 2) {
      document.getElementById("2").click();
    }
  };

  async function handleSelected(e, img) {
    console.log("IMG --", e.target.files[0]);
    const file = e.target.files[0];
    if (img === 1) {
      new Compressor(file, {
        quality: file.size > 138145 ? 0.1 : 0.2,
        success: (compressedResult) => {
          setFrontImage(compressedResult);
        },
      });
    } else {
      new Compressor(file, {
        quality: file.size > 138145 ? 0.1 : 0.2,
        success: (compressedResult) => {
          setBackImage(compressedResult);
        },
      });
    }
  }
  const handleImageUpload = () => {
    setUploading(true);

    [frontImage, backImage].forEach((file, i) => {
      var uploadTask = storage
        .child(`images/id_card/${user.id}/image_${i}`)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(
            "PROGRESS ---",
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          var _progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(_progress);
          // console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          setUploading(false);
          notification.error({ message: "Upload Error" });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            if (i === 1) {
              setFrontImageURL(downloadURL);
            } else {
              setBackImageURL(downloadURL);
              setUploading(false)
            }
          });
        }
      );
    });
  };
  return (
    <div>
      <div className="sec-heading center">
        <h2 className="animated animate__bounceIn">Upload valid ID Card</h2>
        <p>Take a picture of the font and back side of your ID card</p>
      </div>
      <div className="row justify-content-center mb-5 mt-5">
        <div className="col-md-4 col-11 mb-4">
          {frontImage ? (
            <div className="text-center">
              <img
                className="rounded"
                width="100%"
                height="150px"
                src={URL.createObjectURL(frontImage)}
              />
              <button
                className="btn text-danger btn-sm"
                disabled={uploading}
                onClick={() => setFrontImage(null)}
              >
                Remove <i className="ti-trash"></i>
              </button>
            </div>
          ) : (
            <>
              <button
                className="btn btn-lg text-theme w-100 rounded"
                style={{ height: "150px" }}
                id="plus"
                onClick={() => upload(1)}
              >
                Front Image +
              </button>
              <input
                id="1"
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => handleSelected(e, 1)}
              />
            </>
          )}
        </div>
        <div className="col-md-4 col-11 mb-4">
          {backImage ? (
            <div className="text-center">
              <img
                className="rounded"
                width="100%"
                height="150px"
                src={URL.createObjectURL(backImage)}
              />
              <button
                className="btn text-danger btn-sm"
                disabled={uploading}
                onClick={() => setBackImage(null)}
              >
                Remove <i className="ti-trash"></i>
              </button>
            </div>
          ) : (
            <>
              <button
                className="btn btn-lg text-theme w-100 rounded"
                style={{ height: "150px" }}
                id="plus"
                onClick={() => upload(2)}
              >
                Back Image +
              </button>
              <input
                id="2"
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => handleSelected(e, 2)}
              />
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="text-center">
        {progress > 0 ? <ProgressBar now={progress} variant="success" /> : null}
        <Btn
          className="mb-4 w-50"
          text="Finish"
          disabled={!frontImage || !backImage}
          loading={uploading}
          onClick={handleImageUpload}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ValidIdCard);
