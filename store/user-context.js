import { createContext, useReducer } from "react";

export const UserContext = createContext({
  user: null,
  setUser: ({ username, token }) => {},
  clearUser: () => {},
});

function userReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
}

function UserContextProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, null);

  function setUser(user) {
    dispatch({ type: "SET", payload: user });
  }

  function clearUser() {
    dispatch({ type: "CLEAR" });
  }

  const value = {
    user: userState,
    setUser: setUser,
    clearUser: clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
