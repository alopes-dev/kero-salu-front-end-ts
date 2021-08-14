import { VacanceContext } from '@contexts/vacancie'
import React, { useContext } from 'react'
import {
  IoBookmarksOutline,
  IoPeopleOutline,
  IoThumbsUpOutline,
  IoTrashOutline
} from 'react-icons/io5'

import { ContainerCards, Card, Text } from './style'

const ResumeCard: React.FC = () => {
  const {
    candidatureStatus: { subscrib, rejected, approved, vacanceNumber }
  } = useContext(VacanceContext)

  return (
    <ContainerCards>
      <Card>
        <IoPeopleOutline className="users" />
        <Text>
          <h5>Inscritos</h5>
          <small>{subscrib.length}</small>
        </Text>
      </Card>
      <Card>
        <IoBookmarksOutline className="number" />
        <Text>
          <h5>Número de vagas</h5>
          <small>{vacanceNumber}</small>
        </Text>
      </Card>
      <Card>
        <IoThumbsUpOutline className="thumbs" />
        <Text>
          <h5>Selecionados</h5>
          <small>{approved.length}</small>
        </Text>
      </Card>
      <Card>
        <IoTrashOutline className="trash" />
        <Text>
          <h5>Recusados</h5>
          <small>{rejected.length}</small>
        </Text>
      </Card>
    </ContainerCards>
  )
}

export default ResumeCard
