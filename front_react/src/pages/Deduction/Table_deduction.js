import React from 'react'
import { useEffect, useState } from 'react';
import Getdeduction from '../../API/Getdeduction';
import { Space, Table, Typography, Button, Popconfirm, Flex, Card, Statistic } from 'antd';
import Search from 'antd/es/transfer/search';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined } from '@ant-design/icons';
import Delete_deduction from '../../API/Delete_deduction';
import axios from 'axios';
import { motion } from 'framer-motion';

function Table_deduction() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [Ressource, setRessource] = useState([]);
  const [Finance, setFinance] = useState([]);
  const [Marketing, setMarketing] = useState([]);
  const [Ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selecteddeduction, setSelectedDeduction] = useState(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const { deduction, type } = await Getdeduction();
      if (searchText.trim() !== '') {
        const response = await axios.get(`http://127.0.0.1:8000/api/search_deductions?search=${encodeURIComponent(searchText)}`);
        setDataSource(response.data);
      } else {
        setDataSource(deduction);
      }
      setDataSource2(type);
      setLoading(false);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Rafraîchit toutes les 5 secondes
    return () => clearInterval(interval);
  }, [searchText]);

  const handleEdit = (deduction_id) => {
    const deduction = dataSource.find(emp => emp.deduction_id === deduction_id);
    setSelectedDeduction(deduction);
    navigate('/modif_deduction', { state: { deduction } });
  };
  
  const handleDelete = async (deduction_id) => {
    await Delete_deduction(deduction_id);
    fetchData(); // Rafraîchit les données après la suppression
  };
  
  const handleSearch = (value) => {
    setSearchText(value); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full p-6 bg-gray-50"
    >
      <motion.div 
        className="mb-8 text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Typography.Title level={4} className="text-2xl font-bold text-gray-800">Listes des employers par type de deduction</Typography.Title>
        <Flex align='center' gap="large" className="justify-center mt-4 w-full">
          <Space direction="horizontal" className="flex-wrap gap-4 w-full justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DashboardCard
                icon={<UserOutlined />}
                iconStyle={{
                  color: 'white',
                  backgroundColor: '#4F46E5',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                title="Assurance maladie"
                value={Ressource}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DashboardCard
                icon={<UserOutlined />}
                iconStyle={{
                  color: 'white',
                  backgroundColor: '#4F46E5',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                title="Cotisations de sécurité sociale"
                value={Finance}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DashboardCard
                icon={<UserOutlined />}
                iconStyle={{
                  color: 'white',
                  backgroundColor: '#4F46E5',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                title="avance sur salaire"
                value={Marketing}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DashboardCard
                icon={<UserOutlined />}
                iconStyle={{
                  color: 'white',
                  backgroundColor: '#4F46E5',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                title="Frais de deplacement"
                value={Ventes}
              />
            </motion.div>
          </Space>
        </Flex>
      </motion.div>

      <Space direction='horizontal' className="flex w-full gap-6 px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 w-full"
        >
          <Card className="shadow-lg rounded-lg w-full">
            <Space size={20} direction='vertical' className="w-full">
              <Typography.Title level={4} className="text-xl font-bold">Deduction</Typography.Title>
              <Link to="/Ajout_deduction" className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Ajouter
              </Link>
              <Search placeholder='recherche' allowClear onChange={(e) => handleSearch(e.target.value)} className="w-full max-w-md" />
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
                      <Space>
                        <Button 
                          className="hover:scale-105 transition-transform"
                          style={{ backgroundColor: 'white', color: 'orange' }} 
                          size="small" 
                          onClick={() => handleEdit(deduction_id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Popconfirm
                          title="Êtes-vous sûr de vouloir supprimer cet deduction ?"
                          onConfirm={() => handleDelete(deduction_id)}
                          okText="Oui"
                          cancelText="Non"
                        >
                          <Button 
                            className="hover:scale-105 transition-transform"
                            style={{ backgroundColor: 'white', color: 'red' }} 
                            size="small"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </Popconfirm>
                      </Space>
                    ),
                  },
                ]}
                loading={loading}
                dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
                pagination={{
                  pageSize: 5,
                }}
                className="overflow-x-auto shadow-sm rounded-lg w-full"
              />
            </Space>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1 w-full"
        >
          <Card className="shadow-lg rounded-lg w-full">
            <Typography.Title level={4} className="text-xl font-bold mb-4">Les deduction</Typography.Title>
            <Table
              columns={[
                { title: 'Type', dataIndex: "type" },
                { title: 'Coût', dataIndex: 'amount' },
              ]}
              loading={loading}
              dataSource={dataSource2.map((item, index) => ({ ...item, key: index }))}
              className="overflow-x-auto w-full"
            />
          </Card>
        </motion.div>
      </Space>
    </motion.div>
  )
}
function DashboardCard({ title, value, icon, iconStyle }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
      <Space>
        <Statistic 
          title={<span className="text-gray-600">{title}</span>}
          value={value}
          prefix={React.cloneElement(icon, { style: iconStyle })}
          className="font-semibold"
        />
      </Space>
    </Card>
  );
}

export default Table_deduction