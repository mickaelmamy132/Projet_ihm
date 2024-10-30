import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Select, Row, Col } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DatePicker } from 'antd';
import GetFiltreDeduction from '../../API/GetFiltreDeduction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const fields = [
  { name: 'employe_id', label: 'Matricule' },
  { name: 'deduction_type', label: 'Type de déduction' },
  { name: 'deduction_date', label: 'Date de déduction' },
  { name: 'deduction_description', label: 'Description' },
];

const initialValues = fields.reduce((acc, field) => {
  acc[field.name] = '';
  return acc;
}, {});

const schema = Yup.object().shape({
  employe_id: Yup.number().required('Le matricule employé est requis'),
  deduction_type: Yup.array().of(Yup.string().required('Le type est requis')).required('Au moins un type de déduction est requis'),
  deduction_description: Yup.string().required('La description est requise'),
});

function Ajout_deduction() {
  const [loading, setLoading] = useState(false);
  const [datasource, setDataSource] = useState({ liste_employer_indeduction: [], type: [] });
  const [dropdownCount, setDropdownCount] = useState(1);
  const [dropdowns, setDropdowns] = useState([]);
  const navigate = useNavigate();

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

  const handleRemoveDropdown = (index) => {
    if (dropdownCount === 1) {
      return;
    }
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns.splice(index, 1);
    setDropdowns(updatedDropdowns);
    setDropdownCount(prevCount => prevCount - 1);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/ajoutDeduction', values);
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
          onClose: () => navigate('/table_deduction'),
        });
        formik.resetForm();
      } catch (error) {
        toast.error('erreur ajout!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Erreur lors de l\'ajout de la déduction :', error);
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
          Ce formulaire vous permet d'ajouter des déductions pour les employés. Vous pouvez:
        </Typography.Text>
        <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#34495e' }}>
          <li style={{ marginBottom: '8px' }}>Sélectionner un employé</li>
          <li style={{ marginBottom: '8px' }}>Choisir jusqu'à 5 types de déductions</li>
          <li style={{ marginBottom: '8px' }}>Définir la date de la déduction</li>
        </ul>
      </motion.div>

      <motion.div
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
            Formulaire de déduction
          </Typography.Title>
        </motion.div>

        <Form
          onFinish={formik.handleSubmit}
          initialValues={formik.values}
          validateTrigger="onBlur"
          style={{ width: '100%' }}
        >
          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Form.Item
                label={<span style={{ color: '#2c3e50', fontWeight: '500' }}>{field.label}</span>}
                name={field.name}
                validateStatus={formik.errors && formik.errors[field.name] ? 'error' : undefined}
                help={formik.errors && formik.errors[field.name]}
                validateTrigger="onBlur"
                style={{ marginBottom: '20px' }}
              >
                {field.name === 'employe_id' ? (
                  <Select
                    placeholder={field.label}
                    value={formik.values[field.name]}
                    onChange={value => {
                      formik.setFieldValue(field.name, value);
                    }}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                    loading={loading}
                    style={{ width: '100%' }}
                  >
                    {datasource.liste_employer_indeduction.map(item => (
                      <Select.Option key={item.ID_employer} value={item.ID_employer}>
                        {item.Nom} {item.Prenom}
                      </Select.Option>
                    ))}
                  </Select>
                ) : field.name === 'deduction_type' ? (
                  <div style={{ width: '100%' }}>
                    {Array.from({ length: dropdownCount }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                        <Select
                          placeholder={field.label}
                          value={formik.values[field.name][index]}
                          onChange={value => formik.setFieldValue(field.name, [...formik.values[field.name].slice(0, index), value, ...formik.values[field.name].slice(index + 1)])}
                          onBlur={() => formik.setFieldTouched(field.name, true)}
                          loading={loading}
                          style={{ flex: 1, minWidth: '200px' }}
                        >
                          {datasource.type.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                              {item.type}
                            </Select.Option>
                          ))}
                        </Select>
                        <Button danger type="primary" onClick={() => handleRemoveDropdown(index)} style={{ borderRadius: '6px' }}>Supprimer</Button>
                      </motion.div>
                    ))}
                    {dropdownCount < 5 && (
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button type="dashed" onClick={() => setDropdownCount(prevCount => prevCount + 1)} style={{ width: '100%', marginTop: '10px' }}>
                          Ajouter un type
                        </Button>
                      </motion.div>
                    )}
                  </div>
                ) : field.name === 'deduction_date' ? (
                  <DatePicker
                    style={{ width: '100%' }}
                    value={formik.values[field.name]}
                    onChange={value => formik.setFieldValue(field.name, value ? value.format('YYYY-MM-DD') : null)}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                  />
                ) : (
                  <Input
                    placeholder={field.label}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: '100%' }}
                  />
                )}
              </Form.Item>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
            <Form.Item>
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
                Créer
              </Button>
            </Form.Item>
          </motion.div>
        </Form>
      </motion.div>
    </div>
  );
}
export default Ajout_deduction;