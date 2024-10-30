import React from 'react'
import AppRoute from '../AppRouter/AppRoute'
import { Flex } from 'antd'

function Index_page() {
  return (
    <div className='Index_page' style={{ minHeight: '100vh', width: '100%' }}>
      <Flex vertical gap="2.3rem" style={{ padding: '20px', height: '100%' }}>
        <AppRoute />
      </Flex>
    </div>
  )
}

export default Index_page