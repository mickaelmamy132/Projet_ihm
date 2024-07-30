import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import { Badge, Flex, Space, Typography } from 'antd';
// import Search from 'antd/es/transfer/search';


library.add(faCoffee, faEnvelope, faBell);
function Index_header() {
  return (
    <Flex align='center' justify='space-between' style={{ borderBottom: '1px solid #ccc' }}>
      {/* <div className='index_header'> */}
        <FontAwesomeIcon width={40} icon={faCoffee} />
        <Typography.Title level={3} type='secondary'>
          Tableau de bord
        </Typography.Title>

        <Flex align='center' gap="3rem">
          {/* <Search placeholder='recherche' allowClear /> */}
          <Flex align='center' gap={1} px >
            <FontAwesomeIcon style={{ fontSize: '24' }} icon={faEnvelope} />
            <Badge count={20}>
              <FontAwesomeIcon style={{ fontSize: '24' }} icon={faBell} />
            </Badge>
          </Flex>
        </Flex>
      {/* </div> */}
    </Flex>

  )
}

export default Index_header
