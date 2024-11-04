import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button, Form, Typography, PlusOutlined, DatePicker, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'dayjs/locale/fr';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import getEmployer from '../../API/getEmployer';
import { Select } from 'antd';



const Modifier_employer = () => {
    const location = useLocation();
    const employe = location.state?.employe;
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [selectedImage, setSelectedImage] = useState(employe?.image_url || null);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [dataSource2, setDataSource2] = useState([]);
    const [postes, setPostes] = useState([]);
    const [selectedDepartement, setSelectedDepartement] = useState(null);
    const [selectedPoste, setSelectedPoste] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { departe } = await getEmployer();
                setDataSource2(departe);
            } catch (error) {
                toast.error("Erreur lors de la récupération des départements", { position: 'top-center' });
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (employe) {
            form.setFieldsValue({
                ...employe,

                Departement:employe.Departement,
                Poste: employe.Poste
            });
            setSelectedDepartement(employe.Departement);
            setSelectedPoste(employe.Poste);
        }
    }, [employe, form]);

    const handleDepartementChange = async (value) => {
        setSelectedDepartement(value);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/postes/${value}`);
            setPostes(response.data.postes);
        } catch (error) {
            toast.error('Erreur lors de la récupération des postes');
        }
    };

    const handleImageChange = (info) => {
        if (info.file) {
            const imageURL = URL.createObjectURL(info.file.originFileObj);
            setSelectedImage(imageURL);
            setIsImageChanged(true);
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const handleSubmit = async (values) => {
        try {
            if (employe && employe.ID_employer) {
                const formData = new FormData();

                // Parcourir toutes les valeurs du formulaire
                Object.keys(values).forEach((key) => {
                    if (values[key] !== undefined && values[key] !== null) {
                        // Ajouter l'image uniquement si elle a été modifiée
                        if (key === 'image' && isImageChanged && values[key][0]?.originFileObj) {
                            formData.append(key, values[key][0].originFileObj);
                        } else if (key !== 'image') {
                            formData.append(key, values[key]);
                        }
                    }
                });

                // Ajouter l'ID de l'employé
                formData.append('ID_employer', employe.ID_employer);

                // Afficher les données pour vérifier leur contenu avant l'envoi
                formData.forEach((value, key) => {
                    console.log(`${key}: ${value}`);
                });

                try {
                    const response = await axios.post(`http://127.0.0.1:8000/api/modif_employer/${employe.ID_employer}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    toast.success('modification réussi!', {
                        position: 'top-center',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { backgroundColor: 'green', color: 'white' },
                        bodyStyle: { fontSize: '16px' },
                        progressStyle: { backgroundColor: 'white' },
                        onClose: () => navigate('/Employer'),
                    });

                } catch (error) {
                    console.error("Erreur lors de la modification :", error);
                }
            } else {
                console.error('Erreur : ID de l\'employé non défini');
            }
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '50px', margin: '20px', flexWrap: 'wrap' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px',
                    flex: '0 1 400px',
                    height: 'fit-content',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef'
                }}>
                <Typography.Text strong style={{ fontSize: '18px', color: '#2c3e50' }}>
                    Ce formulaire vous permet d'ajouter un nouvel employé dans le système. Vous pouvez:
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                        <li>Saisir les informations personnelles</li>
                        <li>Ajouter une photo d'identité</li>
                        <li>Spécifier le poste et le département</li>
                        <li>Définir le salaire et les conditions de travail</li>
                    </ul>
                </Typography.Text>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='ajout_employe'
                style={{
                    flex: '1',
                    maxWidth: '850px',
                    height: '600px',
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '8px',
                    position: 'relative',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>

                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Typography.Title>Champ formulaire modification</Typography.Title>
                </motion.div>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={employe}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Row gutter={[5, 5]}>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Form.Item
                                    label="Image"
                                    name="image"
                                >
                                    <Upload
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        extra="Formats acceptés: JPG, PNG, GIF. Taille maximale: 100Mo"
                                        listType="picture-card"
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={(info) => {
                                            if (info.file) {
                                                handleImageChange(info.file);
                                            }
                                        }}
                                    >
                                        {selectedImage ? (
                                            <img src={selectedImage} alt="Employé" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                        ) : (
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>Ajouter une image</div>
                                            </div>
                                        )}
                                    </Upload>
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <Form.Item
                                    label="Nom"
                                    name="Nom"
                                    rules={[{ required: true, message: 'Le nom est requis' }]}
                                >
                                    <Input placeholder="Nom" />
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Form.Item
                                    label="Prénom"
                                    name="Prenom"
                                    rules={[{ required: true, message: 'Le prénom est requis' }]}
                                >
                                    <Input placeholder="Prénom" />
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Form.Item
                                    label="Adresse"
                                    name="Adresse"
                                    rules={[{ required: true, message: 'L\'adresse est requise' }]}
                                >
                                    <Input placeholder="Adresse" />
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <Form.Item
                                    label="Telephone"
                                    name="Tel"
                                    rules={[{ required: true, message: 'Le numero est requis' }]}
                                >
                                    <Input placeholder="numero" />
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Form.Item
                                    label="Email"
                                    name="Email"
                                    rules={[{ required: true, message: 'Le Email est requis' }]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                <Form.Item
                                    label="Département"
                                    name="Departement"
                                    rules={[{ required: true, message: 'Département est requis' }]}
                                >
                                    <Select
                                        placeholder="Sélectionner un département"
                                        value={selectedDepartement} // Utilisation de selectedDepartement pour la valeur
                                        onChange={handleDepartementChange}
                                    >
                                        {dataSource2.map(dep => (
                                            <Select.Option key={dep.id} value={dep.id}>
                                                {dep.nom_departement}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </motion.div>
                        </Col>

                        <Col span={12}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <Form.Item
                                    label="Poste"
                                    name="Poste"
                                    rules={[{ required: true, message: 'Poste est requis' }]}
                                >
                                    <Select
                                        placeholder="Sélectionner un poste"
                                        value={selectedPoste} // Utilisation de selectedPoste pour la valeur
                                        onChange={(value) => {
                                            setSelectedPoste(value);
                                            form.setFieldValue('Poste', value);
                                        }}
                                    >
                                        {postes.map(poste => (
                                            <Select.Option key={poste.id} value={poste.id}>
                                                {poste.nom_poste}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </motion.div>
                        </Col>
                    </Row>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Link to="/Employer">
                                <Button
                                    type="danger"
                                    style={{
                                        marginRight: '35px',
                                        backgroundColor: 'rgb(200, 0, 0, 2)',
                                        color: 'white'
                                    }} >
                                    annuler
                                </Button>
                            </Link>
                            <Button type="primary" htmlType="submit">
                                Envoyer
                            </Button>
                        </Form.Item>
                    </motion.div>
                </Form>

            </motion.div>
            <ToastContainer />
        </div>
    );
}

export default Modifier_employer;