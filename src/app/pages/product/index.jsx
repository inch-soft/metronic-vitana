import React, {useState, useEffect} from 'react'

import TableProduct from './tableProduct'
import {getProduct} from '../../modules/auth/core/_requests'

export default function Product() {
  
  return (
    <>
      <TableProduct className='mb-5 mb-xl-8' />
    </>
  )
}
