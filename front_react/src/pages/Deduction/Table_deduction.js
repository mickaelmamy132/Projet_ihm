import React from 'react'
import { useEffect, useState } from 'react';
import Getdeduction from '../../API/Getdeduction';
import { Space, Table, Typography, Button, Popconfirm, Flex, Card, Statistic } from 'antd';
import Search from 'antd/es/transfer/search';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, HeartOutlined, SecurityScanOutlined, MonitorOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import Delete_deduction from '../../API/Delete_deduction';
import axios from 'axios';

function Table_deduction() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selecteddeduction, setSelectedDeduction] = useState(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('Valeur de searchText mise à jour :', searchText);

    const fetchData = async () => {
      setLoading(true);
      try {
        const { deduction, type } = await Getdeduction();
        setDataSource(deduction);
        setDataSource2(type);

        // Effectuer la recherche si searchText n'est pas vide
        if (searchText.trim() !== '') {
          const response = await axios.get(`http://127.0.0.1:8000/api/search_deductions?search=${encodeURIComponent(searchText)}`);
          setDataSource(response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
        setLoading(false); // Assurez-vous de toujours désactiver le chargement en cas d'erreur
      }
    };

    fetchData();
  }, [searchText]);


  const handleEdit = (deduction_id) => {
    const deduction = dataSource.find(emp => emp.deduction_id === deduction_id);
    setSelectedDeduction(deduction);
    navigate('/modif_deduction', { state: { deduction } });
  };
  const handleDelete = (deduction_id) => {
    Delete_deduction(deduction_id);
  };
  const handleSearch = (value) => {
    setSearchText(value); 
  };

  return (
    <div>
      <div style={{
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography.Title level={4}>Listes des employers par type de deduction</Typography.Title>
        <Flex align='center' gap="large" >
          <Space direction="horizontal">
            <DashboardCard
              icon={<HeartOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: '#121212',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Assurance maladie "
              value={10000}
            />

            <DashboardCard
              icon={<SecurityScanOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: '#121212',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Cotisations de sécurité sociale"
              value={12000}
            />
            <DashboardCard
              icon={<MonitorOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: '#121212',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="avance sur salaire"
              value={120000}
            />
            <DashboardCard
              icon={<DeploymentUnitOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: '#121212',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Frais de deplacement"
              value={20000}
            />
          </Space>
        </Flex>
      </div>
      <Space direction='horizontal' style={{ display: 'flex', height: '100%' }}>
        <Card style={{ flex: 1, padding: '10px', marginTop: '15px', overflow: 'hidden' }}>
          <Space size={20} direction='vertical' style={{ height: '100%' }}>
            <Typography.Title level={8}>Deduction</Typography.Title>
            <Link to="/Ajout_deduction" style={{
              background: 'green',
              padding: '10px',
              color: 'white',
              borderRadius: '10px'
            }}>
              Ajouter
            </Link>
            <Flex align='center' gap="3rem">
              <Search placeholder='recherche' allowClear onChange={(e) => handleSearch(e.target.value)} />
            </Flex>
            <Table
              columns={[
                {
                  title: 'Reference',
                  dataIndex: "deduction_id",
                },
                {
                  title: 'matricule',
                  dataIndex: "employe_id",
                },
                {
                  title: 'Nom et prénom',
                  dataIndex: '',
                  render: (text, record) => `${record.Nom} ${record.Prenom}`
                },
                {
                  title: 'type de deduction',
                  dataIndex: "deduction_types",
                },
                {
                  title: 'Coût',
                  dataIndex: "deduction_amount",
                },
                {
                  title: 'date deduction',
                  dataIndex: "deduction_date",
                },
                {
                  title: 'Actions',
                  dataIndex: 'deduction_id',
                  render: (deduction_id) => (
                    <>
                      <Button style={{ backgroundColor: 'white', color: 'orange' }} size="small" onClick={() => handleEdit(deduction_id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>{' '}
                      <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer cet deduction ?"
                        onConfirm={() => handleDelete(deduction_id)}
                        okText="Oui"
                        cancelText="Non"
                      >
                        <Button style={{ backgroundColor: 'white', color: 'red' }} size="small">
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </Popconfirm>
                    </>
                  ),
                },
              ]}
              loading={loading}
              dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
              pagination={{
                pageSize: 5,
              }}
              style={{ overflow: 'scroll', maxHeight: '400px' }}
            ></Table>
          </Space>
        </Card>

        <Card style={{ padding: '10px', marginTop: '-100px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography.Title level={8}>Les deduction</Typography.Title>
          <Table
            columns={[
              { title: 'Type', dataIndex: "type" },
              { title: 'Coût', dataIndex: 'amount' },
            ]}
            loading={loading}
            dataSource={dataSource2.map((item, index) => ({ ...item, key: index }))}
            style={{ flex: 1, overflowY: 'auto' }}
          />
        </Card>

      </Space>
    </div>
  )
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


export default Table_deduction
