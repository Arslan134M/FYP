import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
import { setAge  } from "../../store/Actions/Home/Home"
function Signup() {
  const [user,setUser]=useState("")
  const [uName,setUName]=useState("")
  const dispatch = useDispatch();
  const name=useSelector(state=>state?.home?.age)

  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
    dispatch(setAge({age:27}));
    
  }, []);
  useEffect(() => {
    setUser({userName:name});
    setUName(name)
  }, [name]);
  console.log("auth=======>",name)
  const handleSwitchPage = () => {
    history.push("/signup");
  };
  const handleUpdateState = (e) => {
    dispatch(setAge({age:e.target.value}));

  };
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form validate-form">
              <span className="login100-form-title p-b-48">
                <img src={Logo} style={{ width: "120px", height: "120px" }} />
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input className="input100" type="text" name="email" onChange={(e)=>handleUpdateState(e)}/>
                <span
                  className="focus-input100"
                  data-placeholder="Email"
                ></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span className="btn-show-pass"></span>
                <input className="input100" type="password" name="pass" />
                <span
                  className="focus-input100"
                  data-placeholder="Password"
                ></span>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>

              <div
                className="text-center p-t-115"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                <span className="txt1">Don’t have an account?</span>

                <p className="txt2" onClick={() => handleSwitchPage()}>
                  Sign Up
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
