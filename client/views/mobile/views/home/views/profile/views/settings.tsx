import React from 'react'
import {
  IoCheckmarkCircleOutline,
  IoHeartOutline,
  IoTrashOutline
} from 'react-icons/io5'
import { ActionBottomContainer } from '../../styles'

import { Container } from './styles'

const SettingsView: React.FC = () => {
  return (
    <Container>
      <div className="flex mb-2 px-2">
        <button
          onClick={() => {
            alert('Cancelar a conta')
          }}
          style={{
            width: '100%',
            marginTop: '60px',
            color: 'white',
            backgroundColor: '#a72525'
          }}
          className="relative ml-3 flex justify-center flex  py-3 px-4 border border-transparent text-md font-bold rounded-md  outline-none  "
        >
          <IoTrashOutline
            className="mr-3"
            style={{
              backgroundColor: '#a72525'
            }}
            size={23}
          />
          <small className="mt-1">Cancelar a conta</small>
        </button>
      </div>
    </Container>
  )
}

export default SettingsView
