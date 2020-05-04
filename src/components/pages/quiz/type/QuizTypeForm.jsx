import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Header, Form, Radio } from 'semantic-ui-react';

import QuizTypeContext from '../../../../context/quizType/quizTypeContext';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end'
});

const QuizTypeForm = () => {
    const quizTypeContext = useContext(QuizTypeContext);
    const { addQuizType, updateQuizType, clearCurrentQuizType, current_quiz_type, clearQuizTypeErrors } = quizTypeContext;

    useEffect(() => {
        if (current_quiz_type !== null) {
            setQuizType(current_quiz_type);
        } else {
            setQuizType({ name: '', active: true });
        }

        if (error) {
            error.map(err => {
                return Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.msg
                });
            });
            clearQuizTypeErrors();
        }
    }, [quizTypeContext, current_quiz_type])

    const [quizType, setQuizType] = useState({ name: '', active: true });

    const { name, active } = quizType;

    const onChange = e => setQuizType({ ...quizType, [e.target.name]: e.target.value });

    const toggleStatus = () => {
        const status = !(active);
        setQuizType({ active: status });
    }

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
                <Form.Field>
                    <Radio 
                        label="Status"
                        name="active"
                        value={active}
                        onChange={toggleStatus}
                        toggle
                    />
                </Form.Field>
                <Form.Button color="red" size="small" content={current_quiz_type ? 'Edit' : 'Add'} />
                {current_quiz_type && (
                    <Form.Button color="red" size="small" content="Clear" onClick={clearQuizType} />
                )}
            </Form>  
        </>
    )
}

export default QuizTypeForm;
