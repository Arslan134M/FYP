import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Tabs from "../Auth/Components/Tabs";
import Details from "../Auth/Components/Details";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
  }, []);

  const n = {
    name: "Abid",
    lives: "Lahore",
    profile_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1zX1dQUJj_B7tsOX6UcOy_F6DoyJSJ5SVw&usqp=CAU",
  };

  return (
    <div>
      <div>
        <div class="card-body">
          <div className="row ">
            <div className=" col-2">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
                src={n?.profile_image}
              ></img>
            </div>
            <div className="col-9 ">
              <div className="row d-flex justify-content-between">
                <div className="col">
                  <h2>{n?.name}</h2>
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    onClick={() => history.push("/profile-edit")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <p>{`Lives in ${n?.lives}`}</p>
              <p>From Dharanwala Punjab</p>
            </div>
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  
  
  );
}
export default Profile;
