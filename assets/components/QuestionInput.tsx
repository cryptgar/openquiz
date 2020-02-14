import React from "react";
import { Question } from "../interfaces/question.interface";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type QuestionInputProps = {
    question: Question;
    onAddInvalidQuestion: () => void;
};

export const QuestionInput: React.FC<QuestionInputProps> = props => {
    return (
        <React.Fragment>
            <TextField fullWidth label="Question" value={props.question.question} />
            <TextField fullWidth label="Right Answer" value={props.question.answer} />
            <Button onClick={props.onAddInvalidQuestion}>Add Invalid Question</Button>
        </React.Fragment>
    );
};
