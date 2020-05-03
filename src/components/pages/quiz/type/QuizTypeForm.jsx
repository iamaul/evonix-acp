import React from 'react';
import { Header, Form } from 'semantic-ui-react';

const QuizTypeForm = () => {
    return (
        <>
            <Header as="h3">Quiz Type</Header>
            <Form size="small">
                <Form.Input 
                    type="text"
                    name="name" 
                    placeholder="Name"
                    fluid 
                />
                <Form.Button color="red" size="small" content="Add" />
            </Form>  
        </>
    )
}

export default QuizTypeForm;
