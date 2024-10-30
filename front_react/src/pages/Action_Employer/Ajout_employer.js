import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, DatePicker } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Select } from 'antd';
import getEmployer from '../../API/getEmployer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";



const fields = [
    { name: 'image', label: 'Image' },
    { name: 'Nom', label: 'Nom' },
    { name: 'Prenom', label: 'Prenom' },
    { name: 'Adresse', label: 'Adresse' },
    { name: 'Tel', label: 'Numero' },
    { name: 'Email', label: 'Email' },
    { name: 'Date_embauche', label: 'Date d`embauche' },
    { name: 'Departement', label: 'Departement' },
    { name: 'Poste', label: 'Poste' },
];

const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
}, {});

const schema = Yup.object().shape({
    image: Yup.mixed()
        .test('fileType', 'L\'image doit être au format JPG, JPEG, PNG ou GIF', (value) => {
            if (!value) return true;
            const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
            return supportedFormats.includes(value.type);
        })
        .required('L\'image est requise'),
    Nom: Yup.string().required('Le nom est requis'),
    Prenom: Yup.string().required('Le prenom est requis'),
    Adresse: Yup.string().required('Adresse est requise'),
    Tel: Yup.number().required('Numero est requis'),
    Email: Yup.string().required('Email est requis'),
    Date_embauche: Yup.date().required('Date d`embauche est requise'),
    Departement: Yup.string().required('Departement est requis'),
    Poste: Yup.string().required('Post est requis'),
});

function AjoutEmployer() {
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [dataSource2, setDataSource2] = useState([]);
    const [postes, setPostes] = useState([]);
    const [selectedDepartement, setSelectedDepartement] = useState(null);
    const navigate = useNavigate();
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [dynamicHeight, setDynamicHeight] = useState('600px'); // Hauteur par défaut du formulaire

    useEffect(() => {
        const checkFullScreen = () => {
            const isFull = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            setIsFullScreen(!!isFull);
        };

        const handleResize = () => {
            if (!isFullScreen) {
                const windowHeight = window.innerHeight;
                const maxHeight = windowHeight - 100;
                setDynamicHeight(`${maxHeight}px`);
            } else {
                setDynamicHeight('600px');
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('fullscreenchange', checkFullScreen);
        document.addEventListener('webkitfullscreenchange', checkFullScreen);
        document.addEventListener('mozfullscreenchange', checkFullScreen);
        document.addEventListener('MSFullscreenChange', checkFullScreen);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('fullscreenchange', checkFullScreen);
            document.removeEventListener('webkitfullscreenchange', checkFullScreen);
            document.removeEventListener('mozfullscreenchange', checkFullScreen);
            document.removeEventListener('MSFullscreenChange', checkFullScreen);
        };
    }, [isFullScreen]);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const imageURL = URL.createObjectURL(file);
            setImageURL(imageURL);
            formik.setFieldValue('image', file);
        }
    });

    useEffect(() => {
        return () => {
            if (imageURL) {
                URL.revokeObjectURL(imageURL);
            }
        };
    }, [imageURL]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { departe } = await getEmployer();
                setDataSource2(departe);
                setLoading(false);
            }
            catch (error) {
                console.error('Une erreur s\'est produite lors de la récupération des données:', error);
            }
        };
        fetchData()
    }, []);

    const handleDepartementChange = async (value) => {
        setSelectedDepartement(value);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/postes/${value}`);
            setPostes(response.data.postes);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la récupération des postes :', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            if (!values.image) {
                toast.error('image requis!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
            setLoading(true);
            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                
                const response = await axios.post('http://127.0.0.1:8000/api/AjoutEmployer', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Ajout réussi!', {
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
                formik.resetForm();
            } catch (error) {
                console.error('Erreur lors de la création de l\'employé :', error);
                toast.error('Erreur lors de la création de l\'employé');
                if (error.response && error.response.data && error.response.data.errors) {
                    formik.setErrors(error.response.data.errors);
                }
            } finally {
                setLoading(false);
            }
        },
    });



    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '50px', margin: '20px', flexWrap: 'wrap'}}>
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
                    <Typography.Title>Champ formulaire</Typography.Title>
                </motion.div>
                <Form
                    onFinish={formik.handleSubmit}
                    initialValues={formik.values}
                    validateTrigger="onBlur"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Row gutter={[5, 5]}>
                        {fields.map((field, index) => (
                            <motion.div
                                key={field.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ width: '50%' }}
                            >
                                <Col span={24}>
                                    <Form.Item
                                        label={field.label}
                                        name={field.name}
                                        validateStatus={formik.errors && formik.errors[field.name] && 'error'}
                                        help={formik.errors && formik.errors[field.name]}
                                        validateTrigger="onBlur"
                                    >
                                        {field.name === 'image' ? (
                                            <div {...getRootProps()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <input {...getInputProps({
                                                    accept: 'image/*'
                                                })} />
                                                {imageURL && <img src={imageURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                                                {!imageURL && <p style={{ marginTop: '10px' }}>Déposez une image ici ou cliquez pour sélectionner</p>}
                                            </div>
                                        ) :
                                            field.name === 'Date_embauche' ? (
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    value={formik.values[field.name]}
                                                    onChange={value => formik.setFieldValue(field.name, value ? value.format('YYYY-MM-DD') : null)}
                                                    onBlur={() => formik.setFieldTouched(field.name, true)}
                                                />
                                            ) : field.name === 'Departement' ? (
                                                <Select
                                                    placeholder={field.label}
                                                    value={formik.values[field.name]}
                                                    onChange={(value) => {
                                                        formik.setFieldValue(field.name, value);
                                                        handleDepartementChange(value);
                                                    }}
                                                    onBlur={() => formik.setFieldTouched(field.name, true)}
                                                >
                                                    {dataSource2.map(dep => (
                                                        <Select.Option key={dep.id} value={dep.id}>
                                                            {dep.nom_departement}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            ) : field.name === 'Poste' ? (
                                                <Select
                                                    placeholder={field.label}
                                                    value={formik.values[field.name]}
                                                    onChange={(value) => formik.setFieldValue(field.name, value)}
                                                    onBlur={() => formik.setFieldTouched(field.name, true)}
                                                >
                                                    {postes.map(poste => (
                                                        <Select.Option key={poste.id} value={poste.id}>
                                                            {poste.nom_poste}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            ) : (
                                                <Input
                                                    placeholder={field.label}
                                                    value={formik.values[field.name]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                            )}
                                    </Form.Item>
                                </Col>
                            </motion.div>
                        ))}
                    </Row>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/Employer">
                                <Button
                                    type="default"
                                    style={{
                                        marginRight: '35px',
                                        backgroundColor: '#ff4d4f',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                >
                                    Annuler
                                </Button>
                            </Link>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                style={{
                                    backgroundColor: '#1890ff',
                                    border: 'none'
                                }}
                            >
                                Ajouter
                            </Button>
                        </motion.div>
                    </Form.Item>
                </Form>
            </motion.div>
        </div>
    );}
export default AjoutEmployer;
