/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {
  createOrder,
  getProductId,
  editProduct,
  deleteProduct,
  getProduct,
  createManager,
} from '../../modules/auth/core/_requests'
import {useNavigate, useParams} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {KTIcon} from '../../../_metronic/helpers'

const AddManager = () => {
  const [userName, setUsername] = useState(null)
  const [name, setName] = useState(null)
  const [lastName, setLastname] = useState(null)
  const [email, setEmail] = useState(null)
  const [parol, setParol] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  console.log(params.id, 'params')

  const submit = () => {
    const formData = {
      username: userName,
      password: parol,
      email: email,
      last_name: lastName,
      first_name: name,
    }

    createManager(formData)
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

  return (
    <>
      <button onClick={() => navigate(-1)} className='btn btn-info mb-5'>
        <KTIcon iconName='black-left' className='fs-2' /> Назад
      </button>
      <div className='card p-3 mw-20'>
        <div className='d-flex gap-2'>
          <div className='w-100'>
            <label className='fw-bold'>Имя пользователя</label>
            <input
              placeholder='Имя пользователя'
              type='text'
              name='name'
              value={userName}
              className='form-control form-control-solid border mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='w-100'>
            <label className='fw-bold'>Имя</label>
            <input
              placeholder='Имя'
              type='text'
              name='name'
              value={name}
              className='form-control form-control-solid border mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='w-100'>
            <label className='fw-bold'>Фамилия</label>
            <input
              placeholder='Фамилия'
              type='text'
              name='name'
              value={lastName}
              className='form-control form-control-solid border mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className='w-100'>
            <label className='fw-bold'>Email</label>
            <input
              placeholder='Email'
              type='text'
              name='name'
              value={email}
              className='form-control form-control-solid border mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='w-100'>
            <label className='fw-bold'>Password</label>
            <input
              placeholder='Password'
              type='text'
              name='name'
              value={parol}
              className='form-control form-control-solid border mb-3 mb-lg-0'
              autoComplete='off'
              onChange={(e) => setParol(e.target.value)}
            />
          </div>
        </div>
        <div className='d-flex align-items-end justify-content-end'>
          <div></div>
          <button onClick={submit} className='btn btn-primary'>
            Сохранить
          </button>
        </div>
      </div>
    </>
  )
}
export default AddManager

// naqt, perecheslaniy, kartadan
