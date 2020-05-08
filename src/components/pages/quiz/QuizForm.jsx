import React, { useState, useContext, useEffect, createRef } from 'react';
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

    const imageFileRef = createRef();
    const [quiz, setQuiz] = useState({ title: '', question: '', image: null });

    useEffect(() => {
        if (current_quiz !== null) {
            setQuiz(current_quiz);
        } else {
            setQuiz({ title: '', question: '', image: null });
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

    const { title, question, image } = quiz;

    const onChange = e => setQuiz({ ...quiz, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (current_quiz === null) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('question', question);
            formData.append('image', image);
            console.log(formData);
            addQuiz(formData);
        } else {
            updateQuiz(quiz);
        }
        clearQuiz();
    }

    const onImageFileChange = e => {
        setQuiz({ image: e.target.files[0] });
        console.log(image);
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
                    onChange={onChange}
                    fluid 
                />
                <Form.Field>
                    <TextArea placeholder="Question" value={question} onChange={onChange} />
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
                        onChange={onImageFileChange}
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
