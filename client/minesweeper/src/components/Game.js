import {useState, useEffect} from 'react'
import Board from "./Board"
import GameContext from './GameContext'

const Game = ({size}) => {
    //placeholder
    size = 10
    let [board, setBoard ] = useState([])
    let [gameNo, setGameNo] = useState(1)

  //  useEffect (() => {
        
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
        
        console.log(board)
   // },[])

   useEffect(() => {
    console.log("inside use effect")
    setBoard(tempboard)
   },[])

    //create game board with random bombs
    const createGameBoard = () => {
        let bombLocations = []
        let tempboard = []
        for (let x = 0; x < size; x++){
            bombLocations.push(Math.floor(Math.random() * size))
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
                        if (tempboard[x-1][size-1].isBomb) count ++
                    }
                }
                if (x < size-1 ){
                    //can check underneath
                    if (tempboard[x+1][y].isBomb) count ++ 
                    if (y > 0){
                        if (tempboard[x+1][y-1].isBomb) count ++
                    }
                    if (y < size - 1){
                        if(tempboard[x+1][size-1].isBomb) count ++
                    }
                }
                if(y > 0){
                    if(tempboard[x][y-1].isBomb) count ++ 
                }
                if (y < size-1){
                    if(tempboard[x][size-1].isBomb) count ++ 
                }
                tempboard[x][y].number = count
            }
        }
        console.log(tempboard)
        return tempboard
    }

    return (
        <>
        <GameContext.Provider value = {board}>
            <Board/>
        </GameContext.Provider>
        </>
    )
}
export default Game
