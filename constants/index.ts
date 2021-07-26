import { ToastPosition } from 'react-hot-toast/dist/core/types'

export enum ProfissionalExperiences {
  ONEYEAR = '1 Ano',
  TWOYEARS = '2 Anos',
  THREEYEARS = '3 Anos',
  FOURYEARS = '4 Anos',
  FIVEYEARS = '5 Anos',
  SIXYEARS = '6 Anos',
  SEVENYEARS = '7 Anos',
  YEARS = '1 Anos',
  EIGTHYEARS = '8 Anos',
  NINEYEARS = '9 Anos',
  TENYEARS = '10 Anos',
  MOREYEARS = '+ 10 Anos'
}

export const toastErrorProps = {
  duration: 4000,
  position: 'top-right' as ToastPosition,
  style: {
    background: '#d85959',
    color: '#fff'
  }
}

export const toastSuccessProps = {
  duration: 4000,
  position: 'top-right' as ToastPosition
}
