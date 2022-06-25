import {useState} from 'react'
import './styles/square.css'

const Square = (props) => {
    //logic to return the correct square image
    return (
        <>
        <div className='square'>
            <img src= {props.bomb ? 'bomb.png' : !props.clicked ? '/blankUnclicked.png' : `${props.number}.png`} alt="image" onClick = {props.handleClick}/>
        </div>
        </>
    )

}

export default Square