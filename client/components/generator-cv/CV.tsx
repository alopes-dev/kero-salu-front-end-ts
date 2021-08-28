import { IContactAttributes, IPersonAttributes } from '@itypes/index'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ExperienceView from './experience'

import {
  Row,
  Col,
  ColRight,
  ColLeft,
  UserAvatar,
  Header,
  SubHeader,
  Title,
  SubTitle,
  DetailsContent,
  Icon,
  ItemContainer,
  ItemValue,
  ItemTitle,
  ItemValueAsEmail,
  ItemSingle
} from './style'
import { DataType } from './types'
import { v4 as uuid } from 'uuid'

type CvViewerProps = {
  candidate: IPersonAttributes
}

const CvViewer: React.FC<CvViewerProps> = ({ candidate }) => {
  const { query } = useRouter()
  const id = `${query.id}`
  const [experiences, setExperiences] = useState<Array<DataType>>([])
  const [curses, setCurses] = useState<Array<DataType>>([])
  const [academies, setAcademies] = useState<Array<DataType>>([])
  const [languages, setLanguages] = useState<
    Array<{ designation: string; id: string }>
  >([])
  const [skills, setSkills] = useState<
    Array<{ designation: string; id: string }>
  >([])
  const [hobbes, setHobbes] = useState<
    Array<{ designation: string; id: string }>
  >([])
  const [contact, setContact] = useState<IContactAttributes>()

  useEffect(() => {
    if (candidate) {
      setExperiences(
        candidate.experiences?.map(item => ({
          title: item.job,
          institute: item.company,
          resume: item.resume,
          startDate: item.startDate,
          endDate: item.endDate
        }))
      )

      setLanguages(
        candidate.languages?.map(item => ({
          designation: item.languages.designation,
          id: item.id
        }))
      )
      setAcademies(
        candidate.academies?.map(
          ({ title, institute, resume, startDate, endDate }) => ({
            title,
            institute,
            resume,
            startDate,
            endDate
          })
        )
      )
      setCurses(
        candidate.curses?.map(
          ({ title, institute, resume, startDate, endDate }) => ({
            title,
            institute,
            resume,
            startDate,
            endDate
          })
        )
      )

      setSkills(
        candidate.skills?.map(item => ({
          designation: item.designation,
          id: item.id
        }))
      )

      setHobbes(
        candidate.hobbes?.map(item => ({
          designation: item.designation,
          id: item.id
        }))
      )
      setContact(candidate?.candidateContact[0]?.contact)
    }
  }, [candidate])

  return (
    <>
      <Row className="mb-2">
        <Col>
          <Header>
            <UserAvatar>
              <img
                width={70}
                height={70}
                src={`http://localhost:5500/files/${candidate?.user?.photoUrl}`}
                alt="user-picture"
              />
            </UserAvatar>
            <SubHeader>
              <Title>{`${candidate?.firstName} ${candidate?.lastName}`}</Title>
              <SubTitle>Frontend - Pleno, Abastece-aí</SubTitle>
            </SubHeader>
          </Header>
        </Col>
      </Row>
      <Row>
        <ColRight>
          <DetailsContent>
            <ItemSingle>
              <Icon>
                <i className="fas fa-layer-group"></i>
              </Icon>
              <ItemContainer>
                <ItemTitle>Resumo profissional</ItemTitle>
                <ItemValue>asasasa</ItemValue>
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>

          <ExperienceView type="experience" data={experiences} />
          <ExperienceView type="curse" data={curses} />
          <ExperienceView type="education" data={academies} />
        </ColRight>
        <ColLeft>
          <DetailsContent>
            <ItemSingle>
              <ItemContainer>
                <ItemTitle>Dados Pessoais</ItemTitle>
                <ItemValue>morada ,</ItemValue>
                <ItemValue>Angola, {contact?.phone}</ItemValue>
                <ItemValueAsEmail>{contact?.email}</ItemValueAsEmail>
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>
          <DetailsContent>
            <ItemSingle>
              <ItemContainer>
                <ItemTitle></ItemTitle>
                <ItemValue>Data / Local de nascimento</ItemValue>
                <ItemValue>{candidate.birthDate}</ItemValue>
                <ItemValue>Luanda</ItemValue>
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>

          <DetailsContent>
            <ItemSingle>
              <ItemContainer>
                <ItemTitle></ItemTitle>
                <ItemValue>Nacionalidade</ItemValue>
                <ItemValue>Cacuaco</ItemValue>
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>

          <DetailsContent>
            <ItemSingle>
              <ItemContainer>
                <ItemTitle>Competências</ItemTitle>
                {skills?.map(item => (
                  <React.Fragment key={uuid()}>
                    <ItemValue>- {item.designation}</ItemValue>
                  </React.Fragment>
                ))}
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>
          <DetailsContent>
            <ItemSingle>
              <ItemContainer>
                <ItemTitle>Idiomas</ItemTitle>
                {languages?.map(item => (
                  <React.Fragment key={uuid()}>
                    <ItemValue>- {item.designation}</ItemValue>
                  </React.Fragment>
                ))}
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>
          <DetailsContent>
            <ItemSingle>
              <ItemContainer>
                <ItemTitle>Hobbies</ItemTitle>
                {hobbes?.map(item => (
                  <React.Fragment key={uuid()}>
                    <ItemValue>- {item.designation}</ItemValue>
                  </React.Fragment>
                ))}
              </ItemContainer>
            </ItemSingle>
          </DetailsContent>
        </ColLeft>
      </Row>
    </>
  )
}

export default CvViewer
