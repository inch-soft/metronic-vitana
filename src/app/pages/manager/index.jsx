/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Pagination} from '@nextui-org/react'
import {Link} from 'react-router-dom'
import {createManager, getManagers} from '../../modules/auth/core/_requests'
import {toast} from 'react-toastify'
import moment from 'moment'
const Manager = ({className = 'mb-5 mb-xl-8'}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    renderOrder()
  }, [])

  const renderOrder = () => {
    getManagers().then((r) => {
      setData(r.data)
    })
  }

  return (
    <>
      <div className='card'>
        <div className='card-body py-3  gap-2 align-items-center'>
          <div>
            <div>
              <label className='mb-2 fw-bold'>Наименование Менеджеры</label>
              <input
                placeholder='Наименование товара'
                className='form-control form-control-solid border mb-3 mb-lg-0'
                type='text'
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={`card ${className}`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Менеджеры </span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              Менеджеры: {data?.results?.length}
            </span>
          </h3>
          <div
            className='card-toolbar'
            data-bs-toggle='tooltip'
            data-bs-placement='top'
            data-bs-trigger='hover'
            title='Click to add a user'
          >
            <Link to='/manager/add' className='btn btn-sm btn-light-primary'>
              <KTIcon iconName='plus' className='fs-3' />
              Добавить менеджеры
            </Link>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-140px'>Имя пользователя</th>
                  <th className='min-w-140px'>Имя</th>
                  <th className='min-w-140px'>Фамилия</th>
                </tr>
              </thead>

              <tbody>
                {data?.length &&
                  data?.map((item, index) => (
                    <tr key={index}>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item.username}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item?.first_name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className='text-end'>
                        <div className='d-flex flex-column w-100 me-2'>
                          <div className='d-flex flex-stack mb-2'>
                            <span className='text-dark fw-bold fs-7 fw-semibold'>
                              {item?.last_name}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* <div className='d-flex justify-content-center py-10'>
            <Pagination total={20} initialPage={1} />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Manager
