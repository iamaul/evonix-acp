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
        current_quiz, 
        clearCurrentQuiz, 
        clearQuizErrors,
        error
    } = quizContext;

    const imageFileRef = React.createRef();

    const [quiz, setQuiz] = useState({ title: '', question: '', image: null });
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState(null);

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
    }, [quizContext, current_quiz, clearQuizErrors, error])

    const onTitleChange = e => setTitle(e.target.value);

    const onSubmit = e => {
        e.preventDefault();

        setQuiz({ title, question, image });
        console.log("onSubmit: " + title + question + image);
        console.log(quiz);

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
