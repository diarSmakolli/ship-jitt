// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Heading, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Container, SimpleGrid } from '@chakra-ui/react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [data, setData] = useState({
        totalUsers: 0,
        activeUsers: 0,
        recentUsers: 0,
        deletedUsers: 0,
        userRetention: 0,
        averageInvoiceAmount: 0,
        totalRevenue: 0,
        invoicesThisMonth: 0,
        dailyActiveUsers: 0,
        monthlyActiveUsers: 0,
        userGrowth: [],
        arpu: 0,
        weeklyActiveUsers: 0,
        monthlyRetentionRate: 0,
        revenueGrowth: [],
        invoiceGrowth: [],
        arpuGrowth: [],
        newUsersOverTime: [],
        revenueMonthlyGrowth: [],
        revenueWeeklyGrowth: [],
        invoicesMonthlyGrowth: [],
        invoicesWeeklyGrowth: [],
        arpuMonthlyGrowth: [],
        arpuWeeklyGrowth: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    await axios.get('http://localhost:6099/api/users/total-users', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/active-users', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/recent-users', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/count-unactive', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/user-retention', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/average-invoice-amount', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/total-revenue', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/invoices-this-month', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/daily-active-users', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/monthly-active-users', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/user-growth', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/arpu', { withCredentials: true }),
                    await axios.get('http://localhost:6099/api/users/metrics/weekly-active-users', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/monthly-retention-rate', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/revenue-growth', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/invoice-count', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/arpu-growth', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/new-users-over-time', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/revenue-monthly-growth', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/revenue-weekly', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/invoices-monthly-growth', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/invoices-weekly', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/arpu-monthly-growth', { withCredentials: true}),
                    await axios.get('http://localhost:6099/api/users/metrics/arpu-weekly', { withCredentials: true}),
                ]);

                setData({
                    totalUsers: responses[0].data.totalUsers,
                    activeUsers: responses[1].data.activeUsers,
                    recentUsers: responses[2].data.recentUsers,
                    deletedUsers: responses[3].data.deletedUsers,
                    userRetention: responses[4].data.userRetention,
                    averageInvoiceAmount: responses[5].data.averageInvoiceAmount,
                    totalRevenue: responses[6].data.totalRevenue,
                    invoicesThisMonth: responses[7].data.invoicesThisMonth,
                    dailyActiveUsers: responses[8].data.dailyActiveUsers,
                    monthlyActiveUsers: responses[9].data.monthlyActiveUsers,
                    userGrowth: responses[10].data.usersByDay,
                    arpu: responses[11].data.arpu,
                    weeklyActiveUsers: responses[12].data.weeklyActiveUsers,
                    monthlyRetentionRate: responses[13].data.retentionRate,
                    revenueGrowth: responses[14].data.revenueGrowth,
                    invoiceGrowth: responses[15].data.invoiceCount,
                    arpuGrowth: responses[16].data.arpuGrowth,
                    newUsersOverTime: responses[17].data.newUsersOverTime,
                    revenueMonthlyGrowth: responses[18].data.data,
                    revenueWeeklyGrowth: responses[19].data.data,
                    invoicesMonthlyGrowth: responses[20].data.data,
                    invoicesWeeklyGrowth: responses[21].data.data,
                    arpuMonthlyGrowth: responses[22].data.data,
                    arpuWeeklyGrowth: responses[23].data.data,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Chart data
    const barData = {
        labels: ['Total Users', 'Active Users', 'Recent Users', 'Deleted Users'],
        datasets: [{
            label: 'Users Metrics',
            data: [data.totalUsers, data.activeUsers, data.recentUsers, data.deletedUsers],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };


    const revenueLineData = {
        labels: data.revenueGrowth.map(entry => entry.date),
        datasets: [{
            label: 'Revenue Growth',
            data: data.revenueGrowth.map(entry => entry.totalRevenue),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const invoiceGrowthLineData = {
        labels: data.invoiceGrowth.map(entry => entry.date),
        datasets: [{
            label: 'Invoice Growth',
            data: data.invoiceGrowth.map(entry => entry.invoiceCount),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const arpuGrowthLineData = {
        labels: data.arpuGrowth.map(entry => entry.date),
        datasets: [{
            label: 'ARPU Growth',
            data: data.arpuGrowth.map(entry => entry.averageRevenuePerUser),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const newUserOverTimeLineData = {
        labels: data.newUsersOverTime.map(entry => entry.date),
        datasets: [{
            label: 'New Users',
            data: data.newUsersOverTime.map(entry => entry.newUsers),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const monthlyRevenueGrowthLineData = {
        labels: data.revenueMonthlyGrowth.map(entry => {
            const month = new Date(`${entry.year}-${entry.month}`).toLocaleString('default', { month: 'long' });
            return month;
        }),
        datasets: [{
            label: 'Monthly Revenue Growth',
            data: data.revenueMonthlyGrowth.map(entry => entry.totalRevenue),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const weeklyRevenueGrowthLineData = {
        labels: data.revenueWeeklyGrowth.map(entry => entry.date),
        datasets: [{
            label: 'Weekly revenue',
            data: data.revenueWeeklyGrowth.map(entry => entry.totalRevenue),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const invoiceMonthlyGrowthLineData = {
        labels: data.invoicesMonthlyGrowth.map(entry => {
            const month = new Date(`${entry.year}-${entry.month}`).toLocaleString('default', { month: 'long' });
            return month;
        }),
        datasets: [{
            label: 'Monthly Invoice Growth',
            data: data.invoicesMonthlyGrowth.map(entry => entry.invoiceCount),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const weeklyInvoiceGrowthLineData = {
        labels: data.invoicesWeeklyGrowth.map(entry => entry.date),
        datasets: [{
            label: 'Weekly Invoice Growth',
            data: data.invoicesWeeklyGrowth.map(entry => entry.invoiceCount),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const arpuMonthlyGrowthLineData = {
        labels: data.invoicesMonthlyGrowth.map(entry => {
            const month = new Date(`${entry.year}-${entry.month}`).toLocaleString('default', { month: 'long' });
            return month;
        }),
        datasets: [{
            label: 'Monthly Invoice Growth',
            data: data.arpuMonthlyGrowth.map(entry => entry.averageRevenue),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }]
    }

    const weeklyArpuGrowthLineData = {
        labels: data.arpuWeeklyGrowth.map(entry => entry.date),
        datasets: [{
            label: 'Weekly Invoice Growth',
            data: data.arpuWeeklyGrowth.map(entry => entry.averageArpu),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4,
        }]
    }

    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    maxRotation: 0,  // Prevent label rotation
                    minRotation: 0   // Ensure labels are horizontal
                }
            }
        }
    };
    

    const lineData = {
        labels: data.userGrowth.map(entry => entry.date),
        datasets: [{
            label: 'User Growth',
            data: data.userGrowth.map(entry => entry.count),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
        }],
    };

    const pieData = {
        labels: ['Invoices This Month', 'Average Invoice Amount', 'Total Revenue'],
        datasets: [{
            label: 'Invoices Metrics',
            data: [data.invoicesThisMonth, data.averageInvoiceAmount, data.totalRevenue],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        }],
    };

    console.log("Bar data:", pieData);
    
    console.log(data.invoicesThisMonth);

    console.log(data.revenueGrowth);


    return (
        <Box p={5} bg='#000'>
            <Container maxW="7xl">
                <Heading mb={5} color='white' fontFamily={'Epilogue'} mt={2}>Dashboard</Heading>
                    <SimpleGrid columns={3} spacing={5}>
                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Users Metrics</Heading>
                        <Bar data={barData} color='white' fontFamily={'Epilogue'}  />
                    </Box>
                    
                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Invoices Metrics</Heading>
                        <Pie data={pieData} color='white' fontFamily={'Epilogue'}/>
                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Summary Stats</Heading>
                        <Stat>
                            <StatLabel color='white' fontFamily={'Epilogue'}>Daily Active Users</StatLabel>
                            <StatNumber color='white' fontFamily={'Epilogue'}>{data.dailyActiveUsers}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel color='white' fontFamily={'Epilogue'}>Monthly Active Users</StatLabel>
                            <StatNumber color='white' fontFamily={'Epilogue'}>{data.monthlyActiveUsers}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel color='white' fontFamily={'Epilogue'}>ARPU - Average Revenue per User</StatLabel>
                            <StatNumber color='white' fontFamily={'Epilogue'}>${data.arpu}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel color='white' fontFamily={'Epilogue'}>Weekly Active Users</StatLabel>
                            <StatNumber color='white' fontFamily={'Epilogue'}>{data.weeklyActiveUsers}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel color='white' fontFamily={'Epilogue'}>Monthly Retention Rate %</StatLabel>
                            <StatNumber color='white' fontFamily={'Epilogue'}>{data.monthlyRetentionRate}%</StatNumber>
                        </Stat>
                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>
                        <Heading size="md" color='white' fontFamily={'Epilogue'}>User Growth Over Time</Heading>
                        <Line data={lineData} options={chartOptions} />
                    </Box>


                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Revenue over time</Heading>
                        <br /> 
                        <Line data={revenueLineData} options={chartOptions} />


                    </Box>

                    

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Invoices</Heading>
                        <br /> 
                        <Line data={invoiceGrowthLineData} options={chartOptions} />


                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>ARPU GROWTH</Heading>
                        <br /> 
                        <Line data={arpuGrowthLineData} options={chartOptions}/>


                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>User Overtime</Heading>
                        <br /> 
                        <Line data={newUserOverTimeLineData} options={chartOptions}  />


                    </Box>

                    

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Monthly Revenue</Heading>
                        <br /> 
                        <Line data={monthlyRevenueGrowthLineData} options={chartOptions}  />


                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Weekly Revenue</Heading>
                        <br /> 
                        <Line data={weeklyRevenueGrowthLineData} options={chartOptions} />


                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Monthly Invoices</Heading>
                        <br /> 
                        <Line data={invoiceMonthlyGrowthLineData} options={chartOptions} />


                    </Box>

                    

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Weekly Invoices</Heading>
                        <br /> 
                        <Line data={weeklyInvoiceGrowthLineData} options={chartOptions} />


                    </Box>

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Monthly ARPU</Heading>
                        <br /> 
                        <Line data={arpuMonthlyGrowthLineData} options={chartOptions} />


                    </Box>

                    

                    <Box bg="rgba(0,0,0,.5)" p={5} borderRadius="1rem" border='1px solid hsl(240 3.7% 15.9%)'>

                        <Heading size="md" color='white' fontFamily={'Epilogue'}>Weekly ARPU</Heading>
                        <br /> 
                        <Line data={weeklyArpuGrowthLineData} options={chartOptions} />


                    </Box>

                    

                    </SimpleGrid>
                
            </Container>
        </Box>
    );
};

export default AdminDashboard;
