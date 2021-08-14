import { useRouter } from 'next/router'
import React from 'react'
import { IoHeartOutline } from 'react-icons/io5'
import {
  CompanyContent,
  CompanyImage,
  CompanyInfoContainer,
  ContentIcon,
  Items
} from './style'
import { ItemsJobProps } from './types'

const ItemsJobs: React.FC<ItemsJobProps> = ({ job, active }) => {
  const { push } = useRouter()
  return (
    <Items
      active={active}
      onClick={() => {
        push(`/mobile/job/${job.id}`)
      }}
      className="shadow"
      key={job.id}
    >
      <CompanyImage>
        <img src={job.avatar} alt={`${job.title}${job.id}`} />
      </CompanyImage>
      <CompanyInfoContainer>
        <CompanyContent active={active}>
          <h4>{job.comapany}</h4>
          <span>{job.title}</span>
          <small>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'AOA'
            }).format(Number(job?.salary))}
            - <small>Luanda, Angola</small>
          </small>
        </CompanyContent>
        <ContentIcon active={active} isFavorite={true}>
          <span onClick={() => {}}>
            <IoHeartOutline size={19} />
          </span>
          <small>3d</small>
        </ContentIcon>
      </CompanyInfoContainer>
    </Items>
  )
}

export default ItemsJobs
