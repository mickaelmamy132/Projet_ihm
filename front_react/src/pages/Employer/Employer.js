import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getEmployer from '../../API/getEmployer'
import Delete_employer from '../../API/Delete_employer'
import { Space, Button, Table, Typography, Popconfirm, Card, Flex, Statistic } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import Search from 'antd/es/transfer/search';
import axios from 'axios';
import { motion } from 'framer-motion';

function Employer() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [Ressource, setRessource] = useState([]);
  const [Finance, setFinance] = useState([]);
  const [Marketing, setMarketing] = useState([]);
  const [Ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');

  const handleEdit = (ID_employer) => {
    const employe = dataSource.find(emp => emp.ID_employer === ID_employer);
    setSelectedEmploye(employe);
    navigate('/modif_employer', { state: { employe } });
  };

  const handleview = (ID_employer) => {
    const employe = dataSource.find(emp => emp.ID_employer === ID_employer);
    setSelectedEmploye(employe);
    navigate('/view_employer', { state: { employe } });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { employers, departe, count_employers_Ressource, count_employers_finance, count_employers_marketing, count_employers_ventes } = await getEmployer();
      setDataSource(employers);
      setDataSource2(departe);
      setRessource(count_employers_Ressource);
      setFinance(count_employers_finance);
      setMarketing(count_employers_marketing);
      setVentes(count_employers_ventes);

      if (searchText.trim() !== '') {
        const response = await axios.get(`http://127.0.0.1:8000/api/search_employers?search=${encodeURIComponent(searchText)}`);
        setDataSource(response.data);
      }
    }
    catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchText]);


  const handleDelete = async (ID_employer) => {
    await Delete_employer(ID_employer, navigate);
    fetchData();
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 pt-2 bg-gray-50"
    >
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Typography.Title level={4} className="text-2xl font-bold text-gray-800">
          Listes des employer par type de departement
        </Typography.Title>
        <Flex align='center' gap="large" className="justify-center mt-3">
          <Space direction="horizontal" className="flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DashboardCard
                icon={<UserOutlined />}
                iconStyle={{
                  color: 'white',
                  backgroundColor: '#4F46E5',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                title="Ressources Humaines"
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
                title="Finances"
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
                title="Marketing"
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
                title="Ventes"
                value={Ventes}
              />
            </motion.div>
          </Space>
        </Flex>
      </motion.div>

      <Space direction='horizontal' className="flex w-full gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <Card className="shadow-lg rounded-lg">
            <Space size={20} direction='vertical' className="w-full">
              <Typography.Title level={4} className="text-xl font-bold">Employer</Typography.Title>
              <Link to="/Ajout_employer" className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Ajouter
              </Link>
              <Search
                placeholder='recherche'
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full max-w-md"
              />
              <Table
                columns={[
                  {
                    title: 'Matricule',
                    dataIndex: "ID_employer",
                  },
                  {
                    title: 'Photo',
                    dataIndex: 'image_url',
                    render: (image_url) => (
                      <img
                        src={image_url}
                        alt="Employé"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ),
                  },
                  {
                    title: 'Nom',
                    dataIndex: "Nom",
                  },
                  {
                    title: 'Prenom',
                    dataIndex: "Prenom",
                  },
                  {
                    title: 'Adresse',
                    dataIndex: "Adresse",
                  },
                  {
                    title: 'Numero',
                    dataIndex: "Tel",
                  },
                  {
                    title: 'Departement',
                    dataIndex: "nom_departement",
                  },
                  {
                    title: 'Poste',
                    dataIndex: "nom_poste",
                  },
                  {
                    title: 'Actions',
                    dataIndex: 'ID_employer',
                    render: (ID_employer) => (
                      <Space>
                        <Button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleview(ID_employer)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Button
                          className="text-orange-600 hover:text-orange-800"
                          onClick={() => handleEdit(ID_employer)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Popconfirm
                          title="Êtes-vous sûr de vouloir supprimer cet employé ?"
                          onConfirm={() => handleDelete(ID_employer)}
                          okText="Oui"
                          cancelText="Non"
                        >
                          <Button className="text-red-600 hover:text-red-800">
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
                  pageSize: 3,
                }}
                // className="overflow-x-auto"
                // scroll={{ y: 400 }}
              />
            </Space>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1"
        >
          <Card className="shadow-lg rounded-lg">
            <Typography.Title level={4} className="text-xl font-bold mb-4">Departements</Typography.Title>
            <Table
              columns={[
                { title: 'Departement', dataIndex: "nom_departement" },
                { title: 'salaire', dataIndex: 'salaire' },
              ]}
              loading={loading}
              dataSource={dataSource2.map((item, index) => ({ ...item, key: index }))}
              className="overflow-x-auto"
            />
          </Card>
        </motion.div>
      </Space>
    </motion.div>
  );
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

export default Employer;