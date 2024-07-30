import { Button, Divider, Form, Input, Typography } from 'antd'
import React from 'react'
import { GoogleOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLogin }) {
    const onFinish = (values) => {
        axios.post('http://localhost:8000/api/Login', values)
            .then(response => {
                toast.success('Authentification effectuer !', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: { backgroundColor: 'green', color: 'white' },
                    bodyStyle: { fontSize: '16px' },
                    progressStyle: { backgroundColor: 'white' },
                });
                console.log(response.data);
                onLogin(response.data.token);
            })
            .catch(error => {
                if (error.response) {
                    // Erreur côté serveur (réponse avec un statut d'erreur)
                    const { data } = error.response;
                    toast.error(data.message || 'Erreur de connexion.', {
                        position: 'top-center',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { backgroundColor: 'red', color: 'white' },
                        bodyStyle: { fontSize: '16px' },
                        progressStyle: { backgroundColor: 'white' },
                    });
                } else {
                    // Erreur réseau ou autre
                    console.error('Erreur de connexion:', error.message);
                    toast.error('Erreur de connexion. Veuillez réessayer.', {
                        position: 'top-center',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { backgroundColor: 'red', color: 'white' },
                        bodyStyle: { fontSize: '16px' },
                        progressStyle: { backgroundColor: 'white' },
                    });
                }
            });
    };
    return (
        <div className='appLogin'>
            <Typography.Title>Bienvenu !</Typography.Title>
            <Form className='LoginForm' onFinish={onFinish}>
                <Form.Item
                    label='Nom utilisateur'
                    name={'nom'}
                    rules={[{ required: true, message: 'Veuillez entrer votre nom!' }]}
                >
                    <Input placeholder='entrer votre nom' />
                </Form.Item>
                <Form.Item
                    label="Mot de passe"
                    name="password"
                    rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
                >
                    <Input.Password placeholder="Entrer votre mot de passe" />
                </Form.Item>
                <Button type='primary' htmlType='submit' block>
                    Login
                </Button>
                <Divider style={{ borderColor: 'black' }}>creer une compter</Divider>
            </Form>
        </div>
    )
}

export default Login
