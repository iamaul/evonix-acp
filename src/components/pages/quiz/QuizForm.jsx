import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Header, Form, TextArea, Button } from 'semantic-ui-react';

import QuizContext from '../../../context/quiz/quizContext';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const QuizForm = () => {
    const quizContext = useContext(QuizContext);
    const { 
        addQuiz, 
        updateQuiz, 
        clearCurrentQuiz, 
        current_quiz, 
        clearQuizErrors, 
        error 
    } = quizContext;

    const imageFileRef = React.createRef();

    const INITIAL_STATE = {
        title: '',
        question: '',
        image: null
    }

    const [quiz, setQuiz] = useState(INITIAL_STATE);
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (current_quiz !== null) {
            setQuiz(current_quiz);
        } else {
            setQuiz({});
        }

        if (error) {
            error.map(err => {
                return Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.msg
                });
            });
            clearQuizErrors();
        }
    }, [quizContext, current_quiz, error, clearQuizErrors])

    const onTitleChange = e => setTitle(e.target.value);

    const onSubmit = e => {
        e.preventDefault();

        setQuiz({ title, question, image });

        if (current_quiz === null) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('question', question);
            formData.append('image', image);
            addQuiz(formData);
        } else {
            updateQuiz(quiz);
        }
        clearQuiz();
    }

    const onImageChange = e => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const onQuestionChange = e => {
        setQuestion(e.target.value);
        console.log(e.target.value);
    }

    const clearQuiz = () => {
        clearCurrentQuiz();
    }
    
    return (
        <>
            <Header as="h5">Quiz Scenario</Header>
            <Form size="small">
                <Form.Input 
                    type="text"
                    name="title" 
                    value={title}
                    placeholder="Title"
                    onChange={onTitleChange}
                    fluid 
                />
                <Form.Field>
                    <TextArea 
                        placeholder="Question" 
                        value={question} 
                        onChange={onQuestionChange} 
                    />
                </Form.Field>
                <Form.Field>
                    <Button 
                        content={current_quiz ? image : 'Choose image'}
                        labelPosition="left"
                        icon="file image"
                        onClick={() => imageFileRef.current.click()}
                        /><br/>
                    <input
                        ref={imageFileRef}
                        type="file"
                        hidden
                        onChange={onImageChange}
                    />
                </Form.Field>
                <Form.Button color="red" size="small" content={current_quiz ? 'Edit' : 'Add'} onClick={onSubmit}/>
                {current_quiz && (
                    <Form.Button color="red" size="small" content="Clear" onClick={clearQuiz} />
                )}
            </Form>  
        </>
    )
}

export default QuizForm;
