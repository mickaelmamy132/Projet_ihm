import React, { useEffect, useState } from 'react';
import { Menu, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartPie, faUser, faMoneyBillAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

library.add(faChartPie, faUser, faMoneyBillAlt, faPowerOff);

function Index_side({ onLogout }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    onLogout();
    navigate('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = (item) => {
    if (item.key === '/') {
      showModal();
    } else {
      navigate(item.key);
    }
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className='Index_side bg-gray-800 min-h-screen w-64 p-4'
    >
      <Menu
        className='SideMenuVerticale bg-transparent border-none'
        mode='vertical'
        onClick={handleMenuClick}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item
          key="/Dashboard"
          icon={<FontAwesomeIcon width={40} icon={faChartPie} />}
          className={`hover:bg-gray-700 rounded-lg mb-2 ${selectedKeys === '/Dashboard' ? 'hover:bg-gray-700 rounded-lg mb-2' : 'text-blue-600'}`}
        >
          <motion.span whileHover={{ scale: 1.05 }} className={selectedKeys === '/Dashboard' ? 'text-black' : 'text-white'}>Tableau de bord</motion.span>
        </Menu.Item>
        <Menu.Item
          key="/Employer"
          icon={<FontAwesomeIcon width={40} icon={faUser} />}
          className={`hover:bg-gray-700 rounded-lg mb-2 ${selectedKeys === '/Employer' ? 'hover:bg-gray-700 rounded-lg mb-2' : 'text-white'}`}
        >
          <motion.span whileHover={{ scale: 1.05 }} className={selectedKeys === '/Employer' ? 'text-black' : 'text-white'}>Employés</motion.span>
        </Menu.Item>
        <Menu.Item
          key="/table_deduction"
          icon={<FontAwesomeIcon width={40} icon={faMoneyBillAlt} />}
          className={`hover:bg-gray-700 rounded-lg mb-2 ${selectedKeys === '/table_deduction' ? 'hover:bg-gray-700 rounded-lg mb-2' : 'text-white'}`}
        >
          <motion.span whileHover={{ scale: 1.05 }} className={selectedKeys === '/table_deduction' ? 'text-black' : 'text-white'}>Déductions</motion.span>
        </Menu.Item>
        <Menu.Item
          key="/table_Payement"
          icon={<FontAwesomeIcon width={40} icon={faMoneyBillAlt} />}
          className={`hover:bg-gray-700 rounded-lg mb-2 ${selectedKeys === '/table_Payement' ? 'hover:bg-gray-700 rounded-lg mb-2' : 'text-white'}`}
        >
          <motion.span whileHover={{ scale: 1.05 }} className={selectedKeys === '/table_Payement' ? 'text-black' : 'text-white'}>Paiements</motion.span>
        </Menu.Item>
        <Menu.Item
          key="/"
          icon={<FontAwesomeIcon width={40} icon={faPowerOff} className="text-red-500" />}
          className="hover:bg-red-600 hover:text-white rounded-lg mt-auto text-white"
        >
          <motion.span whileHover={{ scale: 1.05 }} className="text-red-600">Déconnexion</motion.span>
        </Menu.Item>
      </Menu>
      <Modal
        title="Confirmation de déconnexion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Oui"
        cancelText="Non"
        className="font-sans"
      >
        <p className="text-gray-700">Êtes-vous sûr de vouloir vous déconnecter?</p>
      </Modal>
    </motion.div>
  );
}

export default Index_side;