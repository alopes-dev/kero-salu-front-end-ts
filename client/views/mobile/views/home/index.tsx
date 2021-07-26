import { getAllVacancies } from '@services/vacancies'
import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { IoFilterOutline, IoHeartOutline } from 'react-icons/io5'
import ItemsJobs from './items'
import {
  CompanyContent,
  CompanyImage,
  CompanyInfoContainer,
  ContentIcon,
  IconFilter,
  Items,
  VagasList
} from './style'
import { Job } from './types'

const jobsHardCoded = [
  {
    image: '/img/k2.svg',
    name: 'Bai Seguros',
    id: 'any-id',
    priceFormatted: 'Full time UI Design'
  },
  {
    image: '/img/pic.jpeg',
    name: 'Internacional Seguros',
    id: 'id-any',
    priceFormatted: 'Full time Balconista'
  }
]

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Array<Job>>([])

  const fethJobs = useCallback(async () => {
    try {
      const res = await getAllVacancies()
      if (res.error) alert('Something went bad')

      setJobs(
        res.data.map(item => ({
          id: item.id,
          avatar: '/img/pic.jpeg',
          title: item.functionType?.designation,
          salary: item.salary,
          comapany: item.company?.designation,
          time: item.createdAt
        }))
      )
    } catch (error) {}
  }, [])

  useEffect(() => {
    fethJobs()
  }, [])

  return (
    <div>
      <header className="">
        <div className="max-w-7xl mx-auto py-3 ">
          <div className="flex justify-between">
            <div>
              <h1 style={{ fontSize: '25px' }} className="font-bold text-black">
                UI/UX Design
              </h1>
              <small>32 vagas de emprego</small>
            </div>
            <IconFilter className="shadow">
              <IoFilterOutline size={20} />
            </IconFilter>
          </div>

          <div className="flex mb-2 pt-3">
            <button
              style={{ borderRadius: '15px' }}
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 "
            >
              Mais relevante
            </button>
            <button
              style={{
                opacity: '0.6',
                backgroundColor: '#ccc',
                borderRadius: '15px'
              }}
              className="group relative ml-3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black outline-none  "
            >
              Mais recente
            </button>
          </div>
        </div>
      </header>
      {jobs.length === 0 && 'loaing'}
      <VagasList>
        {jobs.map(job => (
          <ItemsJobs active={job.comapany === 'BAI Seguros'} job={job} />
        ))}
      </VagasList>
    </div>
  )
}

export default Home
