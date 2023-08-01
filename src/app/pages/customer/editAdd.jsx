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
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const EditPageCustomer = () => {
  const [code, setCode] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [phoneNumberScnd, setPhoneNumberScnd] = useState(null)
  const [data, setData] = useState(null)

  const [dataTable, setDataTable] = useState([])

  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal(item) {
    console.log(item, 'pruchase')
    setDataTable(item)
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

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
        <KTIcon iconName='black-left' className='fs-2' /> Орқага
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
            placeholder='Тўлиқ исми шарифи'
            type='text'
            name='fullName'
            value={fullName}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder='Телефон рақами'
            type='text'
            name='name'
            value={phoneNumber}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            placeholder='Телефон рақами (2)'
            type='text'
            name='name'
            value={phoneNumberScnd}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setPhoneNumberScnd(e.target.value)}
          />

          <button onClick={submit} className='btn btn-primary'>
            Сақлаш
          </button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Харидларни батафсил кўриш</h2>
          <div className='btnClose'>

          <button className='exitBtn' onClick={closeModal}>Ёпиш</button>
          </div>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>Маҳсулот номи</th>
                <th className='min-w-150px'>Нархи</th>
                <th className='min-w-150px'> Маҳсулот харид сони</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.length &&
                dataTable.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <div className='text-dark fw-bold text-hover-primary fs-6'>
                            {item?.purchased_product.name}
                          </div>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <div className='text-dark fw-bold text-hover-primary fs-6'>
                            {item?.purchased_product.price}
                          </div>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <div className='text-dark fw-bold text-hover-primary fs-6'>
                            {item?.purchased_count}
                          </div>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal>

        {params.id ? (
          <div className='table-responsive'>
            <p className='pt-10 pb-5 fw-bold fs-100'>Мижоз буюртмалари : {data?.total_orders}</p>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Маҳсулот номи</th>
                  <th className='min-w-150px'>Нархи</th>
                  <th className='min-w-150px'>Харидларни батафсил кўриш</th>
                  <th className='min-w-150px'>Туман/Шаҳар</th>
                  <th className='min-w-150px'>Тўлов усули</th>
                </tr>
              </thead>

              <tbody>
                {data?.orders?.length &&
                  data?.orders?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>123</div>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>123</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              <button
                                className='btn btn-primary'
                                onClick={() => openModal(item.purchases)}
                              >
                                Харидлар кўриш
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {(() => {
                                if (item.payment_type == 1) {
                                  return <span>Bektemir tumani</span>
                                } else if (item.payment_type == 2) {
                                  return <span>Chilonzor tumani</span>
                                } else if (item.payment_type == 3) {
                                  return <span>Mirobod tumani</span>
                                } else if (item.payment_type == 4) {
                                  return <span>Mirzo Ulug'bek tumani</span>
                                } else if (item.payment_type == 5) {
                                  return <span>Olmazor tumani</span>
                                } else if (item.payment_type == 6) {
                                  return <span>Sergeli tumani</span>
                                } else if (item.payment_type == 7) {
                                  return <span>Shayhontohur tumani</span>
                                } else if (item.payment_type == 8) {
                                  return <span>Uchtepa tumani</span>
                                } else if (item.payment_type == 9) {
                                  return <span>Yakkasaroy tumani</span>
                                } else if (item.payment_type == 10) {
                                  return <span>Yashnobod tumani</span>
                                } else if (item.payment_type == 11) {
                                  return <span>Yunusobod tumani</span>
                                } else {
                                  return <span className='badge badge-info'>Ko'rsatilmagan</span>
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <div className='text-dark fw-bold text-hover-primary fs-6'>
                              {(() => {
                                if (item.payment_type == 1) {
                                  return <span className='badge badge-primary'>Нақд</span>
                                } else if (item.payment_type == 3) {
                                  return <span className='badge badge-success'>Payme/Click</span>
                                } else {
                                  return <span className='badge badge-info'>Перечисления</span>
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
