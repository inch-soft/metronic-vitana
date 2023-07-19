/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Pagination} from '@nextui-org/react'

const TableProduct = ({className}) => {
  return (
    <>
      <div className='card'>
        <div className='card-body py-3'>Filter</div>
      </div>
      <br />
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Продукты</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Продукты: 10</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <a
              href='#'
              className='btn btn-sm btn-light-primary'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_invite_friends'
            >
              <KTIcon iconName='plus' className='fs-3' />
              Добавить продукт
            </a>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Имя</th>
                  <th className='min-w-140px'>Цена</th>
                  <th className='min-w-100px text-end'>Действие</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          Ana Simmons
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          HTML, JS, ReactJS
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className='text-end'>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: '50%'}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTIcon iconName='trash' className='fs-3' />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-center py-10'>
            <Pagination total={20} initialPage={1} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TableProduct
