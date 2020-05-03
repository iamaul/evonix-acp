import React from 'react';
import DataTable from 'react-data-table-component';
import { Icon, Button } from 'semantic-ui-react';

import QuizAnswerList from './QuizAnswerList';

const QuizAnswer = () => {
    const data = [{ 
        id: 1, 
        title: 'Conan the Barbarian', 
        summary: 'Orphaned boy Conan is enslaved after his village is destroyed...',  
        year: '1982', 
        image: 'http://conan.image.png' }];

    const columns = [
        {
            name: 'Title',
            sortable: true,
            cell: row => <div><div style={{ fontWeight: 700 }}>{row.title}</div>{row.summary}</div>,
        },
        {
            name: 'Year',
            selector: 'year',
            sortable: true,
            right: true,
        },
    ];

    const actions = (
        <Button color="green" icon size="small">
            <Icon name="add" />
        </Button>
    )

    return (
        <>
            <DataTable
                title="Quiz Answer List."
                columns={columns}
                data={data}
                actions={actions}
                highlightOnHover
                sortIcon={<Icon name="caret down" />}
                expandableRows
                expandableRowsComponent={<QuizAnswerList data={data} />}
            />  
        </>
    )
}

export default QuizAnswer;
