import React, {useEffect, useState} from 'react'
import {
  createCustomer,
  getCustomerId,
  editCustomer,
  deleteProduct,
} from '../../modules/auth/core/_requests'
import {useNavigate, useParams} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {KTIcon} from '../../../_metronic/helpers'

const EditPageCustomer = () => {
  const [code, setCode] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [phoneNumberScnd, setPhoneNumberScnd] = useState(null)
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  console.log(params.id, 'params')

  useEffect(() => {
    const formData = {
      code,
      full_name: fullName,
      phone_number: phoneNumber,
      secondary_phone_number: phoneNumberScnd,
      latitude: null,
      longitude: null,
    }
    if (params.id) {
      getCustomerId(formData, params?.id).then((r) => {
        setCode(r.data.customer.code)
        setFullName(r.data.customer.full_name)
        setPhoneNumber(r.data.customer.secondary_phone_number)
        setPhoneNumberScnd(r.data.customer.secondary_phone_number)
        setData(r.data)
      })
    }
  }, [])
  const submit = () => {
    const formData = {
      code,
      full_name: fullName,
      phone_number: phoneNumber,
      secondary_phone_number: phoneNumberScnd,
      latitude: null,
      longitude: null,
    }
    if (params.id) {
      editCustomer(formData, params.id)
        .then((r) => {
          setTimeout(() => {
            navigate(-1)
          }, 1500)
          toast.success('Изменено успешно', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
        .catch((e) => {
          toast.error('Произошла ошибка', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    } else {
      createCustomer(formData)
        .then((r) => {
          setTimeout(() => {
            navigate(-1)
          }, 1500)

          toast.success('Создано успешно', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
        .catch((e) => {
          toast.error('Произошла ошибка', {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    }
  }

  return (
    <>
      <button onClick={() => navigate(-1)} className='btn btn-info mb-5'>
        <KTIcon iconName='black-left' className='fs-2' /> Назад
      </button>
      <div className='card p-3 mw-20'>
        <div className='d-flex gap-2'>
          <input
            placeholder='Код'
            type='text'
            name='fullName'
            value={code}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setCode(e.target.value)}
          />
          <input
            placeholder='Полное имя'
            type='text'
            name='fullName'
            value={fullName}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder='Номер телефона'
            type='text'
            name='name'
            value={phoneNumber}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            placeholder='Номер телефона(2)'
            type='text'
            name='name'
            value={phoneNumberScnd}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setPhoneNumberScnd(e.target.value)}
          />

          <button onClick={submit} className='btn btn-primary'>
            Сохранить
          </button>
        </div>
        {params.id ? (
          <div className='table-responsive'>
            <p className='pt-10 pb-5 fw-bold fs-100'>Заказы клиентов : {data?.total_orders}</p>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Называния</th>
                  <th className='min-w-150px'>Цена</th>
                  <th className='min-w-150px'>Способ оплаты</th>
                </tr>
              </thead>

              <tbody>
                {data?.orders?.length &&
                  data?.orders?.map((item) => (
                    <tr>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.product.name}
                            </div>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.product.price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {(() => {
                                if (item.payment_type == 'Naqd') {
                                  return <span className='badge badge-primary'>Naqd</span>
                                } else if (item.payment_type == 'Plastik') {
                                  return <span className='badge badge-success'>Plastik</span>
                                } else {
                                  return (
                                    <span className='badge badge-info'>
                                      O'tkazish(perechisleniya)
                                    </span>
                                  )
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  )
}
export default EditPageCustomer
