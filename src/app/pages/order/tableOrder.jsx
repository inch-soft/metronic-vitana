/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Pagination} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import {deleteOrder, getOrder} from '../../modules/auth/core/_requests'
import {toast} from 'react-toastify'
import moment from 'moment'

const TableOrder = ({className}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    renderProduct()
  }, [])

  const renderProduct = () => {
    getOrder().then((r) => {
      setData(r.data)
    })
  }

  const deleteProductS = (id) => {
    deleteOrder(id)
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
      <div className='card'>
        <div className='card-body py-3'>Filter</div>
      </div>
      <br />
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Продукты</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              Заказы: {data?.results?.length}
            </span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <Link to='/product/add' className='btn btn-sm btn-light-primary'>
              <KTIcon iconName='plus' className='fs-3' />
              Добавить продукт
            </Link>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-140px'>Hаименование товара</th>
                  <th className='min-w-140px'>Цена продукта</th>
                  <th className='min-w-140px'>Cпособ оплаты</th>
                  <th className='min-w-140px'>Имя Клиента</th>
                  <th className='min-w-140px'> Код клиента</th>
                  <th className='min-w-140px'>Tелефон клиента</th>
                  <th className='min-w-140px'>Дата заказа</th>
                  <th className='min-w-140px'>Статус</th>

                  <th className='min-w-100px text-end'>Действие</th>
                </tr>
              </thead>

              <tbody>
                {data?.results?.length &&
                  data?.results?.map((item) => (
                    <tr>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.product.price} сум
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.payment_type}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.customer.full_name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.customer.code}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.customer.phone_number}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {moment(item.created_at).format('DD/MM/YYYY, h:mm')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.is_completed == true ? (
                                <span className='badge badge-primary'>True</span>
                              ) : (
                                <span className='badge badge-danger'>False</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <Link to={`/product/${item.id}`} className='card-product__desc'>
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

export default TableOrder
