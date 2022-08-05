import React from 'react'
import Global from '../../Global';

export default React.memo(({ image, onFileChange,index, edit }) => {
  return (
    <label for={`upload-${index}`} className="m-2 w-100">
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
          className="story-box p-2 card"
          style={{
            height: "240px",
            backgroundImage: `url(${
              edit ? image :
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
