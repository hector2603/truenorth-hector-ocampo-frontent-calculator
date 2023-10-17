import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RecordResponse } from '../../../shared/model/RecordResponse';
import RecordService from '../../../shared/service/RecordService';
import { useSession } from 'next-auth/react'
import { UserData } from '../../../shared/model/UserData';
import Table from 'react-bootstrap/Table';
import styles from '../page.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function RecordTable() {
    const [records, setRecords] = useState<RecordResponse[]>([]);
    const [filterColumn, setFilterColumn] = useState<string>("amount");
    const [filterValue, setFilterValue] = useState<string>('');
    const [sortColumn, setSortColumn] = useState<string>("amount");
    const [sortValue, setSortValue] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const { data: session, status } = useSession();

    const handleFilterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPage(1);
        fetchRecordsPerPage();
    }

    const fetchRecordsPerPage = async () => {
        try {
            const token = (session?.user as UserData)?.user?.apiToken;
            console.log("page -> ", page);
            const response = await RecordService.getRecord(token, page, 10, filterColumn, filterValue, sortColumn, sortValue, 'ACTIVE');
            console.log(response.data);
            if (response.data.length > 0) {
                setRecords(response.data);
            } else {
                if (page > 1) {
                    setPage(page - 1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRecordsPerPage();
    }, [page]);

    const handlePageChange = async (pageNumer: number) => {
        if (pageNumer > 0) {
            setPage(pageNumer);
        }
    }

    const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value as unknown as string);
    };

    useEffect(() => {
        async function fetchRecords() {
            try {
                const token = (session?.user as UserData)?.user?.apiToken;
                const response = await RecordService.getRecord(token, 1, 10, undefined, undefined, undefined, undefined, 'ACTIVE');
                setRecords(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecords();
    }, [session]);

    const handleClickDelete = (id: number) => {
        setRecords((current: RecordResponse[]) =>
            current.filter(
                (record) =>
                    record.id != id
            )
        );
        const token = (session?.user as UserData)?.user?.apiToken;
        RecordService.deleteByID(token, id);
    };

    return (
        <div className={styles.tablerecords}>
            <h1 className={styles.tittleSelectOperation}>Records</h1>
            <form onSubmit={handleFilterSubmit} className={styles.formfilter}>
                <div className={styles.filterfield}>
                    <div className={styles.fieldFilter}>
                        <Form.Group className={styles.inputOperation} >
                            <Form.Label htmlFor="filterStatus">Filter by Column:</Form.Label>
                            <Form.Select id="filterStatus" value={filterColumn} onChange={(event) => setFilterColumn(event.target.value)}>
                                <option value="amount">Amount</option>
                                <option value="operationResponse">Operation Response</option>
                                <option value="userBalance">User Balance</option>
                                <option value="operationType">Operation Type</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className={styles.fieldFilter}>
                        <Form.Group className={styles.inputOperation} onChange={handleFilterValueChange} >
                            <Form.Label>Value to filter</Form.Label>
                            <Form.Control placeholder="Enter Value to filter" />
                        </Form.Group>
                    </div>
                </div>
                <div className={styles.filterfield}>
                    <div className={styles.fieldFilter}>
                        <Form.Group className={styles.inputOperation} >
                            <Form.Label htmlFor="filterStatus">Sort by Column:</Form.Label>
                            <Form.Select id="filterStatus" value={sortColumn} onChange={(event) => setSortColumn(event.target.value)}>
                                <option value="amount">Amount</option>
                                <option value="operationResponse">Operation Response</option>
                                <option value="userBalance">User Balance</option>
                                <option value="operationType">Operation Type</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className={styles.fieldFilter}>
                        <Form.Group className={styles.inputOperation}>
                            <Form.Label>Sort Way</Form.Label>
                            <Form.Select id="filterStatus" value={sortValue} onChange={(event) => setSortValue(event.target.value)}>
                                <option value="ASC">Ascending</option>
                                <option value="DESC">Descending</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </div>
                <div className="d-grid gap-2 mt-1">
                    <Button type="submit">Filter</Button >
                </div>
            </form>
            <div className={styles.spacetable}>
                <Table striped bordered hover responsive>
                    <thead >
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Operation Response</th>
                            <th>User Balance</th>
                            <th>Status</th>
                            <th>Operation Type</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.amount}</td>
                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                <td>{record.operationResponse}</td>
                                <td>{record.userBalance}</td>
                                <td>{record.status}</td>
                                <td>{record.operationType}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleClickDelete(record.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={styles.pagination}>
                    <div className={styles.paginationContainer}>
                        {<Button onClick={() => handlePageChange(page - 1)}>Previous</Button>}
                        {<span>{page}</span>}
                        {<Button onClick={() => handlePageChange(page + 1)}>Next</Button>}
                    </div>
                </div>
            </div>
        </div>

    );
};

