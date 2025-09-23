import { createContext, useReducer } from "react";

export const ComplaintsContext = createContext({
  complaints: [],
  setComplaints: (complaints) => {},
  addComplaint: ({
    imageBase64,
    imageUri,
    title,
    description,
    latitude,
    longitude,
  }) => {},
});

function complaintReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();
    case "ADD":
      return [action.payload, ...state];
    default:
      return state;
  }
}

function ComplaintsContextProvider({ children }) {
  const [complaintsState, dispatch] = useReducer(complaintReducer, []);

  function setComplaints(complaints) {
    dispatch({ type: "SET", payload: complaints });
  }

  function addComplaint(complaint) {
    dispatch({ type: "ADD", payload: complaint });
  }

  const value = {
    complaints: complaintsState,
    setComplaints: setComplaints,
    addComplaint: addComplaint,
  };

  return (
    <ComplaintsContext.Provider value={value}>
      {children}
    </ComplaintsContext.Provider>
  );
}

export default ComplaintsContextProvider;
