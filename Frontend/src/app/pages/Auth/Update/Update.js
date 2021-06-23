import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from "../Auth/Components/Tabs";
import Details from "../Auth/Components/Details";
import ReactStars from "react-rating-stars-component";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "LOGIN_SUCCESS" });
  }, []);

  return (
    <div class="card" style={{ width: "40rem", marginLeft: "25rem" }}>
      <div class="card-body">
        <div className="row ">
          <div>
            <h4>Handymen details & reviews</h4>
            <p>180 jobs since January 2020</p>
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1zX1dQUJj_B7tsOX6UcOy_F6DoyJSJ5SVw&usqp=CAU"
            ></img>
          </div>
          <div className="col-6 ">
            <div className="row d-flex justify-content-between">
              <div className="col-5">
                <h2></h2>
              </div>
              <div></div>
            </div>
            <h1></h1>
            <p></p>
            <h1></h1>
            <div style={{ marginTop: "3rem", marginLeft: "-9rem" }}>
              <h2>Irzam Dawood</h2>
              <p>plumber Water/gas</p>

              <ReactStars count={5} size={24} activeColor="#ffd700" />
            </div>
          </div>
        </div>
        <h3>Bio</h3>
        <p>
          Set up, maintain, and clean laboratory instruments and equipment, such
          as microscopes, scales, pipets, and test tubes. ... Conduct biological
          tests and experiments. Document their work, including procedures,
          observations, and results. Analyze experimental data and interpret
          results
        </p>

        <p>
          --------------------------------------------------------------------------------------------------------------------------------
        </p>
        <div class="card">
          <div class="card-body">
            <div className="row ">
              <div>
                <h3>Faheem</h3>
                <p>Lahore, Pakistan</p>
                <h5>2 days ago</h5>
              </div>
              <div className="col-6 ">
                <div className="row d-flex justify-content-between">
                  <div className="col">
                    <ReactStars count={5} size={24} activeColor="#ffd700" />
                  </div>
                  <div></div>
                </div>
                <p></p>
                <p>
                  A combination technician in the information and technology
                  industry is involved in the installation of telephone cables,
                  cable TV, and high-speed internet.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div className="row ">
              <div>
                <h3>Arslan</h3>
                <p>Lahore, Pakistan</p>
                <h5>2 days ago</h5>
              </div>
              <div className="col-6 ">
                <div className="row d-flex justify-content-between">
                  <div className="col">
                    <ReactStars count={5} size={24} activeColor="#ffd700" />
                  </div>
                  <div></div>
                </div>
                <p></p>
                <p>
                  A combination technician in the information and technology
                  industry is involved in the installation of telephone cables,
                  cable TV, and high-speed internet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-row bd-highlight mb-3 d-flex justify-content-end">
          <button type="button" class="btn btn-primary">
            SEE MORE REVIEWS
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
