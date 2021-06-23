import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/UsersCardRequests";
import { searchUsers } from "../../store/Actions/Users/Users";
import {
  getAllSentRequests,
  getAllRecieveRequests,
} from "../../store/Actions/Requests/Requests";

import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));
function Users() {
  const classes = useStyles();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const recieveRequests = useSelector(
    (state) => state.requests?.recieveRequests
  );
  const sentRequests = useSelector((state) => state.requests?.sentRequests);

  let allusers = useSelector((state) => state?.users?.searchUsers);
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [selectedSentStatus, setSelectedSentStatus] = useState("pending");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filteredSentRequests, setFilteredSentRequests] = useState([]);
  console.log({ sentRequests });

  useEffect(() => {
    setLoading(true);
    dispatch(getAllRecieveRequests()).then((res) =>
      dispatch(getAllSentRequests()).then((res) => setLoading(false))
    );
  }, []);
  const handleChange = (e, key) => {
    if (key === "sent") {
      setSelectedSentStatus(e.target.value);
    } else setSelectedStatus(e.target.value);
  };
  useEffect(() => {
    console.log({ recieveRequests });
    if (recieveRequests && recieveRequests.length > 0) {
      setFilteredRequests(
        recieveRequests.filter((item) => item.status === selectedStatus)
      );
    }
  }, [recieveRequests, selectedStatus]);
  useEffect(() => {
    console.log({ sentRequests });
    if (sentRequests && sentRequests.length > 0) {
      setFilteredSentRequests(
        sentRequests.filter((item) => item.status === selectedSentStatus)
      );
    }
  }, [sentRequests, selectedSentStatus]);
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Grid
        container
        spacing={3}
        style={{ margin: "0px", padding: "15px", maxWidth: "100vw" }}
      >
        <Grid item xs={12}>
          <Grid container style={{ justifyContent: "center" }}>
            <Grid item xs={12} md={6}>
              <h4>Received Services Requests</h4>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select
                value={selectedStatus}
                onChange={(e) => handleChange(e, "received")}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <Grid container justify="center">
            <CircularProgress size={40} />
          </Grid>
        ) : filteredRequests && filteredRequests.length > 0 ? (
          filteredRequests.map((item) => {
            return <UserCard user={item} type="received" />;
          })
        ) : (
          <Grid
            container
            justify="center"
            style={{ marginTop: "5%", fontWeight: "bold" }}
          >
            No {selectedStatus} request found
          </Grid>
        )}

        <Grid item xs={12} style={{ marginTop: "2rem" }}>
          <Grid container style={{ justifyContent: "center" }}>
            <Grid item xs={12} md={6}>
              <h4>Sent Services Requests</h4>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select
                value={selectedSentStatus}
                onChange={(e) => handleChange(e, "sent")}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        {loading ? (
          <Grid container justify="center">
            <CircularProgress size={40} />
          </Grid>
        ) : filteredSentRequests && filteredSentRequests.length > 0 ? (
          filteredSentRequests.map((item) => {
            return <UserCard user={item} type="sent" />;
          })
        ) : (
          <Grid
            container
            justify="center"
            style={{ marginTop: "5%", fontWeight: "bold" }}
          >
            No {selectedSentStatus} request found
          </Grid>
        )}
      </Grid>
    </div>
  );
}
export default Users;
