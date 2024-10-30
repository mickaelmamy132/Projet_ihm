import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button, Row, Col } from "antd";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const { Option } = Select;

function Payement_employer() {
  const [employerList, setEmployerList] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmployerInfo, setSelectedEmployerInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? moment(storedDate) : moment();
  });
  const [payments, setPayments] = useState([]);
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [deductions, setDeductions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployerData = async () => {
      setLoading(true);
      const year = selectedDate.year();
      const month = selectedDate.month() + 1;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Filtre_payement/${year}/${month}?employerId=${selectedEmployerId}`
        );
        const data = response.data;
        const unpaidEmployers = data.unpaidEmployers;
        setEmployerList(unpaidEmployers);
        setDeductions(data.selectedEmployerDeductions);
        setLoading(false);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des employés impayés :",
          error
        );
        setLoading(false);
      }
    };
    fetchEmployerData();
  }, [selectedDate, selectedEmployerId]);

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate.format("YYYY-MM-DD"));
  }, [selectedDate]);

  const handleSelectChange = (value) => {
    setSelectedEmployer(value);
    setSelectedEmployerId(value);

    const selectedInfo = employerList.find(
      (employer) => employer.ID_employer === value
    );
    setSelectedEmployerInfo(selectedInfo);
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handlePayment = () => {
    if (selectedEmployer && selectedDate) {
      const deductionsData = deductions.map((deduction) => ({
        type: deduction.deduction_types.split(","),
        amount: deduction.deduction_amount.split(","),
      }));

      const paymentData = {
        amount: selectedEmployerInfo.Salaire_base,
        payment_date: selectedDate.format("YYYY-MM-DD"),
        employer_id: selectedEmployer,
        deductions: deductionsData,
      };
      console.log(paymentData);

      axios
        .post("http://127.0.0.1:8000/api/Add_payements", paymentData)
        .then((response) => {
          console.log("Paiement effectué avec succès:", response.data);
          toast.success("Paiement effectué avec succès!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { backgroundColor: "green", color: "white" },
            bodyStyle: { fontSize: "16px" },
            progressStyle: { backgroundColor: "white" },
            onClose: () => navigate("/table_Payement"),
          });
        })
        .catch((error) => {
          console.error("Erreur lors du paiement:", error);
          toast.error("Erreur lors lors du paiement");
        });
    } else {
      console.error(
        "Veuillez sélectionner un employeur et une date de paiement."
      );
    }
  };

  let filteredEmployerList = [];
  if (
    employerList &&
    employerList.length > 0 &&
    payments &&
    payments.length > 0
  ) {
    const paidEmployersIds = payments.map((payment) => payment.employer_id);
    filteredEmployerList = employerList.filter(
      (employer) => !paidEmployersIds.includes(employer.ID_employer)
    );
    console.log(filteredEmployerList);
  } else {
    filteredEmployerList = employerList;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      width: '100%',
      marginLeft: '250px' // Add space for sidebar
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          width: "90%",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="section-title"
          style={{
            marginBottom: "30px",
            textAlign: "center",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: "15px"
          }}
        >
          <h1 style={{ color: "#1890ff", margin: 0 }}>Gestion des Paiements</h1>
          <p style={{ color: "#666", marginTop: "10px" }}>Sélectionnez un employé et une date pour effectuer le paiement</p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#666" }}>Date: </label>
            <DatePicker
              onChange={handleDateChange}
              defaultValue={selectedDate}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#666" }}>Sélectionner un employer</label>
            <Select
              id="employerSelect"
              value={selectedEmployer}
              onChange={handleSelectChange}
              style={{ width: "100%" }}
              placeholder="Sélectionnez un employeur"
              loading={loading}
            >
              {filteredEmployerList.map((employer) => (
                <Option key={employer.ID_employer} value={employer.ID_employer}>
                  {employer.Nom} {employer.Prenom} - matriculé: {employer.ID_employer}
                </Option>
              ))}
            </Select>
          </div>
        </motion.div>

        {selectedEmployerInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              backgroundColor: "#f8f9fa",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
            }}
          >
            <h2 style={{ color: "#1890ff", marginBottom: "20px" }}>Informations de l'employeur</h2>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="info-item">
                  <strong>Matricule:</strong> {selectedEmployerInfo.ID_employer}
                </div>
                <div className="info-item">
                  <strong>Nom complet:</strong> {selectedEmployerInfo.Nom} {selectedEmployerInfo.Prenom}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {selectedEmployerInfo.Email}
                </div>
              </Col>
              <Col span={12}>
                <div className="info-item">
                  <strong>Téléphone:</strong> {selectedEmployerInfo.Tel}
                </div>
                <div className="info-item">
                  <strong>Département:</strong> {selectedEmployerInfo.Departement}
                </div>
                <div className="info-item">
                  <strong>Salaire de base:</strong> {selectedEmployerInfo.Salaire_base}
                </div>
              </Col>
            </Row>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: "20px" }}
            >
              <h3 style={{ color: "#1890ff" }}>Déductions</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {deductions.map((deduction) => (
                  <li key={deduction.deduction_id} style={{ marginBottom: "10px" }}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {deduction.deduction_types.split(",").map((type, index) => (
                        <li key={index} style={{
                          padding: "8px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          marginBottom: "5px"
                        }}>
                          {type}: {deduction.deduction_amount.split(",")[index]}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <Button
                type="primary"
                onClick={handlePayment}
                loading={loading}
                size="large"
                style={{
                  minWidth: "200px",
                  height: "45px",
                  fontSize: "16px"
                }}
              >
                Effectuer le paiement
              </Button>
            </motion.div>

          </motion.div>
        )}

        <Link 
          to="/table_Payement" 
          style={{ 
            color: "#ff0000", 
            textDecoration: "none", 
            marginTop: "20px", 
            display: "block", 
            textAlign: "center",
            padding: "10px",
            border: "2px solid #ff0000",
            borderRadius: "8px",
            backgroundColor: "#fff",
            transition: "all 0.3s ease",
            fontSize: "16px",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#ff0000",
              color: "#fff",
              transform: "scale(1.05)"
            }
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ff0000"
            e.target.style.color = "#fff"
            e.target.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#fff"
            e.target.style.color = "#ff0000"
            e.target.style.transform = "scale(1)"
          }}
        >
          Annuler le paiement
        </Link>
        <style jsx>{`
          .info-item {
            margin-bottom: 12px;
            padding: 8px;
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .info-item strong {
            color: #1890ff;
            margin-right: 8px;
          }
        `}</style>
      </motion.div>
    </div>
  );
}
export default Payement_employer;