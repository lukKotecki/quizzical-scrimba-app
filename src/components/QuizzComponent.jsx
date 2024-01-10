import React from "react";
import Question from "./Question";

export default function QuizzComponent({children, ...rest}){
    return (
        <div className='quizz-main-container'>
            <div className="quizz-list">
                {children}
                
            </div>
        </div>
    )
}