import React, { useEffect, useState } from 'react';
import { Menu, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartPie, faUser, faMoneyBillAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

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
    onLogout(); // Appelle la fonction de logout passée en props
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
    <div className='Index_side'>
      <Menu
        className='SideMenuVerticale'
        mode='vertical'
        onClick={handleMenuClick}
        selectedKeys={[selectedKeys]}
      >
        <Menu.Item key="/Dashboard" icon={<FontAwesomeIcon width={40} icon={faChartPie} />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="/Employer" icon={<FontAwesomeIcon width={40} icon={faUser} />}>
          Employer
        </Menu.Item>
        <Menu.Item key="/table_deduction" icon={<FontAwesomeIcon width={40} icon={faMoneyBillAlt} />}>
          Deduction
        </Menu.Item>
        <Menu.Item key="/table_Payement" icon={<FontAwesomeIcon width={40} icon={faMoneyBillAlt} />}>
          Payement
        </Menu.Item>
        <Menu.Item key="/" icon={<FontAwesomeIcon width={40} icon={faPowerOff} style={{ color: 'red' }} />}>
          Deconnection
        </Menu.Item>
      </Menu>
      <Modal
        title="Confirmation de déconnexion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Oui"
        cancelText="Non"
      >
        <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
      </Modal>
    </div>
  );
}

export default Index_side;
