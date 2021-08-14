import React, { useCallback, useEffect, useState } from 'react'
import {
  IoAddCircleOutline,
  IoAddOutline,
  IoSchoolOutline
} from 'react-icons/io5'

import { ContainerCrono, Loading } from '../styles'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import ExperienceForm from './experience-form'
import { getExperience } from '@services/experience'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'
import { useAsyncState } from 'just-hook'
import { IExperienceAttributes } from '@itypes/index'
import { toastErrorProps } from '@constants/index'
import toast from 'react-hot-toast'
import useIsMounted from '@client/hooks/use-is-mounted'
import { v4 as uuid } from 'uuid'
const getIconStyled = (check: number) => {
  if (check === 1) return { background: 'rgb(58, 32, 131)', color: '#fff' }
  return { background: 'rgb(233, 30, 99)', color: '#fff' }
}

const getContentStyled = (check: number) => {
  if (check === 1)
    return {
      background: 'rgb(58, 32, 131)',
      color: '#fff',
      height: '140px'
    }
  return {
    height: '140px'
  }
}

const getContentArrowStyled = (check: number) => {
  if (check === 1) return { borderRight: '7px solid  rgb(58, 32, 131)' }
  return {}
}

const getPeriods = (item: IExperienceAttributes) => {
  if (item.untillNow === 1)
    return `${new Date(item.startDate).getFullYear()} - presente`
  return `${new Date(item.startDate).getFullYear()} - ${new Date(
    item.endDate
  ).getFullYear()}`
}

const Experience: React.FC = () => {
  const [toggleExperience, setToggleExperience] = useState(false)
  const { user } = useContext(AuthContext)
  const { loading, setLoading, data, setData } = useAsyncState<
    Array<IExperienceAttributes>
  >()
  const isMounted = useIsMounted()

  const fetchExperience = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data: res, error, message } = await getExperience(user?.personId)

    if (error) return toast.error(message, toastErrorProps)
    if (isMounted.current) {
      setData(res)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchExperience()
  }, [fetchExperience])

  const content = () => {
    if (loading)
      return (
        <Loading>
          <span>loading</span>
        </Loading>
      )

    return (
      <VerticalTimeline animate={false}>
        {data?.map(item => (
          <VerticalTimelineElement
            key={uuid()}
            className="vertical-timeline-element--work"
            contentStyle={getContentStyled(item.untillNow)}
            contentArrowStyle={getContentArrowStyled(item.untillNow)}
            date={getPeriods(item)}
            iconStyle={getIconStyled(item.untillNow)}
            icon={<IoSchoolOutline />}
          >
            <h6 className="vertical-timeline-element-title">{item.job}</h6>
            <small className="vertical-timeline-element-subtitle">
              {item.company}
            </small>
            <p> {item.resume}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    )
  }

  return (
    <ContainerCrono>
      <div className="topbar">
        <h4>Experiência</h4>
        <span
          className="shadow"
          onClick={() => {
            setToggleExperience(prev => !prev)
          }}
        >
          <IoAddCircleOutline />
        </span>
      </div>

      {toggleExperience && (
        <ExperienceForm
          setter={() => {
            fetchExperience()
            setToggleExperience(false)
          }}
        />
      )}
      {content()}
    </ContainerCrono>
  )
}

export default Experience
