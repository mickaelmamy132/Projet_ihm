import { Card, Space, Statistic } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography'
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';
import GetDash from '../../API/GetDash';

function Dashboard() {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const [countsEmployer, setcountsEmployer] = useState([]);
  const [Resource, setResource] = useState([]);
  const [Finance, setFinance] = useState([]);
  const [Marketing, setMarketing] = useState([]);
  const [Ventes, setVentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { counts, countsEmployer, deductions, count_employers_Ressource, count_employers_finance, count_employers_marketing, count_employers_ventes } = await GetDash();
        setcountsEmployer(countsEmployer);
        // pour graphe1
        const labels = counts.map(count => count.deduction_type);
        const data = counts.map(count => count.employee_count);

        // pour graphe2
        const labels2 = deductions.map(count => count.deduction_type);
        const data2 = deductions.map(count => count.total_deduction_amount);

        setResource(count_employers_Ressource);
        setFinance(count_employers_finance);
        setMarketing(count_employers_marketing);
        setVentes(count_employers_ventes);

        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Nombre d\'employés par type de déduction',
                data: data,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                tension: 0.4
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(200, 200, 200, 0.2)'
                }
              },
              x: {
                grid: {
                  color: 'rgba(200, 200, 200, 0.2)'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            animation: {
              duration: 2000,
              easing: 'easeInOutQuart'
            }
          },
        });

        const ctx2 = chartRef2.current.getContext('2d');
        const myChart2 = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: labels2,
            datasets: [
              {
                label: 'Total',
                data: data2,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 2000
            }
          },
        });

        return () => {
          myChart.destroy();
          myChart2.destroy();
        };
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: "", marginTop: '-15px', padding: '20px' }}
    >
      <motion.div
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography.Title level={4}>Dashboard</Typography.Title>
      </motion.div>

      <motion.div
        style={{
          width: '100%',
          marginLeft: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <Space direction="horizontal" size={20} wrap>
          {[
            { title: "Effectifs de tous les employers", value: countsEmployer },
            { title: "Resource humaine", value: Resource },
            { title: "Finance", value: Finance },
            { title: "Marketing", value: Marketing },
            { title: "Ventes", value: Ventes }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <DashboardCard
                icon={<UserOutlined />}
                iconStyle={{
                  color: 'white',
                  backgroundColor: '#121212',
                  borderRadius: '8px',
                  padding: '10px'
                }}
                title={item.title}
                value={item.value}
              />
            </motion.div>
          ))}
        </Space>
      </motion.div>

      <motion.div
        className="test"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '50px', // réduit l'espace entre les graphiques
          marginTop: '50px',
          width: '100%',
        }}
      >
       <div className='flex' style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
       <motion.div
          className="canvas-container"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
            fontWeight: 600
          }}>
            Statistique des payments
          </h3>
          <canvas ref={chartRef}></canvas>
        </motion.div>

        <motion.div
          className='canvas-container2'
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
            fontWeight: 600
          }}>
            Totale par chaque deduction en (ARIARY)
          </h3>
          <canvas ref={chartRef2}></canvas>
        </motion.div>
       </div>
      </motion.div>


    </motion.div>
  );
}

function DashboardCard({ title, value, icon, iconStyle }) {
  return (
    <Card
      style={{
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '200px'
      }}
    >
      <Space>
        <Statistic
          title={<span style={{ fontSize: '14px', color: '#666' }}>{title}</span>}
          value={value}
          prefix={React.cloneElement(icon, { style: { ...iconStyle, transition: 'all 0.3s' } })}
          valueStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#121212' }}
        />
      </Space>
    </Card>
  );
}

export default Dashboard