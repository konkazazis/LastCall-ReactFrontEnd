import React, { useEffect, useState } from 'react';
import { getExpenses } from '../Services/requests'; 
import Chart from 'react-apexcharts';

function MyComponent() {
  let expenseTypes = ['Transportation', 'Food', 'Housing', 'Utilities', 'Insurance', 'Healthcare', 'Saving', 'Personal Spending', 'Entertainment', 'Other', 'Total'];
  const [expensesByType, setExpensesByType] = useState([]);

  useEffect(() => {
    getExpenses()
      .then((data) => {
        calculateTotalExpensesByType(data);
        //----2.----Need to get the expense types from the data not hardcode them
        // data.forEach((expense) => {
        //   if (!expenseTypes.includes(expense.description)) {
        //     expenseTypes.push(expense.description);
        //   }
        // });
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);
  

  const calculateTotalExpensesByType = (data) => {
    const totalExpensesByType = [];
    // Initialize the total expenses for each type to 0
    expenseTypes.forEach((expenseType) => {
      totalExpensesByType[expenseType] = 0;
    });
    // Loop through expenses and sum the amounts for each type
    data.forEach((expense) => {
      totalExpensesByType[expense.description] += parseFloat(expense.amount);
      totalExpensesByType['Total'] += parseFloat(expense.amount);
    });
      setExpensesByType(totalExpensesByType);
      console.log(totalExpensesByType);
  };

  const chartOptions = {
    series: Object.values(expensesByType),
    options: {
      chart: {
        type: 'donut'
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%'
          },
        }
      },
      labels:  Object.keys(expensesByType),
      legend: {
        show: true,
        position: 'bottom',
      },
      colors: [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf',
        '#bd33ff',
      ],
    },
  };
  
  return (
    <div className='animate__animated animate__fadeIn m-2'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Expenses Analysis</h2>
        </div>
        <div className='flex justify-between'>
          <div className='w-2/6 h-[15rem] overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth '>
            {expenseTypes.map((expenseType) => (
            <div key={expenseType} className='mb-2 p-2 bg-slate-300 rounded-lg' >
              {expenseType}: {expensesByType[expenseType]}
            </div>
            ))}
          </div>
          <div className='w-4/6'>
            {Object.values(expensesByType) ?  
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="donut"
              height={350}
            />
            : <p>Loading...</p>
            }
          </div>
        </div>
    </div>
  );
}

export default MyComponent;
