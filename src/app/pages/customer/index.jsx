import React, {useState, useEffect} from 'react'

import TableCustomer from './tableCustomer'
import {getProduct} from '../../modules/auth/core/_requests'

export default function Customer() {
  return (
    <>
      <TableCustomer className='mb-5 mb-xl-8' />
    </>
  )
}
