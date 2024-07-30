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

  useEffect(() => {
    console.log('Valeur de searchText mise à jour :', searchText);
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

        if(searchText.trim() !== '') {
          const response = await axios.get(`http://127.0.0.1:8000/api/search_employers?search=${encodeURIComponent(searchText)}`);
          setDataSource(response.data);
        }
        setLoading(false);
      }
      catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    };
    fetchData()
  }, [searchText]);

  const handleDelete = (ID_employer) => {
    Delete_employer(ID_employer);
  };
  const handleSearch = (value) => {
    setSearchText(value); // Met à jour searchText à chaque changement dans le champ de recherche
  };


  return (
    <div>
      <div style={{
        marginTop: '5px',
        textAlign: 'center'
      }}>
        <Typography.Title level={4}>Listes des employer par type de departement</Typography.Title>
        <Flex align='center' gap="large" >
          <Space direction="horizontal">
            <DashboardCard
              icon={<UserOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: 'rgb(210,0,0,1)',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Ressources Humaines"
              value={Ressource}
            />

            <DashboardCard
              icon={<UserOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: 'rgb(210,0,0,1)',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Finances"
              value={Finance}
            />
            <DashboardCard
              icon={<UserOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: 'rgb(210,0,0,1)',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Marketing"
              value={Marketing}
            />
            <DashboardCard
              icon={<UserOutlined />}
              iconStyle={{
                color: 'white',
                backgroundColor: 'rgb(210,0,0,1)',
                borderRadius: '8px',
                padding: '10px'
              }}
              title="Ventes"
              value={Ventes}
            />
          </Space>
        </Flex>
      </div>
      <Space direction='horizontal' style={{ display: 'flex', height: '100%' }}>
        <Card style={{ flex: 1, padding: '10px', marginTop: '15px', overflow: 'hidden' }}>
          <Space size={20} direction='vertical' style={{ height: '100%' }}>
            <Typography.Title level={4}>Employer</Typography.Title>
            <Link to="/Ajout_employer" style={{
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
                      style={{
                        maxWidth: '90px',
                        maxHeight: '9 --0px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
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
                    <>

                      <Button style={{ backgroundColor: 'white', color: 'blue' }} size="small" onClick={() => handleview(ID_employer)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>{' '}
                      <Button style={{ backgroundColor: 'white', color: 'orange' }} size="small" onClick={() => handleEdit(ID_employer)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>{' '}
                      <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer cet employé ?"
                        onConfirm={() => handleDelete(ID_employer)}
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
            />
          </Space>
        </Card>

        <Card style={{ padding: '10px', marginTop: '-100px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography.Title level={8}>Departements</Typography.Title>
          <Table
            columns={[
              { title: 'Departement', dataIndex: "nom_departement" },
              { title: 'salaire', dataIndex: 'salaire' },
            ]}
            loading={loading}
            dataSource={dataSource2.map((item, index) => ({ ...item, key: index }))}
            style={{ flex: 1, overflowY: 'auto' }}
          />
        </Card>
      </Space>

    </div >
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

export default Employer;
