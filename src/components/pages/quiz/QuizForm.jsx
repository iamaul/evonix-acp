import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Header, Form } from 'semantic-ui-react';

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
        current_quiz, 
        clearCurrentQuiz, 
        clearQuizErrors,
        error
    } = quizContext;

    // const imageFileRef = React.createRef();

    const [quiz, setQuiz] = useState({ title: '', question: '', image: '' });

    useEffect(() => {
        if (current_quiz !== null) {
            setQuiz(current_quiz);
        } else {
            setQuiz({ title: '', question: '', image: '' });
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
    }, [quizContext, current_quiz, clearQuizErrors, error])

    const { title, question, image } = quiz;
    const onChange = e => setQuiz({ ...quiz, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (current_quiz === null) {
            addQuiz(quiz);
        } else {
            updateQuiz(quiz);
        }
        clearQuiz();
    }

    const clearQuiz = () => {
        clearCurrentQuiz();
    }
    
    return (
        <>
            <Header as="h5">Quiz Scenario</Header>
            <Form size="small" onSubmit={onSubmit}>
                <Form.Input 
                    type="text"
                    name="title" 
                    value={title}
                    placeholder="Title"
                    onChange={onChange}
                    fluid 
                />
                <Form.Field>
                    <textarea 
                        name="question"
                        value={question}
                        cols="30" 
                        rows="10"
                        placeholder="Question"
                        onChange={onChange} 
                    />
                </Form.Field>
                <Form.Input 
                    type="text"
                    name="image" 
                    value={image}
                    placeholder="Image URL (e.g: http://imgur.com/)"
                    onChange={onChange}
                    fluid 
                />
                {/* <Form.Field>
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
                </Form.Field> */}
                <Form.Button color="red" size="small" content={current_quiz ? 'Edit' : 'Add'} />
                {current_quiz && (
                    <Form.Button color="red" size="small" content="Clear" onClick={clearQuiz} />
                )}
            </Form>  
        </>
    )
}

export default QuizForm;
