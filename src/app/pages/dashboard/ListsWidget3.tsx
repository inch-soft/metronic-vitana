/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// import {KTIcon} from '../../../helpers'

import {Dropdown1} from '../../../_metronic/partials'
import {KTIcon} from '../../../_metronic/helpers'
// import {Dropdown1} from '../../content/dropdown/Dropdown1'
type Props = {
  className: string
  data: any
}

const ListsWidget3: React.FC<Props> = ({className, data}) => {
  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold text-dark'>Mavjud Mahsulotlar</h3>
        <div className='card-toolbar'>
          <div
            className='fs-50px fw-bold'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            {data?.available_products?.total_number_of_products} TA
          </div>
          <Dropdown1 />
        </div>
      </div>

      <div className='card-body pt-2'>
        {data?.available_products?.products?.map((item)=>(
          <div className='d-flex align-items-center mb-8'>
          <span className='bullet bullet-vertical h-40px bg-warning'></span>
          <div className='form-check form-check-custom form-check-solid mx-5'></div>
          <div className='flex-grow-1'>
            <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-6'>
              {item?.name} 
            </a>
            <span className='text-muted fw-semibold d-block'>Soni: {item.qty}</span>
          </div>
          <span className='fs-8 fw-bold'>{item.price}</span> so'm
        </div>
        ))}
        
      </div>
    </div>
  )
}

export {ListsWidget3}
