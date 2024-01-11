import React from 'react'
import NewGameComponent from './components/NewGameComponent'
import QuizzComponent from './components/QuizzComponent' 
import {nanoid } from 'nanoid'

function App() { 
  const [gameIsActive, setGameIsActive] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [responseFromAPI, setResponseFromAPI] = React.useState([])
  const [showAnswers, setShowAnswers] = React.useState(false)
  const [points, setPoints] = React.useState(0)

  function toggleGameState(){
    setGameIsActive(prev =>!prev)
  } 

  function handleSelect(selectedAnswer,idOfQuestion){
    setQuestions(quest=> quest.map(prev => prev.id ===idOfQuestion ?
        {...prev, selected:selectedAnswer}:
        {...prev}  ) )
}

  React.useEffect(() =>{
    if(responseFromAPI.length){
      setQuestions(responseFromAPI.map(res => ({
        correct_answer: res.correct_answer,
        question: res.question,
        answers: shuffleQuestions([...res.incorrect_answers, res.correct_answer]),
        id: nanoid(),
        selected: '' }))
        
      )
      setGameIsActive(true)
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

function handleCheckButton(){
  const points = questions.reduce((accum,curr)=> accum += curr.correct_answer===curr.selected ? 1: 0 ,0)
  console.log(points)
  setShowAnswers(true)
  checkPoints()
}

function handleReloadButton(){
  getQuestionsFromApi();
  setShowAnswers(false)
}

function checkPoints(){
  let pointsToAdd =0
  questions.forEach(question =>question.selected === question.correct_answer ? pointsToAdd++ : pointsToAdd)
  setPoints(prev => prev + pointsToAdd)
}

  return (
    <>
      <div className='main-container'>
      {
        gameIsActive ? 
          <QuizzComponent questions={questions} 
                          handleSelect={handleSelect} 
                          handleCheckButton={handleCheckButton}
                          showAnswers={showAnswers}
                          handleReloadButton={handleReloadButton}
                          points={points}
                          />  
          :
          <NewGameComponent handleNewGameButtonClick={getQuestionsFromApi}/>
      }
      </div>
    </>
  )
}

export default App
