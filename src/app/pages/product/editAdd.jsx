import React, {useEffect, useState} from 'react'
import {
  createProduct,
  getProductId,
  editProduct,
} from '../../modules/auth/core/_requests'
import {useNavigate, useParams} from 'react-router-dom'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {KTIcon} from '../../../_metronic/helpers'

const EditPage = () => {
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  console.log(params.id, 'params')

  useEffect(() => {
    const formData = {
      name,
      price,
    }
    if (params.id) {
      getProductId(formData, params?.id).then((r) => {
        setName(r.data.name)
        setPrice(r.data.price)
      })
    }
  }, [])
  const submit = () => {
    const formData = {
      name,
      price,
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
      createProduct(formData)
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
            placeholder='Называния'
            type='text'
            name='name'
            value={name}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder='Цена'
            type='text'
            name='name'
            value={price}
            className='form-control form-control-solid border mb-3 mb-lg-0'
            autoComplete='off'
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={submit} className='btn btn-primary'>
            Сохранить
          </button>
        </div>
      </div>
    </>
  )
}
export default EditPage
