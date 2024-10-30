import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import GetPayement from '../../API/GetPayement';
import { Space, Button, Table, Typography, Card, Row, Col, Statistic, Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faMoneyBillWave, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import PaymentModale from '../Action_payement/PaymentModale';
import { motion } from 'framer-motion';

function Table_payement() {
    const [dataSource, setDataSource] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handlePrint = (id) => {
        const paymentDetails = filteredData.find(item => item.id === id);
        setSelectedPaymentDetails(paymentDetails);
        showModal();
    };

    const filterData = () => {
        const filtered = dataSource.filter(payment => {
            const paymentDate = new Date(payment.payment_date);
            return paymentDate.getMonth() + 1 === selectedMonth && 
                   paymentDate.getFullYear() === selectedYear;
        });
        setFilteredData(filtered);
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

    useEffect(() => {
        filterData();
    }, [dataSource, selectedMonth, selectedYear]);

    const months = [
        { value: 1, label: 'Janvier' },
        { value: 2, label: 'Février' },
        { value: 3, label: 'Mars' },
        { value: 4, label: 'Avril' },
        { value: 5, label: 'Mai' },
        { value: 6, label: 'Juin' },
        { value: 7, label: 'Juillet' },
        { value: 8, label: 'Août' },
        { value: 9, label: 'Septembre' },
        { value: 10, label: 'Octobre' },
        { value: 11, label: 'Novembre' },
        { value: 12, label: 'Décembre' }
    ];

    const years = Array.from({ length: 10 }, (_, i) => ({
        value: new Date().getFullYear() - i,
        label: (new Date().getFullYear() - i).toString()
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                margin: '20px 100px',
                borderRadius: '8px',
            }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card style={{ background: 'linear-gradient(135deg, #1890ff, #096dd9)' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Total des paiements</span>}
                                value={filteredData.length}
                                prefix={<FontAwesomeIcon icon={faMoneyBillWave} />}
                                valueStyle={{ color: 'white' }}
                            />
                        </Card>
                    </motion.div>
                </Col>
                <Col span={8}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card style={{ background: 'linear-gradient(135deg, #52c41a, #389e0d)' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Employés payés</span>}
                                value={filteredData.length}
                                prefix={<FontAwesomeIcon icon={faUsers} />}
                                valueStyle={{ color: 'white' }}
                            />
                        </Card>
                    </motion.div>
                </Col>
                <Col span={8}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Card style={{ background: 'linear-gradient(135deg, #722ed1, #531dab)' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Total des salaires</span>}
                                value={filteredData.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0)}
                                prefix={<FontAwesomeIcon icon={faChartLine} />}
                                valueStyle={{ color: 'white' }}
                            />
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            <Card style={{ marginTop: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Space size={20} direction='vertical' style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography.Title level={4} style={{ margin: 0 }}>Gestion des Paiements</Typography.Title>
                        <Space>
                            <Select
                                defaultValue={selectedMonth}
                                style={{ width: 120 }}
                                onChange={value => setSelectedMonth(value)}
                                options={months}
                            />
                            <Select
                                defaultValue={selectedYear}
                                style={{ width: 100 }}
                                onChange={value => setSelectedYear(value)}
                                options={years}
                            />
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Link to="/Payement" style={{
                                    background: 'linear-gradient(135deg, #52c41a, #389e0d)',
                                    padding: '12px 24px',
                                    color: 'white',
                                    borderRadius: '6px',
                                    display: 'inline-block',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                }}>
                                    + Nouveau Paiement
                                </Link>
                            </motion.div>
                        </Space>
                    </div>

                    <Table
                        columns={[
                            {
                                title: 'Reference',
                                dataIndex: "id",
                            },
                            {
                                title: 'Matricule Employer',
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
                                title: 'Date de paiement',
                                dataIndex: "payment_date",
                            },
                            {
                                title: 'Actions',
                                dataIndex: 'id',
                                render: (id) => (
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <PaymentModale isVisible={isModalVisible} onCancel={handleCancel} paymentDetails={selectedPaymentDetails} />
                                        <Button 
                                            style={{ 
                                                background: 'linear-gradient(135deg, #1890ff, #096dd9)',
                                                color: 'white',
                                                border: 'none'
                                            }} 
                                            size="middle" 
                                            onClick={() => handlePrint(id)}
                                        >
                                            <FontAwesomeIcon icon={faPrint} /> Imprimer
                                        </Button>
                                    </motion.div>
                                ),
                            },
                        ]}
                        loading={loading}
                        dataSource={filteredData.map((item, index) => ({ ...item, key: index }))}
                        pagination={{
                            pageSize: 5,
                            style: { marginTop: '20px' }
                        }}
                    />
                </Space>
            </Card>
        </motion.div>
    )
}

export default Table_payement