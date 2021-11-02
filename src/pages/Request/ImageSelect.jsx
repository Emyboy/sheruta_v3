import React from 'react'
import Global from '../../Global';

export default React.memo(({ image, onFileChange,index }) => {
  return (
    <label for={`upload-${index}`} style={{ width: "140px" }} className="m-2">
      <span
        className="glyphicon glyphicon-folder-open"
        aria-hidden="true"
      ></span>
      <input
        type="file"
        id={`upload-${index}`}
        style={{ display: "none" }}
        hidden
        accept="image/*"
        onChange={onFileChange}
      />
      <div className="w-100">
        <div
          className="story-box"
          style={{
            height: "240px",
            backgroundImage: `url(${
              (image && URL.createObjectURL(image)) || Global.PLACEHOLDER_IMG
            })`,
            backgroundPosition: "center",
            borderRadius: "10px",
            backgroundSize: "270px 100%",
          }}
        >
          <div className="story-thumb">
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
    </label>
  );
});
