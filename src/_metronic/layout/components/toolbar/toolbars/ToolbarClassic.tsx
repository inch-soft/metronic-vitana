/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {CreateAppModal} from '../../../../partials'
import {useLayout} from '../../../core'

const ToolbarClassic = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)

  return (
    <div className='d-flex align-items-center gap-2 gap-lg-3'>
      {/* {config.app?.toolbar?.filterButton && (
        <div className='m-0'>
          <a
            href='#'
            className={clsx('btn btn-sm btn-flex fw-bold', daterangepickerButtonClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            <KTIcon iconName='filter' className='fs-6 text-muted me-1' />
            Filter
          </a>
          <Dropdown1 />
        </div>
      )} */}

      {/* {config.app?.toolbar?.daterangepickerButton && (
        <div
          data-kt-daterangepicker='true'
          data-kt-daterangepicker-opens='left'
          className={clsx(
            'btn btn-sm fw-bold  d-flex align-items-center px-4',
            daterangepickerButtonClass
          )}
        >
          <div className='text-gray-600 fw-bold'>Loading date range...</div>
          <KTIcon iconName='calendar-8' className='fs-1 ms-2 me-0' />
        </div>
      )} */}

      {/* {config.app?.toolbar?.secondaryButton && (
        <a href='#' className='btn btn-sm btn-flex btn-light fw-bold'>
          Filter
        </a>
      )}

      {config.app?.toolbar?.primaryButton && (
        <a
          href='#'
          onClick={() => setShowCreateAppModal(true)}
          className='btn btn-sm fw-bold btn-primary'
        >
          Create
        </a>
      )} */}
      <CreateAppModal show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />
    </div>
  )
}

export {ToolbarClassic}
