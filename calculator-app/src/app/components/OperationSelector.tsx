'use client'
import styles from '../page.module.css'
import React, { useState, useEffect } from 'react';
import OperationService from '../../../shared/service/OperationService';
import { useSession } from 'next-auth/react'
import { OperationData } from '../../../shared/model/OperationData';
import { UserData } from '../../../shared/model/UserData';
import SelectedOperation from './SelectedOperation';

export default function OperationSelector() {

  const [operations, setOperations] = useState<OperationData[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<OperationData | undefined>();
  const {data: session, status} = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const token = (session?.user as UserData)?.user?.apiToken;
      try {
        const operations = await OperationService.getOperations(token);
        setOperations(operations.data as OperationData[]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [session]);

  const handleOperationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const operation = operations.find((operation) => operation.type === event.target.value);
    setSelectedOperation(operation);
  };


  return (
    <div className={styles.operations}>
      <h1 className={styles.tittleSelectOperation}>Select Operation</h1>
      <div>
        <select className={styles.customSelect} value={selectedOperation?.type} onChange={handleOperationChange}>
          <option value="">Select Operation</option>
          {operations.map((operation, index) => (
            <option key={index} value={operation.type}>{operation.type}</option>
          ))}
        </select>

        {selectedOperation && (
          <SelectedOperation {...selectedOperation}  />
        )}
      </div>
    </div>
  )
}
