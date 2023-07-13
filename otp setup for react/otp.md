## create a OtpComponent.js file
```js
import React, { useEffect, useRef, useState } from "react";
import "./OtpComponent.css";

const OtpComponent = () => {
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [otp, setOtp] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //  after submitting the form the otp is set
  // then the useEffect will run and console log the otp
  // so you can use the otp variable to send it to the backend from here
  useEffect(() => {
    if (otp) {
      console.log(otp);
    }
  }, [otp]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = value;
    // console.log({updatedInputValues})
    setInputValues(updatedInputValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const joinedNumber = Number(inputValues.join(""));
    setOtp(joinedNumber);
    setInputValues(["", "", "", ""]);
    inputRefs.current[0].focus();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setOtp(null);
    setInputValues(["", "", "", ""]);
    inputRefs.current[0].focus();
  };
  return (
    <div className="otpContainer-main">
      <form className="otp-Form" onSubmit={handleSubmit}>
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We have sent a verification code to your mobile number
        </p>

        <div className="inputContainer">
          {inputValues?.map((value, index) => (
            <input
              key={index}
              placeholder=""
              className="otp-input"
              type="tel"
              maxLength="1"
              value={value}
              onChange={(event) => handleInputChange(index, event)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button className="verifyButton" type="submit">
          Verify
        </button>
        <div>
          <button className="exitBtn" onClick={handleCancel}>
            ×
          </button>
          <p className="resendNote">
            Didn't receive the code?
            <button className="resendBtn">Resend Code</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OtpComponent;
```

## create a OtpComponent.css file
```css
.otpContainer-main{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.otp-Form {
  width: 230px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  gap: 20px;
  position: relative;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.082);
  border-radius: 15px;
}

.mainHeading {
  font-size: 1.1em;
  color: rgb(15, 15, 15);
  font-weight: 700;
}

.otpSubheading {
  font-size: 0.7em;
  color: black;
  line-height: 17px;
  text-align: center;
}

.inputContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.otp-input {
  background-color: rgb(228, 228, 228);
  width: 30px;
  height: 30px;
  text-align: center;
  border: none;
  border-radius: 7px;
  caret-color: rgb(127, 129, 255);
  color: rgb(44, 44, 44);
  outline: none;
  font-weight: 600;
}

.otp-input:focus,
.otp-input:valid {
  background-color: rgba(127, 129, 255, 0.199);
  transition-duration: .3s;
}

.verifyButton {
  width: 100%;
  height: 30px;
  border: none;
  background-color: rgb(127, 129, 255);
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  transition-duration: .2s;
}

.verifyButton:hover {
  background-color: rgb(144, 145, 255);
  transition-duration: .2s;
}

.exitBtn {
  position: absolute;
  top: 5px;
  right: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.171);
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: none;
  color: black;
  font-size: 1.1em;
  cursor: pointer;
}

.resendNote {
  font-size: 0.7em;
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.resendBtn {
  background-color: transparent;
  border: none;
  color: rgb(127, 129, 255);
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 700;
}
```

## render the OtpComponent in App.js
```js
import OtpComponent from "./components/OtpComponent";

function App() {

  return <> <OtpComponent /></>;
}

export default App;
```