import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/DonationCards";
import { searchUsers } from "../../store/Actions/Users/Users";
import {
  getAllDonations
  
} from "../../store/Actions/Donation/Donation";

import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";
const donationOptions=[""]
const useStyles = makeStyles((theme) => ({}));
function Users() {
  const classes = useStyles();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const AllDonations = useSelector(
    (state) => state?.donation?.AllDonations
  );
console.log(AllDonations)
  let allusers = useSelector((state) => state?.users?.searchUsers);
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllDonations()).then((res) => setLoading(false));
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedStatus(e.target.value);
  };
  useEffect(() => {
    console.log({ AllDonations });
    if (AllDonations && AllDonations.length > 0) {
      if(selectedStatus==="all"){
        setFilteredRequests(
          [...AllDonations]
        );
      }else if(selectedStatus==="my"){
      setFilteredRequests(
        AllDonations.filter((item) => item.added_by == localStorage.getItem("userId"))
      );
      
    }else{
      
        setFilteredRequests(
          AllDonations.filter((item) => item.title === selectedStatus)
        );
        
      
    }}
  }, [AllDonations, selectedStatus]);
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
              <h4>Available Donations</h4>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select
                value={selectedStatus}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                 <MenuItem value="all">All</MenuItem>
                 <MenuItem value="money">Money</MenuItem>
                  <MenuItem value="book">Book</MenuItem>
                  <MenuItem value="clothes">Clothes</MenuItem>
                  <MenuItem value="my">My Donations</MenuItem>
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
            return <UserCard user={item} />;
          })
        ) : (
          <Grid
            container
            justify="center"
            style={{ marginTop: "5%", fontWeight: "bold" }}
          >
            No Record Found
          </Grid>
        )}
      </Grid>
    </div>
  );
}
export default Users;
