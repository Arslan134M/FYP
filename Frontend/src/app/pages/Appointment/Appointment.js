import TimePicker from "../Appointment/TimePicker";
import DatePicker from "../Appointment/DatePicker";
import React, { useState, useEffect, Component } from "react";
import Address from "../ServiceProvider/Address";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import { IconButton, InputAdornment } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addHireUser } from "../../store/Actions/Services/Services";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Appointment() {
  const [loader, setLoader] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  let query = useQuery();
  const handleClickAppoitment = async () => {
    let body = {
      hiring_date: selectedDate.toISOString(),
      create_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    let header = {
      user_id: id,
      service_id: query.get("service"),
      servicetaker_id: localStorage.getItem("userId"),
    };
    setLoader(true);
    let res = await dispatch(addHireUser({ header, body }));
    if (res?.status === 200) {
      dispatch({
        type: "SET_SUCCESS_NOTIFICATION",
        payload: { message: "Service added Successfully" },
      });
    } else {
      dispatch({
        type: "SET_ERROR_NOTIFICATION",
        payload: { message: "Something went wrong" },
      });
    }
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    setTimeout(() => {
      history.push("/app/profile-edit");
    }, 1500);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="my-2 text col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="well-block">
            <div className="well-title d-flex justify-content-center">
              <h2>Appointment Time</h2>
            </div>
            <div>
              <div className="row ">
                <div className="col-md-12  mt-2 mb-3 d-flex justify-content-center">
                  <div class="form-group">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        label="Selct your hiring time"
                        onError={console.log}
                        minDate={new Date()}
                        format="yyyy/MM/dd hh:mm a"
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>

                <div className="col-md-12 d-flex justify-content-center">
                  <div className="form-group">
                    <button
                      id="singlebutton"
                      name="singlebutton"
                      className="btn btn-dark"
                      onClick={handleClickAppoitment}
                      style={{
                        background: "#926dde ",
                        borderColor: "#926dde ",
                        width: "200px",
                        height: "40px",
                      }}
                    >
                      {loader ? (
                        <Grid container justify="center">
                          <CircularProgress
                            size={25}
                            style={{ fontSize: "20px" }}
                          />
                        </Grid>
                      ) : (
                        "Make An Appointment"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 text col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="container">
            <div className="my-2 d-flex justify-content-right text col-12">
              <div className="well-block">
                <div className="well-title">
                  <h2>Hiring note</h2>
                </div>

                <div className="feature feature-blurb-text">
                  <h4 className="feature-title"></h4>
                  <div className="feature-content">
                    <p>
                      We are only providing you the platform to meet your
                      service provider. You cann't claim to their services. You
                      can rate his work which will most important to our search
                    </p>
                  </div>
                </div>
                <div className="feature-block">
                  <div className="feature feature-blurb-text">
                    <h4 className="feature-title">24/7 Available</h4>
                    <div className="feature-content">
                      <p>
                        {/* With a system that works 24/7, business owners do not
                          have to devote valuable time to finalizing and
                          confirming online appointment requests. */}
                      </p>
                    </div>
                  </div>
                  <h4 className="feature-title">No Hiring fee</h4>
                  <div className="feature-content">
                    <p>
                      We are workig to control the work quality of our service
                      provider. please submist your review after getting
                      service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appointment;
