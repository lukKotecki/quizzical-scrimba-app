import React from 'react'

export default function NewGameComponent(props){
    return (
        <div className='new-game-container'>
            <h1>Quizzical</h1>
            <p>Check your knowledge</p>
            <button onClick={props.handleNewGameButtonClick}>New Game</button>
        </div>
    )
}