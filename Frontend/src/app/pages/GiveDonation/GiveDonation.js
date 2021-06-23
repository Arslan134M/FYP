import TimePicker from "../Appointment/TimePicker";
import DatePicker from "../Appointment/DatePicker";
import React, { useState, useEffect, Component } from "react";
import Address from "../ServiceProvider/Address";
function Appointment() {
  return (
    <div className="container">
      <div className="row">
        <div className="my-2 text col-6">
          <div className="well-block">
            <div className="well-title">
              <h2>Donation detalis</h2>
            </div>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div class="form-group">
                    <DatePicker />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="">
                    <TimePicker />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <Address />
                  </div>
                </div>
                <div class="row">
        <div class="col">


            <label>What would you like to donate:   </label>
            <br/>
        <select>
        <option value="money">Money</option>
         <option value="food">Food</option>
         <option selected value="medicians">Medicians</option>
         <option selected value="blood">Blood</option>
        <option selected value="clothes">Clothes</option>
         <option value="books">Books</option>
         <option selected value="others">Others</option>
        </select>
        </div>
    </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <button
                      id="singlebutton"
                      name="singlebutton"
                      className="btn btn-dark"
                    >
                      {" "}
                      Donation
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="container">
              <div className="my-2 d-flex justify-content-right text col-12">
                <div className="well-block">
                  <div className="well-title">
                    <h2>Why Appointment with Us</h2>
                  </div>

                  <div className="feature feature-blurb-text">
                    <h4 className="feature-title">
                      Experienced Staff Available
                    </h4>
                    <div className="feature-content">
                      <p>
                        Before you become a leader, success is all about growing
                        yourself. After you become a leader, success is about
                        growing others.
                      </p>
                    </div>
                  </div>
                  <div className="feature-block">
                    <div className="feature feature-blurb-text">
                      <h4 className="feature-title">24/7 Available</h4>
                      <div className="feature-content">
                        <p>
                          With a system that works 24/7, business owners do not
                          have to devote valuable time to finalizing and
                          confirming online appointment requests.
                        </p>
                      </div>
                    </div>
                    <h4 className="feature-title">Low Price & Fees</h4>
                    <div className="feature-content">
                      <p>
                        We creates cost control and cost reduction pressures
                        from the start, leading to greater efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 text col-6">google map here</div>
      </div>
    </div>
  );
}
export default Appointment;
