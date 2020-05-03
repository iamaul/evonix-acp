import React from 'react';
import { Grid } from 'semantic-ui-react';

import QuizTypeForm from './QuizTypeForm';
import QuizTypeList from './QuizTypeList';

const index = () => {
    return (
        <>
            <Grid columns={2} padded>
                <Grid.Column>
                    <QuizTypeForm />
                </Grid.Column>
                <Grid.Column>
                    <QuizTypeList />
                </Grid.Column>
            </Grid>  
        </>
    )
}

export default index;
