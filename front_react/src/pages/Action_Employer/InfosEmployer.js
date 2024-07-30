import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

function InfosEmployer() {
    const location = useLocation();
    const employe = location.state.employe;


    return (
        <div style={{
            maxWidth: '500px',
            height: 'auto',
            backgroundColor: '#fff',
            padding: '50px',
            marginLeft: '300px',
            marginTop: '20px',
            borderRadius: '8px',
            alignItems: 'center'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {employe.image && (
                    <div style={{
                        overflow: 'hidden',
                        width: '200px',
                        height: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img src={employe.image_url} alt="Employé" style={{
                            maxWidth: '100%',
                            maxHeight: '100%'
                        }} />
                    </div>
                )}
            </div>


            <div style={{
                width: '510px',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px'
            }}>
                <Row gutter={[10, 10]}>
                    {Object.entries(employe).map(([key, value]) => (
                        key !== 'image' && key !== 'created_at' && key !== 'updated_at' && key !== 'Poste' && key !== 'Departement' && !key.startsWith('image_url') && (
                            <Col key={key} span={12}>
                                <div>
                                    <strong>{key}:</strong> {value}
                                </div>
                            </Col>
                        )
                    ))}
                </Row>

                <Link to="/Employer">
                    <Button
                        type="danger"
                        style={{
                            marginRight: '35px',
                            backgroundColor: 'rgb(200, 0, 0, 2)',
                            color: 'white',
                            marginTop: '30px'
                        }}
                    >
                        retour
                    </Button>
                </Link>
            </div>


        </div>

    )
}

export default InfosEmployer
