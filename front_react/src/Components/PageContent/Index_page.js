import React from 'react'
import AppRoute from '../AppRouter/AppRoute'
import { Flex } from 'antd'

function Index_page() {
  return (
    <div className='Index_page'>
      <Flex vertical gap="2.3rem">
        <AppRoute />
      </Flex>
    </div>
  )
}

export default Index_page
