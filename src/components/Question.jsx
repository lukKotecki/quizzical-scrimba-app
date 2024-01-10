import React from 'react'
import {decode} from 'html-entities';

export default function Question({questionToRender}){

    const [question, setQuestion]= React.useState(questionToRender)

    function handleSelect(idOfElement){
        console.log(idOfElement)
        setQuestion(prev=> ({...prev, selected:idOfElement}))
    }
//console.log(question)

    return(
        <div className='question-main-container'>
            <h2>{decode(question.question)}</h2>

            <form className='question-form' id={question.id}>
                {question.answers.map((answer,index)=> 
                <div  key={question.id+index}>
                    <input type='radio' name={question.id}  id={question.id+index} value={answer}/>
                    <label onClick={()=> handleSelect(answer)} 
                        className={'form-label '+ (question.selected === answer && 'active-answer') }
                        htmlFor={question.id+index} >
                            {decode(answer)}
                    </label>
                </div>
                )}
            </form>
        </div>
    )
}


// answers: ['Joe Dimaggio', 'Kirk Douglas', 'James Dougherty', 'Arthur Miller']
// correct_answer:"James Dougherty"
// id: "rEfv-jeG4lTTxNxLx84z0"
// question:"What was the name of somethinga"


                // <input type='radio' name='id-of-question' id='answer-1' value='answer-1'/>
                // <label className='form-label' htmlFor='answer-1'>This is answer 1</label>
                // <input type='radio'  name='id-of-question'id='answer-2' value='answer-2'/>
                // <label className='form-label active-answer' htmlFor='answer-2'>answer 2</label>
                // <input type='radio' name='id-of-question' id='answer-3' value='answer-3'/>
                // <label className='form-label' htmlFor='answer-3'>Th 3</label>
                // <input type='radio'  name='id-of-question'id='answer-4' value='answer-4'/>
                // <label className='form-label' htmlFor='answer-4'>This is answer 4</label>