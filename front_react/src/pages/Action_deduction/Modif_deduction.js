import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import GetFiltreDeduction from '../../API/GetFiltreDeduction';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const fields = [
    { name: 'deduction_type', label: 'Type de déduction' },
    { name: 'deduction_description', label: 'Description' },
];

const schema = Yup.object().shape({
    deduction_type: Yup.array().of(Yup.string().required('Le type est requis')).required('Au moins un type de déduction est requis'),
    deduction_description: Yup.string().required('La description est requise'),
});

function Modif_deduction() {
    const [loading, setLoading] = useState(false);
    const [datasource, setDataSource] = useState({ type: [] });
    const location = useLocation();
    const deduction = location.state.deduction;
    const navigate = useNavigate();

    const [form] = Form.useForm();

    useEffect(() => {
        if (deduction) {
            const valeurInitiales = {
                deduction_id: deduction.deduction_id,
                deduction_type: deduction.deduction_type || [''],
                deduction_description: deduction.deduction_description,
            };
            console.log(valeurInitiales);
            form.setFieldsValue(valeurInitiales);
        }
    }, [deduction, form]);


    useEffect(() => {
        setLoading(true);
        GetFiltreDeduction()
            .then((res) => {
                setDataSource(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Une erreur s\'est produite lors de la récupération des deductions :', error);
                setLoading(false);
            });
    }, []);

    const handleRemoveDropdown = (fieldName, index) => {
        const updatedValues = [...formik.values[fieldName]];
        updatedValues.splice(index, 1);
        formik.setFieldValue(fieldName, updatedValues);
    };

    const
        initialValues = deduction ? { deduction_type: deduction.deduction_type.split(',').filter(value => !isNaN(value)).map(value => Number(value)), deduction_description: deduction.deduction_description } : { deduction_type: [''], deduction_description: '' };

    const formik = useFormik({
        initialValues: initialValues, validationSchema: schema,
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/modiftDeduction/${deduction.deduction_id}`, values);
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
                    onClose: () => navigate('/table_deduction'),
                });
                console.log('Deduction modifier avec succès :', response.data);
                formik.resetForm();
            } catch (error) {
                console.error('Erreur lors de la modification de la déduction :', error);
                toast.error('erreur lors de la modification!', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                formik.setErrors(error.response.data.errors);
            } finally {
                setLoading(false);
            }
        },
    });

    return (

        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', margin: '20px', flexWrap: 'wrap' }}>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px',
                    flex: '0 1 300px',
                    height: 'fit-content',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e9ecef'
                }}>
                <Typography.Text strong style={{ fontSize: '16px', color: '#2c3e50' }}>
                    Ce formulaire vous permet de modifier les déductions existantes. Vous pouvez:
                </Typography.Text>
                <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#34495e' }}>
                    <li style={{ marginBottom: '8px' }}>Modifier les types de déductions</li>
                    <li style={{ marginBottom: '8px' }}>Mettre à jour la description</li>
                    <li style={{ marginBottom: '8px' }}>Sauvegarder vos modifications</li>
                </ul>
            </motion.div>            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    flex: '1 1 300px',
                    maxWidth: '700px',
                    backgroundColor: '#ffffff',
                    padding: '25px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e0e0e0',
                    '@media (max-width: 768px)': {
                        width: '95%',
                        padding: '20px',
                        margin: '10px auto',
                    }
                }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}>
                    <Typography.Title level={2} style={{ color: '#1a237e', marginBottom: '25px', textAlign: 'center' }}>
                        Formulaire de modification
                    </Typography.Title>
                </motion.div>
                <Form
                    form={form}
                    onFinish={formik.handleSubmit}
                    validateTrigger="onBlur"
                    style={{ width: '100%' }}
                >
                    {fields.map((field, index) => (
                        <motion.div
                            key={field.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Form.Item
                                label={field.label}
                                name={field.name}
                                validateStatus={formik.errors && formik.errors[field.name] ? 'error' : undefined}
                                help={formik.errors && formik.errors[field.name]}
                                validateTrigger="onBlur"
                            >
                                {field.name === 'deduction_type' ? (
                                    <div>
                                        {formik.values[field.name].length === 0 ? (
                                            <motion.div
                                                key={0}
                                                style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Select
                                                    placeholder={field.label}
                                                    onChange={newValue => {
                                                        formik.setFieldValue(field.name, [newValue]);
                                                    }}
                                                    onBlur={() => formik.setFieldTouched(field.name, true)}
                                                    loading={loading}
                                                    style={{ marginRight: '8px', flex: 1 }}
                                                >
                                                    {datasource.type.map(item => (
                                                        <Select.Option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.type}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                                <Button type="danger" disabled={formik.values[field.name].length === 1} onClick={() => handleRemoveDropdown(0)}>Supprimer</Button>
                                            </motion.div>
                                        ) : null}

                                        {formik.values[field.name].map((value, index) => (
                                            <motion.div
                                                key={index}
                                                style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <Select
                                                    placeholder={field.label}
                                                    defaultValue={value}
                                                    onChange={newValue => {
                                                        const updatedValues = [...formik.values[field.name]];
                                                        updatedValues[index] = newValue;
                                                        formik.setFieldValue(field.name, updatedValues);
                                                    }}
                                                    onBlur={() => formik.setFieldTouched(field.name, true)}
                                                    loading={loading}
                                                    style={{ marginRight: '8px', flex: 1 }}
                                                >
                                                    {datasource.type.map(item => (
                                                        <Select.Option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.type}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                                <Button danger type="danger" onClick={() => handleRemoveDropdown(field.name, index)} style={{ borderRadius: '6px' }}>Supprimer</Button>
                                            </motion.div>
                                        ))}

                                        {formik.values[field.name].length < 5 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <Button onClick={() => {
                                                    const updatedValues = [...formik.values[field.name]];
                                                    updatedValues.push('');
                                                    formik.setFieldValue(field.name, updatedValues);
                                                }}>Ajouter un type</Button>
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    <Input
                                        placeholder={field.label}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                )}
                            </Form.Item>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{  justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '20px' }}
                    >
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Link to="/table_deduction">
                                <Button
                                    danger
                                    type="primary"
                                    style={{
                                        borderRadius: '6px',
                                        height: '40px',
                                        padding: '0 25px'
                                    }} >
                                    Annuler
                                </Button>
                            </Link>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    marginLeft: '30px',
                                    borderRadius: '6px',
                                    height: '40px',
                                    padding: '0 25px',
                                    background: '#1890ff'
                                }}>
                                Modifier
                            </Button>
                        </Form.Item>
                    </motion.div>

                </Form>
            </motion.div>
        </div >
    );
}
export default Modif_deduction;