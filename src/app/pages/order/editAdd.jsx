/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {createOrder, editProduct, getProduct, getOrderId} from '../../modules/auth/core/_requests'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {KTIcon} from '../../../_metronic/helpers'

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

const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  // Add more products here as needed
]

const EditPageOrder = () => {
  const [paymentType, setPaymentType] = useState(null)
  const [code, setCode] = useState(null)
  const [isCompleted, setIsCompleted] = useState(null)
  const [product, setProduct] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectRegion, setSelectRegion] = useState(null)

  // FILTER
  // FILTER

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const formData = {
      payment_type: paymentType,
      code,
      is_completed: isCompleted,
      products: selectedOptions,
      region: +selectRegion,
    }
    if (params.id) {
      getOrderId(formData, params?.id).then((r) => {
        console.log(r, 'reponse')
        setIsCompleted(r.data.is_completed)
        setPaymentType(r.data.payment_type)
      })
    }

    getProduct({
      all: true,
    }).then((r) => {
      setProduct(r.data)
    })
  }, [])

  const submit = () => {
    const formData = {
      payment_type: paymentType,
      customer: +code,
      is_completed: isCompleted,
      products: selectedOptions,
      region: +selectRegion,
    }
    if (params.id) {
      editProduct(formData, params.id)
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
      createOrder(formData)
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

  const [count, setCount] = useState(0) // useState returns a pair. 'count' is the current state. 'setCount' is a function we can use to update the state.

  function increment() {
    //setCount(prevCount => prevCount+=1);
    setCount(function (prevCount) {
      return (prevCount += 1)
    })
  }

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1)
      } else {
        return (prevCount = 0)
      }
    })
  }

  const handleOptionClick = (optionValue) => {
    console.log(optionValue, 'select123')

    const isOptionSelected = selectedOptions.includes(optionValue)
    if (isOptionSelected) {
      setSelectedOptions(selectedOptions.filter((value) => value !== optionValue))
    } else {
      setSelectedOptions([...selectedOptions, optionValue])
    }
  }

  const isOptionSelected = (optionValue) => selectedOptions.includes(optionValue)
  console.log(selectedOptions, ':selectr')

  return (
    <>
      <button onClick={() => navigate(-1)} className='btn btn-info mb-5'>
        <KTIcon iconName='black-left' className='fs-2' /> Назад
      </button>
      <div className='card p-3 mw-20'>
        <div className='d-flex gap-2'>
          <div className='w-100'>
            <label className='fw-bold'>Код клиента</label>
            <input
              placeholder='Код клиента'
              type='text'
              name='name'
              value={code}
              className='form-control form-control-solid border mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className='w-100'>
            <label className='fw-bold'>Способ оплата </label>
            <select
              className='form-control form-control-solid border mb-3 mb-lg-0'
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value=''>Выберите способ оплаты</option>
              <option value={1}>Наличии</option>
              <option value={3}>Перечесления </option>
              <option value={2}>Payme/Click</option>
            </select>
          </div>

          <div className='w-100'>
            <label className='fw-bold'>Cтатус </label>
            <select
              value={isCompleted}
              onChange={(e) => setIsCompleted(e.target.value)}
              className='form-control form-control-solid border mb-3 mb-lg-0'
            >
              <option>Выберите способ cтатус</option>
              <option value={false}>Открыт</option>
              <option value={true}>Доставлено клиенту</option>
            </select>
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
        {/* <div className='multiselect-dropdown'>
          <div className='selected-options'>
            {selectedOptions.map((optionValue) => (
              <div key={optionValue} className='selected-option active'>
                {product.find((option) => option.id === optionValue).name}
                <button onClick={() => handleOptionClick(optionValue)}>x</button>
              </div>
            ))}
          </div>
          <div className='dropdown'>
            <div className='dropdown-header'>
              {selectedOptions.length > 0 ? `${selectedOptions.length} selected` : 'Select options'}
            </div>
            <ul className='dropdown-options'>
              {product.map((option) => (
                <li
                  key={option.id}
                  className={isOptionSelected(option.name) ? 'option active' : 'option'}
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-140px'> Маҳсулот номи</th>
                <th className='min-w-140px'> Маҳсулот нархи</th>
                <th className='min-w-140px'>Буюртма сони</th>
              </tr>
            </thead>

            <tbody>
              {product.length &&
                product.map((item) => (
                  <tr key={item.id}>
                    <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-dark fw-bold fs-7 fw-semibold'>{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-dark fw-bold fs-7 fw-semibold'>{item.price}</span>
                        </div>
                      </div>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-dark fw-bold fs-7 fw-semibold'>
                            <div className='btnIncre'>
                              <button onClick={decrement}>-</button>
                              <div>{count}</div>
                              <button onClick={increment}>+</button>
                            </div>
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div> */}

        <div className='d-flex align-items-end justify-content-end'>
          <button onClick={submit} className='btn btn-primary'>
            Сохранить
          </button>
        </div>
      </div>
    </>
  )
}
export default EditPageOrder

// naqt, perecheslaniy, kartadan
