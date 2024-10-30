import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { motion } from 'framer-motion';


function InfosEmployer() {
    const location = useLocation();
    const employe = location.state.employe;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: '30px', alignItems: 'center' }}>

            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '25px',
                    marginBottom: '10px',
                    width: '100%',
                    padding: '20px',
                    justifyContent: 'center'
                }}>
                <div style={{
                    flex: '1 1 250px',
                    backgroundColor: '#ffffff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease'
                }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '1.3rem' }}>Informations Importantes</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Cet employé fait partie de notre équipe depuis plusieurs années.</p>
                </div>
                <div style={{
                    flex: '1 1 250px',
                    backgroundColor: '#ffffff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease'
                }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '1.3rem' }}>Compétences</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Expert dans son domaine avec de nombreuses réalisations.</p>
                </div>
                <div style={{
                    flex: '1 1 250px',
                    backgroundColor: '#ffffff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease'
                }}>
                    <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: '1.3rem' }}>Réalisations</h3>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>A contribué à plusieurs projets majeurs de l'entreprise.</p>
                </div>
            </motion.div>


            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    backgroundColor: '#ffffff',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    width: '100%',
                    maxWidth: '800px',
                    justifyContent: 'center'
                }}>
                {employe.image && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                            overflow: 'hidden',
                            width: '200px',
                            height: '180px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '25px',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)'
                        }}>
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            src={employe.image_url}
                            alt="Employé"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }} />
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    padding: '25px',
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                    marginBottom: '80px'
                }}>
                <Row gutter={[24, 24]}>
                    {Object.entries(employe).map(([key, value]) => (
                        key !== 'image' && key !== 'created_at' && key !== 'updated_at' && key !== 'Poste' && key !== 'Departement' && !key.startsWith('image_url') && (
                            <Col key={key} span={12}>
                                <motion.div
                                    whileHover={{ scale: 1.03, backgroundColor: '#f8f9fa' }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '15px',
                                        backgroundColor: '#f8f9fa',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                    <strong style={{ color: '#1a73e8', fontSize: '16px', display: 'block', marginBottom: '8px' }}>{key}:</strong>
                                    <div style={{ fontSize: '15px', color: '#333', lineHeight: '1.5' }}>{value}</div>
                                </motion.div>
                            </Col>
                        )
                    ))}
                </Row>
                <Link to="/Employer">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ cursor: 'pointer' }}
                       >
                        <Button
                            type="danger"
                            style={{
                                padding: '12px 30px',
                                height: 'auto',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                borderRadius: '12px',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: '600',
                                boxShadow: '0 6px 15px rgba(220, 53, 69, 0.3)',
                                transition: 'all 0.3s ease',
                                marginTop: '20px',
                            }}
                            hover={{
                                backgroundColor: '#c82333'
                            }}
                        >
                            Retour
                        </Button>
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    )}
export default InfosEmployer