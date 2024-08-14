/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';

function QuestionAndAnswer(props) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null); // Ref for the container
    const questionRefs = useRef([]); // Ref array for question headers

    function handleClick(event) {
        const parent = event.target.closest(".question-header");
        const answer = parent.nextSibling;

        setOpen(() => {
            if (!open) {
                answer.style.maxHeight = "200px";
                answer.style.opacity = "1";
                answer.style.marginTop = "24px";
                parent.querySelector(".minus").style.display = "block";
                parent.querySelector(".plus").style.display = "none";
                return true;
            } else {
                answer.style.maxHeight = "0px";
                answer.style.opacity = "0";
                answer.style.marginTop = "0px";
                setTimeout(() => {
                    parent.querySelector(".minus").style.display = "none";
                    parent.querySelector(".plus").style.display = "block";
                }, 500);
                return false;
            }
        });
    }

    function handleKeyDown(event) {
        if ((event.key === 'Enter' || event.keyCode === 13) && document.activeElement === event.target) {
            handleClick(event);
        }
    }

    function handleTab(event) {
        if (event.key === 'Tab') {
            const allQuestions = questionRefs.current;
            const lastQuestion = allQuestions[allQuestions.length - 1];
            const firstQuestion = allQuestions[0];

            // Handle focus cycling
            if (document.activeElement === lastQuestion && !event.shiftKey) {
                event.preventDefault();
                firstQuestion.focus();
            } else if (document.activeElement === firstQuestion && event.shiftKey) {
                event.preventDefault();
                lastQuestion.focus();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleTab);
        return () => {
            document.removeEventListener('keydown', handleTab);
        };
    }, []);

    useEffect(() => {
        // Initialize refs
        questionRefs.current = document.querySelectorAll('.question-header h2');
    }, [props.questions]);

    return (
        <div ref={containerRef} className={(props.index !== 0) ? `question-and-answer not-first-question question-${props.index + 1}` : `question-and-answer question-${props.index + 1}`}>
            <div className="question-header">
                <h2 className="question" 
                    tabIndex={props.index + 1} 
                    onClick={handleClick} 
                    onKeyDown={handleKeyDown}>
                    {props.question}
                </h2>
                <svg className="plus icon" 
                     onClick={handleClick} 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="30" height="31" 
                     fill="none" viewBox="0 0 30 31">
                    <path fill="#AD28EB" d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z"/>
                </svg>
                <svg className="minus icon" 
                     onClick={handleClick} 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="30" height="31" 
                     fill="none" viewBox="0 0 30 31">
                    <path fill="#301534" d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.2 12.2 0 0 0 15 3.312Zm4.688 13.124h-9.375a.938.938 0 0 1 0-1.875h9.374a.938.938 0 0 1 0 1.876Z"/>
                </svg>
            </div>
            <p className="answer">{props.answer}</p>
        </div>
    );
}

export default QuestionAndAnswer;
