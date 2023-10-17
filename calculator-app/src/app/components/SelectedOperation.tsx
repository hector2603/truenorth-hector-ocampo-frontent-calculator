import React from 'react';
import styles from '../page.module.css'
import { OperationData } from '../../../shared/model/OperationData';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OperationService from '../../../shared/service/OperationService';
import { useSession } from 'next-auth/react'
import { UserData } from '../../../shared/model/UserData';
import { PerformOperationResponse } from '../../../shared/model/PerformOperationResponse';
import { AxiosError } from 'axios';
import { MessageResponse } from '../../../shared/model/MessageResponse';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function SelectedOperation({ cost, type }: OperationData) {

    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [result, setResult] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const { data: session, status } = useSession();
    const MySwal = withReactContent(Swal)


    const handleValue1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue1(event.target.value as unknown as number);
    };

    const handleValue2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue2(event.target.value as unknown as number);
    };

    const handleCalculate = async () => {
        console.log("Calculating square root", value1, value2);
        const performOperationRequest = { operation: type, firstOperator: value1, secondOperator: value2 }
        const token = (session?.user as UserData)?.user?.apiToken;

        try {
            const resultOperation = await OperationService.performOperation(performOperationRequest, token);
            setResult((resultOperation.data as PerformOperationResponse).result);
            setBalance((resultOperation.data as PerformOperationResponse).userBalance);
        } catch (error) {
            const errorMessage = ((error as AxiosError).response?.data as MessageResponse ).error.message;
            MySwal.fire({
              title: <p>{errorMessage}</p>,
              icon: 'error'
            })
            console.log(error);
        }
    };

    const renderOperationFields = () => {
        switch (type) {
            case "SQUARE_ROOT":
                return (
                    <>
                        <Form.Group className={styles.inputOperation} >
                            <Form.Label>Value to calculate the square roots</Form.Label>
                            <Form.Control type="number" placeholder="Enter Value" onChange={handleValue1Change} />
                        </Form.Group>

                        <Button onClick={handleCalculate}>Calculate</Button>
                    </>
                );
            case "RANDOM_STRING":
                return (
                    <>
                        <Form.Group className={styles.inputOperation} >
                            <Form.Label>Value the length for the random String</Form.Label>
                            <Form.Control type="number" placeholder="Enter Value" onChange={handleValue1Change} />
                        </Form.Group>

                        <Button onClick={handleCalculate}>Calculate</Button>
                    </>
                );
            case "ADDITION":
            case "SUBTRACTION":
            case "MULTIPLICATION":
            case "DIVISION":
                return (
                    <>
                        <Form.Group className={styles.inputOperation} >
                            <Form.Label>Enter the first value to calculate the operation</Form.Label>
                            <Form.Control type="number" placeholder="Enter Value" onChange={handleValue1Change} />
                        </Form.Group>
                        <Form.Group className={styles.inputOperation} >
                            <Form.Label>Enter the second value to calculate the operation</Form.Label>
                            <Form.Control type="number" placeholder="Enter Value" onChange={handleValue2Change} />
                        </Form.Group>
                        <Button onClick={handleCalculate}>Calculate</Button >

                    </>
                );
        }
    };

    return (
        <div className={styles.showOperation}>
            <h2>{type}</h2>
            <h2 className={styles.cost}>Cost: {cost}</h2>
            {renderOperationFields()}
            {result !== null && (
                <div className={styles.showResults}>
                    <h2>Result: {result}</h2>
                    <h2>New Balance {balance}</h2>
                </div>
            )}
        </div>
    );
}

export default SelectedOperation;