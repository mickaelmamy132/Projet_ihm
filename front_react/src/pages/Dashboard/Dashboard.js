import { Card, Space, Statistic, Icon } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography'
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { faBorderStyle } from '@fortawesome/free-solid-svg-icons';
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
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
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
                  'rgba(255, 99, 132, 0.5)',   // Rouge
                  'rgba(54, 162, 235, 0.5)',   // Bleu
                  'rgba(255, 206, 86, 0.5)',   // Jaune
                  'rgba(75, 192, 192, 0.5)',   // Vert
                  'rgba(153, 102, 255, 0.5)',  // Violet
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
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
    <div style={{ background: "", marginTop: '-15px' }}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <div style={{ width: '100%', marginLeft: '15px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space direction="horizontal">
          <DashboardCard
            icon={<UserOutlined />}
            iconStyle={{
              color: 'white',
              backgroundColor: '#121212',
              borderRadius: '8px',
              padding: '10px'
            }}
            title="Effectifs de tous les employers"
            value={countsEmployer}
          />


          <DashboardCard
            icon={<UserOutlined />}
            iconStyle={{
              color: 'white',
              backgroundColor: '#121212',
              borderRadius: '8px',
              padding: '10px'
            }}
            title="Resource humaine"
            value={Resource} />

          <DashboardCard
            icon={<UserOutlined />}
            iconStyle={{
              color: 'white',
              backgroundColor: '#121212',
              borderRadius: '8px',
              padding: '10px'
            }}
            title="Finance"
            value={Finance} />

          <DashboardCard
            icon={<UserOutlined />}
            iconStyle={{
              color: 'white',
              backgroundColor: '#121212',
              borderRadius: '8px',
              padding: '10px'
            }}
            title="Marketing"
            value={Marketing} />

          <DashboardCard
            icon={<UserOutlined />}
            iconStyle={{
              color: 'white',
              backgroundColor: '#121212',
              borderRadius: '8px',
              padding: '10px'
            }}
            title="Ventes"
            value={Ventes} />
        </Space>
      </div>
      <div className="test">
        <div className="canvas-container">
          <h3
            style={{
              textAlign: 'center',
              textDecoration: 'underline',
            }}>Statistique des payments</h3>
          <canvas ref={chartRef}></canvas>
        </div>
        <div className='canvas-container2'>
          <h3 style={{
            textAlign: 'center',
            textDecoration: 'underline',
          }}
          >totale par chaque deduction en (ARIARY)</h3>
          <canvas ref={chartRef2}></canvas>
        </div>
      </div>


    </div>
  );
}
function DashboardCard({ title, value, icon, iconStyle }) {
  return (
    <Card direction="horizontal">
      <Space>
        <Statistic title={title} value={value} prefix={React.cloneElement(icon, { style: iconStyle })} />
      </Space>
    </Card>
  );
}

export default Dashboard
