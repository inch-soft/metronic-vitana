import React, {useState, useEffect} from 'react'

import {getProduct} from '../../modules/auth/core/_requests'
import TableOrder from './tableOrder'

export default function Order() {
  return (
    <>
      <TableOrder className='mb-5 mb-xl-8' />
    </>
  )
}
