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
        <div style={{
            marginLeft: 80,
            maxWidth: '500px',
            height: 'auto',
            backgroundColor: '#fff',
            padding: '50px',
            marginLeft: '300px',
            marginTop: '20px',
            borderRadius: '8px',
            alignItems: 'center'
        }}
        >
            <Typography.Title>Formulaire de Modification</Typography.Title>
            <Form form={form} onFinish={formik.handleSubmit} validateTrigger="onBlur">
                {fields.map((field, index) => (
                    <Form.Item
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        validateStatus={formik.errors && formik.errors[field.name] ? 'error' : undefined}
                        help={formik.errors && formik.errors[field.name]}
                        validateTrigger="onBlur"
                    >
                        {field.name === 'deduction_type' ? (
                            <div>
                                {formik.values[field.name].length === 0 ? (
                                    <div key={0} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
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
                                    </div>
                                ) : null}

                                {formik.values[field.name].map((value, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
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
                                        <Button type="danger" onClick={() => handleRemoveDropdown(field.name, index)}>Supprimer</Button>
                                    </div>
                                ))}

                                {formik.values[field.name].length < 5 && (
                                    <Button onClick={() => {
                                        const updatedValues = [...formik.values[field.name]];
                                        updatedValues.push('');
                                        formik.setFieldValue(field.name, updatedValues);
                                    }}>Ajouter un type</Button>
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
                ))}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Link to="/table_deduction">
                        <Button
                            type="danger"
                            style={{
                                marginRight: '30px',
                                backgroundColor: 'rgb(200, 0, 0, 2)',
                                color: 'white'
                            }} >
                            annuler
                        </Button>
                    </Link>
                    <Button type="primary" htmlType="submit" >
                        Modifier
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Modif_deduction;
