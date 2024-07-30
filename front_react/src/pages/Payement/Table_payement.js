import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetPayement from '../../API/GetPayement';
import { Space, Button, Table, Typography, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import PaymentModale from '../Action_payement/PaymentModale';

function Table_payement() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePrint = (id) => {
        const paymentDetails = dataSource.find(item => item.id === id);
        setSelectedPaymentDetails(paymentDetails);
        showModal();
    };

    useEffect(() => {
        setLoading(true);
        GetPayement().then((res) => {
            setDataSource(res);
            setLoading(false);
        }).catch((error) => {
            console.error('Une erreur s\'est produite lors de la récupération des employés :', error);
            setLoading(false);
        });
    }, []);

    return (
        <div style={{
            marginLeft: '100px',
            marginTop: '15px',
            borderRadius: '8px',
            alignItems: 'center'
        }}>
            <Space direction='horizontal' style={{ display: 'flex', height: '100%' }}>
             <Card style={{ flex: 1, padding: '10px', marginTop: '10px', overflow: 'hidden' }}>
             <Space size={20} direction='vertical'>
                <Typography.Title level={4}>Payement</Typography.Title>
                <Link to="/Payement" style={{
                    background: 'green',
                    padding: '10px',
                    color: 'white',
                    borderRadius: '10px'
                }}>
                    Ajouter
                </Link>
                <Table
                    columns={[
                        // {
                        //   title: 'photo',
                        //   dataIndex: "photo",
                        // },
                        {
                            title: 'Reference',
                            dataIndex: "id",
                        },
                        {
                            title: 'matricule Employer',
                            dataIndex: "employer_id",
                        },
                        {
                            title: 'Salaire',
                            dataIndex: "salaire",
                        },
                        {
                            title: 'Type de deduction',
                            dataIndex: "deduction",
                        },
                        {
                            title: 'Salaire net',
                            dataIndex: "amount",
                        },
                        {
                            title: 'payment_date',
                            dataIndex: "payment_date",
                        },
                        {
                            title: 'Actions',
                            dataIndex: 'id',
                            render: (id) => (
                                <>
                                    <PaymentModale isVisible={isModalVisible} onCancel={handleCancel} paymentDetails={selectedPaymentDetails} />
                                    <Button style={{ backgroundColor: 'white', color: 'blue' }} size="small" onClick={() => handlePrint(id)}>
                                        <FontAwesomeIcon icon={faPrint} /> Imprimer
                                    </Button>
                                </>
                            ),
                        },
                    ]}
                    loading={loading}
                    dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
                    pagination={{
                        pageSize: 5,
                    }}
                ></Table>
            </Space> 
            </Card> 
            </Space>  
        </div>
    )
}

export default Table_payement
