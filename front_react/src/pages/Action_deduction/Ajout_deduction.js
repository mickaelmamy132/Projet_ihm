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
    <div style={{
      minWidth: '700px',
      marginLeft: 80,
      marginTop: 20,
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      alignItems: 'center',
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-40%, -50%)',
    }}>
      <Typography.Title>Formulaire de déduction</Typography.Title>
      <Form onFinish={formik.handleSubmit} initialValues={formik.values} validateTrigger="onBlur">
        {fields.map((field, index) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            validateStatus={formik.errors && formik.errors[field.name] ? 'error' : undefined}
            help={formik.errors && formik.errors[field.name]}
            validateTrigger="onBlur"
          >
            {field.name === 'employe_id' ? (
              <Select
                placeholder={field.label}
                value={formik.values[field.name]}
                onChange={value => {
                  formik.setFieldValue(field.name, value); // Mettre à jour directement la valeur
                }}

                onBlur={() => formik.setFieldTouched(field.name, true)}
                loading={loading}
                style={{ marginRight: '8px', flex: 1 }}
              >
                {datasource.liste_employer_indeduction.map(item => (
                  <Select.Option key={item.ID_employer} value={item.ID_employer}>
                    {item.Nom} {item.Prenom}
                  </Select.Option>
                ))}
              </Select>
            ) : field.name === 'deduction_type' ? (
              <div>
                {Array.from({ length: dropdownCount }).map((_, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Select
                      placeholder={field.label}
                      value={formik.values[field.name][index]}
                      onChange={value => formik.setFieldValue(field.name, [...formik.values[field.name].slice(0, index), value, ...formik.values[field.name].slice(index + 1)])}
                      onBlur={() => formik.setFieldTouched(field.name, true)}
                      loading={loading}
                      style={{ marginRight: '8px', flex: 1 }}
                    >
                      {datasource.type.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.type}
                        </Select.Option>
                      ))}
                    </Select>
                    <Button type="danger" onClick={() => handleRemoveDropdown(index)}>Supprimer</Button>
                  </div>
                ))}
                {dropdownCount < 5 && (
                  <Button onClick={() => setDropdownCount(prevCount => prevCount + 1)}>Ajouter un type</Button>
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
            Créer
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
}

export default Ajout_deduction;
