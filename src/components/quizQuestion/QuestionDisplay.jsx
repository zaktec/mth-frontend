import React from "react";

const QuestionDisplay = (props) => {
  return (
    <div className="question-img" key={props?.question?.question_number}>
      <img src={props?.question?.question_image} alt="question-diagram" />
    </div>
  );
};

export default QuestionDisplay;
