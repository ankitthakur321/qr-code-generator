import React, { useState } from "react";
import QRCode from "qrcode";

const Main = () => {
  const [url, setUrl] = useState("");
  const [src, setSrc] = useState("");
  const urlField = document.getElementById("url");
  const handleChange = (e) => {
    setUrl(e.target.value);
    urlField.setCustomValidity("");
  };
  var opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 1,
    scale: 7,
    margin: 1,
  };
  const handleClick = (e) => {
    
    if (urlField.validity.typeMismatch) {
      urlField.setCustomValidity("I am expecting an e-mail address!");
      urlField.reportValidity();
    } else {
      e.preventDefault();
      urlField.setCustomValidity("");
      QRCode.toDataURL(url, opts).then((data) => {
        setSrc(data);
      });
    }
  };

  return (
    <div className="container">
      <div className="row mt-3 mx-auto">
        <div className="col-lg-4 pt-5 text-center">
          <img
            src="qr-code-generator/img/qr-code.svg"
            alt="qr-code"
            className="img-responsive"
            height="250"
          />
        </div>
        <div className="col-lg-4 pt-5">
          <h1 className="fw-bold">QR Code Generator</h1>
          <p className="fs-6 fw-semibold">
            QR Codes allow smartphone users to access your website simply and
            quickly. Enter your URL below to generate a QR Code and download the
            image.
          </p>
          <form action="">
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                id="url"
                name="url"
                value={url}
                onChange={handleChange}
                placeholder="Enter Website URL"
              />
              <label htmlFor="floatingInput">Website URL</label>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleClick}
              >
                Generate QR-Code
              </button>
            </div>
          </form>
        </div>
        <div
          className="col-lg-4 pt-5 text-center"
          style={src !== "" ? {} : { display: "none" }}
        >
          <img
            className="img-responsive ml-5"
            src={src}
            alt="generated-qr-code"
          />
          <br />
          <br />
          <a className="btn btn-primary" href={src} download>
            Download QR-Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
