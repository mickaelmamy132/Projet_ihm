import React from 'react'
import { Modal, Button } from 'antd';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

function PaymentModale({ isVisible, onCancel, paymentDetails }) {

  const generatePDF = (details) => {
    const doc = new jsPDF();
    const fontSize = 30;
    const x = 70;
    const y = 10;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');

    const text = 'Fiche de payement';
    doc.text(text, x, y);

    const textWidth = doc.getTextWidth(text);
    const underlineY = y + 1;
    doc.line(x, underlineY, x + textWidth, underlineY);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    doc.text(`Reference: ${paymentDetails.id}`, 10, 30);
    doc.text(`Employer: ${paymentDetails.employer_id}`, 10, 40);
    doc.text(`Salaire: ${paymentDetails.amount}`, 10, 50);
    doc.text(`Date de payment: ${paymentDetails.payment_date}`, 10, 60);
    doc.text(`Deduction: ${paymentDetails.deduction}`, 10, 70);
    doc.text(`salaire Net: ${paymentDetails.amount}`, 10, 80);

    doc.text(`Signature caisse`, 20, 150);
    doc.text(`Signature employer`, 150, 150);

    doc.save('fiche de paye.pdf');
    onCancel(); 
  };

  return (
    <div> 
      <Modal
        title={
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-center text-blue-600"
          >
            Informations de paiement
          </motion.h2>
        }
        visible={isVisible}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Fermer
          </Button>,
          <Button key="print" type="primary" onClick={generatePDF}>
            Imprimer
          </Button>,
        ]}
        className="rounded-lg"
      >
        {paymentDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 p-4"
          >
            <motion.div
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.p className="text-gray-700 mb-2">
                <span className="font-semibold">Reference:</span> {paymentDetails.id}
              </motion.p>
              <motion.p className="text-gray-700 mb-2">
                <span className="font-semibold">Employer:</span> {paymentDetails.employer_id}
              </motion.p>
              <motion.p className="text-gray-700 mb-2">
                <span className="font-semibold">Salaire:</span> {paymentDetails.salaire}
              </motion.p>
              <motion.p className="text-gray-700 mb-2">
                <span className="font-semibold">Date de payment:</span> {paymentDetails.payment_date}
              </motion.p>
              <motion.p className="text-gray-700 mb-2">
                <span className="font-semibold">Deduction:</span> {paymentDetails.deduction}
              </motion.p>
              <motion.p className="text-gray-700">
                <span className="font-semibold">Salaire Net:</span> {paymentDetails.amount}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </Modal>
    </div>
  )
}

export default PaymentModale