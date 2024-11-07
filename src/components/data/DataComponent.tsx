// DataComponent.tsx
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface DataRow {
    Company: string;
    QuestionID: string;
    FromSentences: string;
    Unit: string;
    Value: number;
}

const DataComponent: React.FC = () => {
    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        const csvFilePath = '/path/to/your/data.csv';

        fetch(csvFilePath)
            .then(response => response.text())
            .then(csvData => {
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        // Assert results.data as DataRow[]
                        const parsedData = results.data as DataRow[];
                        setData(parsedData);
                    }
                });
            })
            .catch(error => console.error('Error loading CSV data:', error));
    }, []);

    return (
        <div>
            <h3>Data Loaded from CSV:</h3>
            <ul>
                {data.map((row, index) => (
                    <li key={index}>
                        {row.Company} - {row.QuestionID} - {row.FromSentences} - {row.Unit} - {row.Value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataComponent;
