import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge, Flex, Space, Typography } from 'antd';
import { motion } from 'framer-motion';

library.add(faCoffee, faEnvelope, faBell);
function Index_header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align='center' justify='space-between' className="px-6 py-4 bg-white shadow-sm border-b border-gray-200">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-4"
        >
          <FontAwesomeIcon width={40} icon={faCoffee} className="text-blue-600" />
          <Typography.Title level={3} type='secondary' className="m-0">
            Tableau de bord
          </Typography.Title>
        </motion.div>

        <Flex align='center' gap="3rem" className="items-center">
          <motion.div
            className="flex items-center gap-6"
            whileHover={{ scale: 1.05 }}
          >
            <FontAwesomeIcon 
              style={{ fontSize: '24' }} 
              icon={faEnvelope} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            />
            <Badge count={20}>
              <FontAwesomeIcon 
                style={{ fontSize: '24' }} 
                icon={faBell} 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              />
            </Badge>
          </motion.div>
        </Flex>
      </Flex>
    </motion.div>
  )
}

export default Index_header