import React from "react";
import { useHistory } from "react-router-dom";
const FeatureCard = ({ title, redirectUrl }) => {
  const history = useHistory();
 // const handleSwithPage = () => {
   // history.push(redirectUrl);
  //};
  const handleSwithPage = () => {
    history.push(`${redirectUrl}`);
  };
  return (
    <div className="container-login100-form-btn">
    <div className="wrap-login100-form-btn">
      <div className="login100-form-bgbtn"></div>
      <button
        type="button"
        class="login100-form-btn"
        onClick={handleSwithPage}
      >
        {title}
      </button>
    </div>
    </div>
    
  );
};

export default FeatureCard;
