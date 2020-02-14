import React from "react";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Button, Card, CardContent } from "@material-ui/core";
import { Question } from "../interfaces/question.interface";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const styles = (theme: Theme) =>
    createStyles({
        addButton: {
            marginTop: theme.spacing(2),
        },
        questionCard: {
            marginBottom: theme.spacing(2),
        },
        textfield: {
            margin: theme.spacing(0.5),
        },
    });

type CreateProps = WithStyles<typeof styles>;

interface CreateState {
    questions: Question[];
}

class CreatePage extends React.Component<CreateProps, CreateState> {
    constructor(props: CreateProps) {
        super(props);
        this.state = {
            questions: [],
        };
    }

    addEmptyQuestion() {
        this.setState(state => ({
            questions: state.questions.concat({
                question: "",
                answer: "",
                invalidAnswers: [],
            }),
        }));
    }

    renderQuestionsInput() {
        const elements = [];

        for (let i = 0; i < this.state.questions.length; i++) {
            const { questions } = this.state;
            elements.push(
                <Card className={this.props.classes.questionCard} key={i}>
                    <CardContent>
                        <TextField
                            fullWidth
                            className={this.props.classes.textfield}
                            label="Question"
                            value={questions[i].question}
                            onChange={event => {
                                const value = event.target.value;
                                this.setState(state => {
                                    const newState = { ...state };
                                    newState.questions[i].question = value;

                                    return newState;
                                });
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Right Answer"
                            className={this.props.classes.textfield}
                            value={questions[i].answer}
                            onChange={event => {
                                const value = event.target.value;
                                this.setState(state => {
                                    const newState = { ...state };
                                    newState.questions[i].answer = value;

                                    return newState;
                                });
                            }}
                        />
                        {questions[i].invalidAnswers.map((val, index) => (
                            <TextField
                                key={index}
                                fullWidth
                                label={`Wrong Answer ${index + 1}`}
                                className={this.props.classes.textfield}
                                value={val}
                                onChange={event => {
                                    const value = event.target.value;
                                    this.setState(state => {
                                        const newState = { ...state };
                                        newState.questions[i].invalidAnswers[index] = value;

                                        return newState;
                                    });
                                }}
                            />
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                            className={this.props.classes.addButton}
                            onClick={() => {
                                this.setState(state => {
                                    const newState = { ...state };
                                    newState.questions[i].invalidAnswers.push("");

                                    return newState;
                                });
                            }}
                        >
                            Add Invalid Question
                        </Button>
                    </CardContent>
                </Card>,
            );
        }

        return elements;
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container>
                    <form>{this.renderQuestionsInput()}</form>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.addButton}
                        onClick={() => this.addEmptyQuestion()}
                    >
                        Add Question
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.addButton}>
                        Create
                    </Button>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CreatePage);
