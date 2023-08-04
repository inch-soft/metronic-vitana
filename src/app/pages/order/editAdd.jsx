/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {createOrder, editProduct, getProduct, getOrderId} from '../../modules/auth/core/_requests'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {KTIcon} from '../../../_metronic/helpers'
import ProductItem from './productitem'
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
    id: 2,
    name: 'Kuler',
    price: 1500000,
    qty: 0,
  },
  {
    id: 3,
    name: 'Suv 5L',
    price: 5000,
    qty: 5,
  },
  {
    id: 4,
    name: 'Suv 1L',
    price: 1500,
    qty: 24,
  },
]

const EditPageOrder = () => {
  const [paymentType, setPaymentType] = useState(null)
  const [code, setCode] = useState(null)
  const [isCompleted, setIsCompleted] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectRegion, setSelectRegion] = useState(null)
  const [purchases, setPurchases] = useState([])

  const [products, setProducts] = useState([])

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
      setProducts(r.data)
      console.log(r, 'response')
    })
  }, [])

  const submit = () => {
    const formData = {
      payment_type: paymentType,
      customer: +code,
      is_completed: isCompleted,
      region: +selectRegion,
      purchases: purchases,
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

  const handleIncrement = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          qty: product.qty - 1,
        }
      }
      return product
    })

    setProducts(updatedProducts)

    const existingPurchase = purchases.find((purchase) => purchase.purchased_product === productId)
    if (existingPurchase) {
      const updatedPurchases = purchases.map((purchase) => {
        if (purchase.purchased_product === productId) {
          return {
            ...purchase,
            purchased_count: purchase.purchased_count + 1,
          }
        }
        return purchase
      })
      setPurchases(updatedPurchases)
    } else {
      setPurchases([...purchases, {purchased_count: 1, purchased_product: productId}])
    }
  }

  const handleDecrement = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          qty: product.qty + 1,
        }
      }
      return product
    })

    setProducts(updatedProducts)

    const existingPurchase = purchases.find((purchase) => purchase.purchased_product === productId)
    if (existingPurchase) {
      const updatedPurchases = purchases.map((purchase) => {
        if (purchase.purchased_product === productId) {
          return {
            ...purchase,
            purchased_count: purchase.purchased_count - 1,
          }
        }
        return purchase
      })
      setPurchases(updatedPurchases.filter((purchase) => purchase.purchased_count > 0))
    }
  }
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
        <div className='products'>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          ))}
        </div>
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
