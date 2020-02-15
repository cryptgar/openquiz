import React from "react";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { Button, Card, CardContent, ButtonGroup } from "@material-ui/core";
import { Question } from "../interfaces/question.interface";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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

    canCreate() {
        if (this.state.questions.length == 0) return false;

        for (const question of this.state.questions) {
            if (question.invalidAnswers.length > 0) return true;
        }

        return false;
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
                                label={`Wrong Answer #${index + 1}`}
                                className={this.props.classes.textfield}
                                value={val}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                this.setState(state => {
                                                    const newState = { ...state };
                                                    newState.questions[i].invalidAnswers.splice(index, 1);

                                                    return newState;
                                                });
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    ),
                                }}
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
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button
                                className={this.props.classes.addButton}
                                onClick={() => {
                                    this.setState(state => {
                                        const newState = { ...state };
                                        newState.questions[i].invalidAnswers.push("");

                                        return newState;
                                    });
                                }}
                            >
                                Add Wrong Answer
                            </Button>
                            <Button
                                className={this.props.classes.addButton}
                                onClick={() => {
                                    this.setState(state => {
                                        const newState = { ...state };
                                        newState.questions.splice(i, 1);

                                        return newState;
                                    });
                                }}
                            >
                                Delete Question
                            </Button>
                        </ButtonGroup>
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
                    <Card className={this.props.classes.questionCard}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Create a Quiz
                            </Typography>
                        </CardContent>
                    </Card>
                    <form>{this.renderQuestionsInput()}</form>
                    <ButtonGroup color="primary">
                        <Button className={classes.addButton} onClick={() => this.addEmptyQuestion()}>
                            Add Question
                        </Button>
                        <Button disabled={!this.canCreate()} className={classes.addButton}>
                            Create
                        </Button>
                    </ButtonGroup>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CreatePage);
