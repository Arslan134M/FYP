import React from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { baseUrl } from "../utils/API";

const UserCard = ({ user }) => {
  console.log(user);
  const history = useHistory();
  const handleSwithPage = () => {
    // history.push(username);
  };

  return (
    
    <div class="d-flex flex-row bd-highlight mb-3 d-flex justify-content-center ">
      <div class="card">
        <div class="card-body">
          <div className="row ">
            <div className=" col-2">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1zX1dQUJj_B7tsOX6UcOy_F6DoyJSJ5SVw&usqp=CAU"
              ></img>
            </div>
            <div className=" col-10" className=" row-10"  style={{marginLeft:'5rem'}}>
            <div>
                {user?.username}
                </div>
                {user?.email}
            </div>
            {user?.service}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default UserCard;
