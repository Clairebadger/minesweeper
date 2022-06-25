import logo from './logo.svg';
import './App.css';
import Game from './components/Game'
import Board from './components/Board';
import GameContext from './components/GameContext';
import {useState, useEffect} from 'react'

const size = 10

const createGameBoard = () => {
  let bombLocations = []
  let tempboard = []
  for (let x = 0; x < size; x++){
      bombLocations.push(Math.floor(Math.random() * (size*size)))
  }


  //make board with random bombs
  for (let i = 0; i < size; i++){
      tempboard.push([])
      for (let j = 0; j < size; j++){
          tempboard[i].push({isClicked: false, isBomb: bombLocations.includes(size*i + j) ? true: false})
      }
  }

  for (let x = 0; x < size; x++){
      for (let y = 0; y < size; y++){
          let count = 0
          if (x > 0){
              //can check square directly above
              if (tempboard[x-1][y].isBomb) count ++

              if (y > 0){ //can check 
                  if(tempboard[x-1][y-1].isBomb) count ++ 
              }
              if (y < size - 1){
                  if (tempboard[x-1][y+1].isBomb) count ++
              }
          }
          if (x < size-1 ){
              //can check underneath
              if (tempboard[x+1][y].isBomb) count ++ 
              if (y > 0){
                  if (tempboard[x+1][y-1].isBomb) count ++
              }
              if (y < size - 1){
                  if(tempboard[x+1][y+1].isBomb) count ++
              }
          }
          if(y > 0){
              if(tempboard[x][y-1].isBomb) count ++ 
          }
          if (y < size-1){
              if(tempboard[x][y+1].isBomb) count ++ 
          }
          tempboard[x][y].number = count
      }
  }
  console.log(tempboard)
  return tempboard
}
//move this into useefect

let tempboard= createGameBoard()

function App() {
  let [board, setBoard ] = useState(createGameBoard())


  return (
    <>
    <GameContext.Provider value = {{board, setBoard}}>
      <Board game = {tempboard}/>
    </GameContext.Provider>
    </>
  );
}

export default App;
