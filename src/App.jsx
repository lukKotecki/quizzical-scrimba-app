import React from 'react'
import NewGameComponent from './components/NewGameComponent'
import QuizzComponent from './components/QuizzComponent'
import Question from './components/Question'
import {nanoid } from 'nanoid'

function App() { 
  const [gameIsActive, setGameIsActive] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [responseFromAPI, setResponseFromAPI] = React.useState([])
  function toggleGameState(){
    setGameIsActive(prev =>!prev)
  }
  function handleNewGameButtonClick(){
    getQuestionsFromApi()
  }



    React.useEffect(()=>{
        // console.log(questions)
      toggleGameState()
      },[questions])
      

  React.useEffect(() =>{
    if(responseFromAPI.length){
      setQuestions(responseFromAPI.map(res => ({
        correct_answer: res.correct_answer,
        question: res.question,
        answers: shuffleQuestions([...res.incorrect_answers, res.correct_answer]),
        id: nanoid(),
        selected: '' }))
      )
    }
  },[responseFromAPI])


async function getQuestionsFromApi(){
  try{
    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    if(!res.ok){
      throw Error("CANT REACH API")
    }
    const data = await res.json()
    if(data.response_code)
      throw Error("Something went wrong, code:"+data.response_code)
      if(!data.response_code)
        setResponseFromAPI(data.results) 
  }catch(e){
    console.log("ERROR: "+e)
  }
}

function shuffleQuestions(array){
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
  return array
}

  return (
    <>
      <div className='main-container'>
      {
        gameIsActive ? 
          <QuizzComponent>
            {questions.map(el=> <Question key={el.question} questionToRender={el} />)}
          </QuizzComponent> 
          :
          <NewGameComponent handleNewGameButtonClick={handleNewGameButtonClick}/>
      }
      </div>
    </>
  )
}

export default App
