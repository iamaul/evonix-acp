import React, { useEffect, useContext, useMemo, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Button, Icon } from 'semantic-ui-react';

import BanContext from '../../../context/ban/banContext';

import Loader from '../../layouts/loader/Loader';

const Banlist = () => {
    const banContext = useContext(BanContext);
    const { banlist, getBanlist, deleteBan, setLoading } = banContext;

    useEffect(() => {
        getBanlist();
        // eslint-disable-next-line
    }, []);

    const onBanDelete = useCallback((id) => {
        deleteBan(id);
        // eslint-disable-next-line
    }, []);

    const columns = useMemo(() => [
        {
            name: 'User',
            selector: 'account',
            sortable: true
        },
        {
            name: 'Issuer',
            selector: 'issuer',
            sortable: true
        },
        {
            name: 'Reason',
            selector: 'reason'
        },
        {
            name: 'Date',
            selector: 'timestamp',
            sortable: true,
            cell: row => <div><Moment unix format="lll">{row.timestamp}</Moment></div>
        },
        {
            name: 'Date Expired',
            selector: 'timestamp_expired',
            sortable: true,
            cell: row => <div>{row.timestamp_expired === 0 ? 'None' : <Moment unix format="lll">{row.timestamp_expired}</Moment>}</div>
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                    <Button animated="fade" color="red" onClick={() => onBanDelete(row.id)}>
                        <Button.Content visible><Icon name="delete" /></Button.Content>
                        <Button.Content hidden>Unban</Button.Content>
                    </Button>
                )
        }
        // eslint-disable-next-line
    ], []);

    return (
        <>
            {banlist !== null && !setLoading ? (
                <DataTable
                    title="Banlist"
                    columns={columns}
                    data={banlist}
                    pagination
                    highlightOnHover
                    defaultSortField="timestamp"
                />
            ) : (
                <Loader isLoading={setLoading} />
            )}  
        </>
    )
}

export default Banlist;
