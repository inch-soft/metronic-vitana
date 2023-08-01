/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Pagination} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import {deleteCustomer, getCustomer} from '../../modules/auth/core/_requests'
import {toast} from 'react-toastify'

const TableCustomer = ({className}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    renderProduct()
  }, [])

  const renderProduct = () => {
    getCustomer().then((r) => {
      setData(r.data)
    })
  }

  const deleteProductS = (id) => {
    deleteCustomer(id)
      .then((r) => {
        toast.success('Удалено успешно', {
          position: toast.POSITION.TOP_CENTER,
        })
        setTimeout(() => {
          renderProduct()
        }, 1000)
      })
      .catch((e) => {
        toast.error('Произошла ошибка', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }
  return (
    <>
      {/* <div className='card'>
        <div className='card-body py-3'>Filter</div>
      </div> */}
      <br />
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Клиенты</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Продукты: {data?.count}</span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <Link to='/customer/add' className='btn btn-sm btn-light-primary'>
              <KTIcon iconName='plus' className='fs-3' />
              Добавить клиенты
            </Link>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>ID</th>
                  <th className='min-w-150px'>Код</th>
                  <th className='min-w-150px'>Полное имя</th>
                  <th className='min-w-150px'>Номер телефона</th>
                  <th className='min-w-140px'>Номер телефона(2)</th>
                  <th className='min-w-100px text-end'>Действие</th>
                </tr>
              </thead>

              <tbody>
                {data?.results?.length &&
                  data?.results?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.id}
                            </div>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.phone_number}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.secondary_phone_number}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <Link to={`/customer/${item.code}`} className='card-product__desc'>
                            <div className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                              <KTIcon iconName='pencil' className='fs-3' />
                            </div>
                          </Link>
                          <div
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            onClick={() => deleteProductS(item.id)}
                          >
                            <KTIcon iconName='trash' className='fs-3' />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
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

export default TableCustomer
