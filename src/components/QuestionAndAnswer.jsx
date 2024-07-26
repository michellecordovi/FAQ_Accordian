/* eslint-disable react/prop-types */
import {useState} from 'react';

function QuestionAndAnswer(props) {
    const [open, setOpen] = useState(false);

    function handleClick(event){
        const parent = event.target.closest(".question-header")
        const answer = parent.nextSibling;

       if(open === false) {
        setOpen(true);
        answer.style.maxHeight = "200px";
        answer.style.opacity= "1";
       } else {
        setOpen(false);
        answer.style.maxHeight = "0px";
        answer.style.opacity= "0";
       }
    }

    return (
        <div className="question-and-answer">
            <div className="question-header">
                <h2 className="question" onClick={handleClick}>{props.question}</h2>
                <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="30" height="31" fill="none" viewBox="0 0 30 31"><path fill="#AD28EB" d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z"/></svg>
            </div>
            <p className="answer">{props.answer}</p>
        </div>
    )
}

export default QuestionAndAnswer;