import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
import { login } from "../../store/Actions/Auth/Auth";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Login() {
  const [showPassword, setShowPassword] = useState("");
  const dispatch = useDispatch();
  var emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  const history = useHistory();

  const handleSwitchPage = () => {
    history.push("/signup");
  };
  const handleSwitch = async (email, password) => {
    if (email && password) {
      let res = await dispatch(
        login({ user: { email: email, password: password } })
      );
      if (res?.status === 200) {
        // history.push("/search");

        history.push("/app/features");
      }
    }
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    handleSwitch(data?.email, data?.password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSwitchLog = () => {
    history.push("/search");
  };

  // const handleUpdateState = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handleSetPassword = (e) => {
  //   setPassword(e.target.value);
  // };

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login100-form validate-form"
            >
              <span className="login100-form-title p-b-48">
                <img src={Logo} style={{ width: "120px", height: "120px" }} />
              </span>

              <TextField
                label="Email"
                name="email"
                type="text"
                fullWidth
                inputRef={register({ required: true, pattern: emailRegEx })}
                error={errors.email}
                helperText={errors.email && "Enter Valid Email"}
              />

              <TextField
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                error={errors.password}
                helperText={errors.password && "Enter Password"}
                label={"Password"}
                style={{ marginTop: "10px" }}
                // onChange={handleSetPassword}
                inputRef={register({ required: true })}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button
                    onClick={() => handleSwitch()}
                    type="submit"
                    className="login100-form-btn"
                  >
                    Login
                  </button>
                </div>
              </div>

              <div
                className="text-center p-t-115"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                <p className="txt1">Don’t have an account?</p>

                <span
                  className="txt2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSwitchPage()}
                >
                  Sign Up
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
