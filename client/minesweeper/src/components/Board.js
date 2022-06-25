import {useEffect,useState} from 'react'
import Square from './Square'
import GameContext from "./GameContext"
import './styles/board.css'

const Board = (props) => {
    //let {board, setBoard} = useContext(GameContext)
    let [board, setBoard] = useState([])
    let [hasNewBoard, setHasNewBoard] = useState(0)
    let [winState, setWinState] = useState(null)

    let tempboard = props.game

    useEffect(()=>{
        setBoard(tempboard)
        console.log(board)
    },[hasNewBoard])

    //implement game logic for clicking on a square
    const changeBoard = (i,j, visited) => {
        changeBoardHelper(i,j,visited)
        setHasNewBoard(hasNewBoard + 1)
        console.log(`board that is set`,board)
    }
    //change board is called when the squares are clicked, re-renders the board  according to gamplay rules
    const changeBoardHelper = (i, j, visited) => {
        console.log("changing the board")
        console.log(visited)
        let size = board.length
        //change the blank ones that are supposed to be expanded to "clicked"
        if (board[i][j].isBomb || board[i][j].isClicked){
            if (board[i][j].isBomb) {
                tempboard[i][j].isClicked = true
                setWinState('lose')
            }
            return
        }
        tempboard[i][j].isClicked = true
        
        if(board[i][j].number === 0 ) {
            
            if (i > 0){
                //can check square directly above
                if (!visited.includes(`${i-1}${j}`)){
                    visited.push(`${i-1}${j}`)
                    changeBoardHelper(i-1, j, visited)
                }
                if (j > 0){ //can check 
                    if (!visited.includes(`${i-1}${j-1}`)){
                        visited.push(`${i-1}${j-1}`)
                        changeBoardHelper(i-1, j-1, visited)
                }}
                if (j < size - 1){
                    if (!visited.includes(`${i-1}${j+1}`)){
                        visited.push(`${i-1}${j+1}`)
                        changeBoardHelper(i-1, j+1, visited)
                    }}
            }
            if (i < size-1 ){
                //can check underneath
                if (!visited.includes(`${i+1}${j}`)){
                    visited.push(`${i+1}${j}`)
                    changeBoardHelper(i+1, j, visited)
                }
                if (j > 0){
                    if (!visited.includes(`${i+1}${j-1}`)){
                        visited.push(`${i+1}${j-1}`)
                        changeBoardHelper(i+1, j-1, visited)
                }}
                if (j < size - 1){
                    if (!visited.includes(`${i+1}${j+1}`)){
                        visited.push(`${i+1}${j+1}`)
                        changeBoardHelper(i+1, j+1, visited)
                    }}
            }
            if(j > 0){
                if (!visited.includes(`${i}${j-1}`)){
                    visited.push(`${i}${j-1}`)
                    changeBoardHelper(i, j-1, visited)
                }
            }
            if (j < size-1){
                if (!visited.includes(`${i}${j+1}`)){
                    visited.push(`${i}${j+1}`)
                    changeBoardHelper(i, j+1, visited)
                }
            }
        }
    }

    return (
        <>
        {   <>
            {winState === 'lose' ? <h1>You Lost</h1> : <h1>Minesweeper</h1>}
            
            <div className = 'board-container'>
                {board.map((row,index) => {
                    return(
                        row.map((element, colindex) => {
                            console.log(element)
                            return (
                                <div className='square'>
                                    <img key={`${index}${colindex}`} src= {!element.isClicked ? '/blankUnclicked.png' : element.isBomb ? '/bomb.png' : `${element.number}.png`} alt="image" onClick = {() => changeBoard(index,colindex,[`${index}${colindex}`])}/>
                                </div>
                                
                            )
                        })
                    )
                })}
            </div>
            </>
        }
        </>
    )
 
}

export default Board
