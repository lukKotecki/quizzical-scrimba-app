import React from "react";
import {decode} from 'html-entities';
export default function QuizzComponent({
            questions, 
            handleSelect,
            handleCheckButton,
            showAnswers,
            handleReloadButton,
            points
        }){

    
    return (
        <div className='quizz-main-container'>
            <div className="quizz-list">

                {questions.map(question=> 
                    <div key={question.id} className='question-main-container'>
                        <h2>{decode(question.question)}</h2>
            
                        <form className='question-form' id={question.id}>
                            {question.answers.map((answer,index)=> 
                            <div  key={question.id+index}>
                                <input type='radio' name={question.id}  id={question.id+index} value={answer}/>
                                <label onClick={()=> handleSelect(answer, question.id)} 
                                    className={`form-label 
                                    ${question.selected === answer && 'active-answer'} 
                                    ${showAnswers ? answer === question.correct_answer && 'correct-answer' : ''}
                                    ` }
                                    htmlFor={question.id+index} >
                                        {decode(answer)}
                                </label>
                            </div>
                            )}
                        </form>
                    </div>
                )}
 
            </div>

            <div className="quizz-bottom">
                <button onClick={()=> handleReloadButton()}>NEXT GAME</button>
                <button onClick={()=> handleCheckButton()}>CHECK ANSWERS</button>
                <div className="points">POINTS: {points}</div>
            </div>
        </div>
    )
}

 


 