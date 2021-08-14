import React from 'react'

import { v4 as uuid } from 'uuid'
import { formatDate, IconGenerator } from './helper'
import {
  DetailsContent,
  Icon,
  Item,
  ItemContainer,
  ItemDescription,
  ItemSingle,
  ItemTitle,
  ItemTitleSmall
} from './style'
import { ExperienceProps, Type } from './types'

const ExperienceView: React.FC<ExperienceProps> = ({ type, data }) => {
  return (
    <DetailsContent key={uuid()}>
      <ItemSingle>
        <Icon>{IconGenerator[type].icon}</Icon>
        <ItemContainer>
          <Item>
            <ItemTitle>{IconGenerator[type].title}</ItemTitle>
            {data?.map(item => {
              return (
                <React.Fragment key={uuid()}>
                  <ItemTitleSmall>
                    {`${item.title}  na  ${item.institute}  Luanda`}
                    <small className="text-muted">
                      {`${formatDate(item.startDate)}  -  ${formatDate(
                        item.endDate
                      )}`}
                    </small>
                  </ItemTitleSmall>
                  <ItemDescription>{item.resume}</ItemDescription>
                </React.Fragment>
              )
            })}
          </Item>
        </ItemContainer>
      </ItemSingle>
    </DetailsContent>
  )
}

export default ExperienceView
