import { IVacanciesAttributes } from '@itypes/index'
import { FC } from 'react'
import { IoMegaphoneOutline } from 'react-icons/io5'

import {
  VacanciesContainer,
  VacancieTitle,
  VacanciePrice,
  ListOfDetails,
  ListItem,
  ActionsButton,
  Button,
  ListItems
} from './style'

type VacanciesListProps = {
  vacance: IVacanciesAttributes
}

export const formateDate = (date: string | undefined) => {
  if (!date) return 'sem data limite'
  return new Date(date).toDateString()
}
const VacanciesList: FC<VacanciesListProps> = ({ vacance }) => {
  return (
    <VacanciesContainer>
      <VacancieTitle>{vacance?.functionType?.designation}</VacancieTitle>
      <VacanciePrice>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'AOA'
        }).format(vacance?.salary)}
        <small>/mês</small>
      </VacanciePrice>

      <ListOfDetails>
        <ListItems>
          <ListItem>Contrato</ListItem>
          <ListItem>{vacance?.job?.designation}</ListItem>
        </ListItems>
        <ListItems>
          <ListItem>Experiência</ListItem>
          <ListItem>{vacance?.experience}</ListItem>
        </ListItems>
        <ListItems>
          <ListItem>Número de vagas</ListItem>
          <ListItem>{vacance?.numVacancies}</ListItem>
        </ListItems>
        <ListItems>
          <ListItem>Data Limite</ListItem>
          <ListItem>{formateDate(vacance?.limitDate)}</ListItem>
        </ListItems>
        <ListItems>
          <ListItem>Carga Horária</ListItem>
          <ListItem>{vacance?.limitHours} hrs</ListItem>
        </ListItems>
      </ListOfDetails>

      <ActionsButton>
        <Button>
          <IoMegaphoneOutline className="accept" />
          Propor
        </Button>
      </ActionsButton>
    </VacanciesContainer>
  )
}

export default VacanciesList
