import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input, Button, Form, Typography, PlusOutlined, DatePicker, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import 'dayjs/locale/fr';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Modifier_employer = () => {
    const location = useLocation();
    const employe = location.state.employe;

    const [form] = Form.useForm();

    useEffect(() => {
        if (employe) {
            console.log(employe);
            form.setFieldsValue(employe);
        }
    }, [employe]);

    const handleSubmit = async (values) => {
        try {
            if (employe && employe.ID_employer) {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (key === 'image' && value instanceof File) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, value);
                    }
                });
                // console.log(formData);
                const response = await axios.put(`http://127.0.0.1:8000/api/modif_employer/${employe.ID_employer}`, formData);
                // toast.success('Ajout réussi!', {
                //     position: 'top-center',
                //     autoClose: 1500,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     style: { backgroundColor: 'green', color: 'white' },
                //     bodyStyle: { fontSize: '16px' },
                //     progressStyle: { backgroundColor: 'white' },
                //     onClose: () => navigate('/Employer'),
                // });
                formik.resetForm();
                console.log('Modification réussie');
            } else {
                console.error('Erreur : ID de l\'employé non défini');
            }
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
        }
    };

    const [selectedImage, setSelectedImage] = useState(employe ? employe.image_url : null);

    const handleImageChange = (file) => {
        const imageURL = URL.createObjectURL(file);
        setSelectedImage(imageURL);
        form.setFieldsValue({ image: file });
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div style={{ maxWidth: '650px', height: '500px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', alignItems: 'center' }}>
            <Typography.Title>Champ formulaire</Typography.Title>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={employe}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Row gutter={[5, 5]}>

                    <Col span={12}>
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
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Nom"
                            name="Nom"
                            rules={[{ required: true, message: 'Le nom est requis' }]}
                        >
                            <Input placeholder="Nom" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Prénom"
                            name="Prenom"
                            rules={[{ required: true, message: 'Le prénom est requis' }]}
                        >
                            <Input placeholder="Prénom" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Adresse"
                            name="Adresse"
                            rules={[{ required: true, message: 'Le prénom est requis' }]}
                        >
                            <Input placeholder="Adresse" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Telephone"
                            name="Tel"
                            rules={[{ required: true, message: 'Le numero est requis' }]}
                        >
                            <Input placeholder="numero" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="Email"
                            rules={[{ required: true, message: 'Le Email est requis' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Date d'embauche"
                            name="Date_embauche"
                            rules={[{ required: true, message: 'Date d`embauche est requise' }]}
                        >
                            {/* <DatePicker
                                style={{ width: '100%' }}
                                defaultValue={employe.Date_embauche ? moment(new Date(employe.Date_embauche)) : null}
                            /> */}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Departememt"
                            name="Departement"
                            rules={[{ required: true, message: 'Departement est requis' }]}
                        >
                            <Input placeholder="Departement" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Poste"
                            name="Poste"
                            rules={[{ required: true, message: 'Post est requis' }]}
                        >
                            <Input placeholder="Adresse" />
                        </Form.Item>
                    </Col>
                </Row>
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
            </Form>
        </div>
    );
}

export default Modifier_employer;
