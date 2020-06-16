import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import parse from 'html-react-parser';
import { Button, Image, Icon, Divider } from 'semantic-ui-react';

import { 
    useNews, 
    getAllNews, 
    deleteNews, 
    setCurrentNews, 
    clearCurrentNews 
} from '../../../context/news/NewsState';

import Loader from '../../layouts/loader/Loader';

const ExpandedData = ({ data }) => (
    <div>
        <Image src={data.image} size="medium" />
        <p><b>{data.title}</b><br/>Created at <Moment unix format="LLLL">{data.created_at}</Moment>{data.updated_at !== null && (<><br/>
                Last updated on <Moment unix format="LLLL">{data.updated_at}</Moment>
            </>)}</p>
        <Divider hidden />
        {parse(data.content)}
    </div>
);

const News = () => {
    const [newsState, newsDispatch] = useNews();
    const { news, setLoading } = newsState;
    
    useEffect(() => {
        getAllNews(newsDispatch);
    }, [newsDispatch]);

    const onNewsDelete = useCallback((id) => {
        deleteNews(newsDispatch, id);
        clearCurrentNews(newsDispatch);
        // eslint-disable-next-line
    }, []);

    const actions = (
        <Button
            content="Add New"
            color="green"
            size="small"
            as={Link}
            to="/news/form"
        />
    );

    const columns = useMemo(() => [
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
            style: {
                fontWeight: 'bold'
            }
        },
        {
            name: 'Slug',
            selector: 'slug',
            sortable: true
        },
        {
            name: 'Image',
            cell: row => <div><Image src={row.image} size="small" /></div>
        },
        {
            name: 'Created by',
            cell: row => <div>{row.newsCreatedBy && row.newsCreatedBy.name}</div>
        },
        {
            name: 'Updated by',
            cell: row => <div>{row.updated_by ? row.newsUpdatedBy && row.newsUpdatedBy.name : 'None'}</div>
        },
        {
            name: 'Created at',
            selector: 'created_at',
            sortable: true,
            cell: row => <div><Moment unix format="lll">{row.created_at}</Moment></div>
        },
        {
            name: 'Updated at',
            selector: 'updated_at',
            sortable: true,
            cell: row => <div>{row.updated_at !== null ? (<Moment unix format="lll">{row.updated_at}</Moment>) : 'No update'}</div>
        },
        {
            name: 'Action',
            button: true,
            allowOverflow: true,
            cell: (row) => (
                <Button.Group size="small">
                    <Button animated="fade" as={Link} onClick={() => setCurrentNews(row)} to="/news/form">
                        <Button.Content visible><Icon name="edit" /></Button.Content>
                        <Button.Content hidden>Edit</Button.Content>
                    </Button>
                    <Button animated="fade" color="red" onClick={() => onNewsDelete(row.id)}>
                        <Button.Content visible><Icon name="delete" /></Button.Content>
                        <Button.Content hidden>Delete</Button.Content>
                    </Button>
                </Button.Group> 
            )
        }
        // eslint-disable-next-line
    ], []);

    return (
        <>
            {news !== null && !setLoading ? (
                <DataTable
                    title="News"
                    columns={columns}
                    data={news}
                    pagination
                    expandableRows
                    expandableRowsComponent={<ExpandedData />}
                    highlightOnHover
                    defaultSortField="created_at"
                    actions={actions}
                />
            ) : (
                <Loader isLoading={setLoading} />
            )}  
        </>
    )
}

export default News;
