/* eslint-disable no-unused-vars */
import questions from './FAQsData'
import QuestionAndAnswer from './QuestionAndAnswer';

function QuestionsGrid() {
    return (
        <div id="question-grid">
            {questions.map((item, index) => <QuestionAndAnswer key={index} index={questions.indexOf(item)} question={item.question} answer={item.answer}/>)}
        </div>
    )
}

export default QuestionsGrid;