import { GET_ALL_DONATIONS,UPDATE_DONATION_STATUS } from "../types";
// initial state
const initialState = {
  AllDonations: null,
};

// handle actions
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_DONATIONS: {
      return {
        ...state,
        AllDonations: payload,
      };
    }
    case UPDATE_DONATION_STATUS: {
      const {id,status}=payload;
      console.log(payload)
      let d=[...state.AllDonations]
      let index=d.findIndex(item=>item?._id===id)
      if(index>-1){
        d[index].status=status
      }
      return {
        ...state,
        AllDonations: [...d],
      };
    }

    default:
      return state;
  }
}
