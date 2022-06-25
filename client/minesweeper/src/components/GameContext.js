
import React from "react";
const GameContext = React.createContext({
  board : [],
  setBoard : () => {},
});

export default GameContext;