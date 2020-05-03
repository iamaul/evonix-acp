import React from 'react';
import { Table } from 'semantic-ui-react';

const QuizTypeList = () => {
    return (
        <>
            <Table basic="very" stackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Created by</Table.HeaderCell>
                        <Table.HeaderCell>Updated by</Table.HeaderCell>
                        <Table.HeaderCell>Created at</Table.HeaderCell>
                        <Table.HeaderCell>Updated at</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>Scenario</Table.Cell>
                        <Table.Cell>Errpan</Table.Cell>
                        <Table.Cell>Errpan</Table.Cell>
                        <Table.Cell>Today, 12:00 PM</Table.Cell>
                        <Table.Cell>Today, 13:00 AM</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>Multiple Choice</Table.Cell>
                        <Table.Cell>Errpan</Table.Cell>
                        <Table.Cell>Errpan</Table.Cell>
                        <Table.Cell>Today, 13:00 PM</Table.Cell>
                        <Table.Cell>Today, 14:00 AM</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>  
        </>
    )
}

export default QuizTypeList;
