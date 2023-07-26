/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Pagination} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import {deleteOrder, getOrder} from '../../modules/auth/core/_requests'
import {toast} from 'react-toastify'
import moment from 'moment'

const regions = [
  {
    id: 1,
    label: 'Бектемир тумани',
  },
  {
    id: 2,
    label: 'Чилонзор тумани',
  },
  {
    id: 3,
    label: 'Миробод тумани',
  },
  {
    id: 4,
    label: 'Мирзо Улуғбек тумани',
  },
  {
    id: 5,
    label: 'Олмазор тумани',
  },
  {
    id: 6,
    label: 'Сергели тумани',
  },
  {
    id: 7,
    label: 'Шайҳонтоҳур тумани',
  },
  {
    id: 8,
    label: 'Учтепа тумани',
  },
  {
    id: 9,
    label: 'Яккасарой тумани',
  },
  {
    id: 10,
    label: 'Яшнаобод тумани',
  },
  {
    id: 11,
    label: 'Юнусобод тумани',
  },
]

const TableOrder = ({className}) => {
  const [data, setData] = useState([])

  // FILTER
  const [status, setStatus] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [nameKlient, setKlient] = useState('')
  const [klientNumber, setKlientNumber] = useState('')
  const [klientCode, setKlientCode] = useState('')
  const [selectRegion, setSelectRegion] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)

  // FILTER

  console.log(
    status,
    'status',
    paymentType,
    'paymentType',
    nameKlient,
    'nameKlient',
    klientNumber,
    'klientNumber',
    klientCode,
    'klientCode',
    selectRegion,
    'selectRegion',
    endDate,
    'endDate',
    startDate,
    'startDate'
  )
  useEffect(() => {
    renderOrder()
  }, [])

  const renderOrder = () => {
    const params = {
      customer_phone_number: klientNumber,
      customer_code: klientCode,
      customer_name: nameKlient,
      payment_type: paymentType,
      region: selectRegion,
      is_completed: status,
      created_at_after: endDate,
      created_at_before: startDate, 
      page: page,
      page_size: 10,
    }
    getOrder(params).then((r) => {
      setData(r.data)
    })
  }

  const searchBtn = () => {
    const params = {
      customer_phone_number: klientNumber,
      customer_code: klientCode,
      customer_name: nameKlient,
      payment_type: paymentType,
      region: selectRegion,
      is_completed: status,
      created_at_after: endDate,
      created_at_before: startDate, 
      page: page,
      page_size: 10,
    }
    getOrder(params).then((r) => {
      setData(r.data)
    })
  }

  const clearFilter = () =>{
    setEndDate('')
    setStartDate('')
    setStartDate('')
    setSelectRegion('')
    setKlientCode('')
    setKlientNumber('')
    setKlient('')
    setPaymentType('')
    setStatus('')
    renderOrder()
  }

  const deleteProductS = (id) => {
    deleteOrder(id)
      .then((r) => {
        toast.success('Удалено успешно', {
          position: toast.POSITION.TOP_CENTER,
        })
        setTimeout(() => {
          renderOrder()
        }, 1000)
      })
      .catch((e) => {
        toast.error('Произошла ошибка', {
          position: toast.POSITION.TOP_CENTER,
        })
      })
  }

  const paginationHand = (page) => {
    setPage(page)
    const params = {
      customer_phone_number: klientNumber,
      customer_code: klientCode,
      customer_name: nameKlient,
      payment_type: paymentType,
      region: selectRegion,
      is_completed: status,
      created_at_after: endDate,
      created_at_before: startDate, 
      page: page,
      page_size: 10,
    }
    getOrder(params).then((r) => {
      setData(r.data)
    })
  }
  return (
    <>
      <div className='card'>
        <div className='card-body py-3  gap-2 align-items-center'>
          <div>
            <div>
              <label className='mb-2 fw-bold'>Наименование товара</label>
              <input
                placeholder='Наименование товара'
                className='form-control form-control-solid border mb-3 mb-lg-0'
                type='text'
              />
            </div>
            <div className='d-flex gap-3 mt-5 flex-column'>
              <div className='d-flex gap-3'>
                <div className='w-100'>
                  <label className='fw-bold'>С</label>
                  <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type='date'
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                  />
                </div>
                <div className='w-100'>
                  <label className='fw-bold'>По</label>
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type='date'
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                  />
                </div>
                <div className='w-100'>
                  <label className='fw-bold'>Статус заказы</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                  >
                    <option>Выберите статус</option>
                    <option value={false}> B обработке </option>
                    <option value={true}>Доставлено клиенту</option>
                  </select>
                </div>
                <div className='w-100'>
                  <label className='fw-bold'>Способ оплата </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                  >
                    <option>Выберите способ оплаты</option>
                    <option value={1}>Наличии</option>
                    <option value={3}>Перечесления </option>
                    <option value={2}>Payme/Click </option>
                  </select>
                </div>
              </div>
              <div className='d-flex gap-3'>
                <div className='w-100'>
                  <label className='fw-bold'>Имя Клиента</label>
                  <input
                    type='text'
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                    placeholder='Имя Клиента'
                    value={nameKlient}
                    onChange={(e) => setKlient(e.target.value)}
                  />
                </div>
                <div className='w-100'>
                  <label className='fw-bold'>Клиентский код</label>
                  <input
                    type='text'
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                    placeholder='Клиентский код'
                    value={klientCode}
                    onChange={(e) => setKlientCode(e.target.value)}
                  />
                </div>
                <div className='w-100'>
                  <label className='fw-bold'>Номер телефона клиента</label>
                  <input
                    type='text'
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                    placeholder='Номер телефона клиента'
                    value={klientNumber}
                    onChange={(e) => setKlientNumber(e.target.value)}
                  />
                </div>
                <div className='w-100'>
                  <label className='fw-bold'>Район/Город </label>
                  <select
                    value={selectRegion}
                    onChange={(e) => setSelectRegion(e.target.value)}
                    className='form-control form-control-solid border mb-3 mb-lg-0'
                  >
                    <option>Выберите район</option>
                    {regions.map((item) => (
                      <option value={item.id}>{item.label}</option>
                    ))}
                  </select>
                </div>
                
              </div>
              <div class="d-flex gap-3 justify-content-end">
              <div className='d-flex align-items-end'>
                  <div></div>
                  <button onClick={clearFilter} className='btn btn-secondary '>
                  Сбросить 
                  </button>
                </div>
                <div className='d-flex align-items-end'>
                  <div></div>
                  <button onClick={searchBtn} className='btn btn-primary '>
                    Поиск
                  </button>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Заказы </span>
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
            <Link to='/order/add' className='btn btn-sm btn-light-primary'>
              <KTIcon iconName='plus' className='fs-3' />
              Добавить Заказы
            </Link>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-140px'> Код клиента</th>
                  <th className='min-w-140px'>Имя Клиента</th>
                  <th className='min-w-140px'>Cпособ оплаты</th>
                  <th className='min-w-140px'> Район/Город</th>

                  <th className='min-w-140px'>Tелефон клиента</th>
                  <th className='min-w-140px'>Дата заказа</th>
                  <th className='min-w-140px'>Статус</th>

                  <th className='min-w-100px text-end'>Действие</th>
                </tr>
              </thead>

              <tbody>
                {data?.results?.length &&
                  data?.results?.map((item) => (
                    <tr key={item.id}>
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
                              {item?.customer?.full_name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item?.payment_type}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.region}
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
                          <Link to={`/order/${item.id}`} className='card-product__desc'>
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
          {data?.count > 10 ? (
            <div className='d-flex justify-content-center py-10'>
              <Pagination onChange={paginationHand} total={data?.count % 10} initialPage={1} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default TableOrder
