import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarRectangleItem } from 'recharts/types/cartesian/Bar';

interface CompanyData {
  name: string;
  missingValue: number;
  score: number;
}

function Validation() {
    const [companyData, setCompanyData] = useState<CompanyData[]>([]);

    // 获取数据
    useEffect(() => {
        // Fetch the list of companies (file names) from the backend
        const fetchCompanies = async () => {
          try {
            const response = await fetch('http://localhost:3002/validation-company');
            if (!response.ok) {
              throw new Error(`Error fetching companies: ${response.statusText}`);
            }
            const data = await response.json();

            console.log('data:', data);
            const company = data[0].map((item: any) => {
                console.log('item:', item); 
                return {
                    name: item['report'],
                    missingValue: item['total_missing_fields_count'],
                    score: item['final_score'],
              };
            });

            setCompanyData(company);
            console.log('company:', company);
          } catch (error) {
            console.error('Error fetching companies:', error);
          }
        };
    
        fetchCompanies();
      }, []);

    // 表格列标题
    const tableHeaders = ["Company Name", "Missing Value", "Score", "PDF", "JSON"];

    return (
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-6">ESG Company Data</h1>
        
        {/* 表格 */}
        <div className="overflow-x-auto mb-8">
            <table className="w-full border border-gray-700">
            <thead>
                <tr>
                {tableHeaders.map(header => (
                    <th key={header} className="p-4 border border-gray-700 text-left">{header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {companyData.map((company, index) => (
                <tr key={index} className="border border-gray-700">
                    <td className="p-4">{company.name}</td>
                    <td className="p-4">{company.missingValue}</td>
                    <td className="p-4">{company.score}</td>
                    <td className="p-4">
                    <button className="bg-blue-500 px-3 py-1 rounded">View</button>
                    </td>
                    <td className="p-4">
                    <button className="bg-green-500 px-3 py-1 rounded">View</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    );
}

export default Validation;