import React, { useState, useContext, useEffect } from 'react';
import { Header, Form } from 'semantic-ui-react';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

const QuizTypeForm = () => {
    const quizTypeContext = useContext(QuizTypeContext);
    const { addQuizType, updateQuizType, clearCurrentQuizType, current_quiz_type } = quizTypeContext;

    useEffect(() => {
        if (current_quiz_type !== null) {
            setQuizType(current_quiz_type);
        } else {
            setQuizType({ name: '' });
        }
    }, [quizTypeContext, current_quiz_type])

    const [quizType, setQuizType] = useState({ name: '' });

    const { name } = quizType;

    const onChange = e => setQuizType({ ...quizType, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (current_quiz_type === null) {
            addQuizType(quizType);
        } else {
            updateQuizType(quizType);
        }
        clearQuizType();
    }

    const clearQuizType = () => {
        clearCurrentQuizType();
    }

    return (
        <>
            <Header as="h3">Quiz Type</Header>
            <Form size="small" onSubmit={onSubmit}>
                <Form.Input 
                    type="text"
                    name="name" 
                    value={name}
                    placeholder="Name"
                    onChange={onChange}
                    fluid 
                />
                <Form.Button color="red" size="small" content={current_quiz_type ? 'Edit' : 'Add'} />
                {current_quiz_type && (
                    <Form.Button color="red" size="small" content="Clear" onClick={clearQuizType} />
                )}
            </Form>  
        </>
    )
}

export default QuizTypeForm;
