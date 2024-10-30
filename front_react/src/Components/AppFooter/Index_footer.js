import { Typography } from 'antd'
import React from 'react'
import { motion } from 'framer-motion'

function Index_footer() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='Index_footer bg-gray-800 py-6 px-4'
    >
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
        <Typography.Link 
          href='tel:+206 32 95 096 87'
          className='text-blue-400 hover:text-blue-300 transition-colors'
        >
          225454
        </Typography.Link>
        <div className='flex space-x-6'>
          <Typography.Link 
            href='#'
            className='text-gray-300 hover:text-white transition-colors active:text-blue-400'
          >
            privacy policy
          </Typography.Link>
          <Typography.Link 
            href='#'
            className='text-gray-300 hover:text-white transition-colors active:text-blue-400'
          >
            terms of use
          </Typography.Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Index_footer