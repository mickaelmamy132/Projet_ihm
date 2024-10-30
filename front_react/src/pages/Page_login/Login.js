import { Button, Divider, Form, Input, Typography } from 'antd'
import React from 'react'
import { GoogleOutlined } from "@ant-design/icons";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

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
        <motion.div 
            className='appLogin min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >













            <div className="flex w-full max-w-6xl">
                {/* Section gauche */}
                <motion.div




                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center pr-12"
                >










                    <img 
                        src="/login-illustration.svg" 
                        alt="Login illustration" 
                        className="w-full max-w-md mb-8"
                    />
                    <motion.div


                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}

                        className="text-center"
                    >







                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Bienvenue sur notre plateforme
                        </h2>
                        <p className="text-lg text-gray-600">
                            Connectez-vous pour accéder à toutes nos fonctionnalités
                        </p>
                    </motion.div>

                </motion.div>

                {/* Section droite - Formulaire de connexion */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="login-container w-full lg:w-1/2 max-w-md space-y-8"
                    style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '15px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        margin: '0 auto'
                    }}
                >
                    <motion.div




                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="sm:mx-auto sm:w-full sm:max-w-md"
                    >







                        <Typography.Title style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            Bienvenue !
                        </Typography.Title>
                    </motion.div>






                    <Form 
                        className='LoginForm mt-8 space-y-6' 
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >










                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
















                            <Form.Item
                                label='Nom utilisateur'
                                name={'nom'}
                                rules={[{ required: true, message: 'Veuillez entrer votre nom!' }]}
                            >
                                <Input placeholder='Entrer votre nom' className="w-full px-3 py-2 border rounded-md" />
                            </Form.Item>
                        </motion.div>
                        
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <Form.Item
                                label="Mot de passe"
                                name="password"
                                rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
                            >
                                <Input.Password placeholder="Entrer votre mot de passe" className="w-full px-3 py-2 border rounded-md" />
                            </Form.Item>
                        </motion.div>
                        
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6"
                        >
                            <Button 
                                type='primary' 
                                htmlType='submit' 
                                block
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                                style={{
                                    height: '40px',
                                    fontSize: '16px',
                                    marginTop: '1rem'
                                }}
                            >
                                Se connecter
                            </Button>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8"
                        >
                            <Divider style={{ borderColor: '#d9d9d9', margin: '2rem 0' }}>
                                Créer un compte
                            </Divider>
                        </motion.div>
                    </Form>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Login