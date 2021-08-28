import { TextField } from '@components/fields'
import { getAllVacancies } from '@services/vacancies'
import React, { ChangeEvent } from 'react'
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

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [jobReceip, setJobReceip] = useState<Array<Job>>([])

  const fethJobs = useCallback(async () => {
    try {
      const res = await getAllVacancies()
      if (res.error) alert('Something went bad')
      const receip = res.data.map(item => ({
        id: item.id,
        avatar: item.user?.photoUrl,
        title: item.functionType?.designation,
        salary: item.salary,
        comapany: item.company?.designation,
        time: item.createdAt
      }))

      setJobs(receip)
      setJobReceip(receip)
    } catch (error) {}
  }, [])

  useEffect(() => {
    fethJobs()
  }, [fethJobs])

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target
    const newJobs = jobReceip.filter(
      item =>
        item?.comapany
          ?.toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
        item?.time?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        item?.salary?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        item?.title?.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )

    setJobs(newJobs)
  }

  return (
    <div>
      <header className="">
        <div className="max-w-7xl mx-auto py-3 ">
          <div className="flex justify-between">
            <div>
              <h1 style={{ fontSize: '25px' }} className="font-bold text-black">
                Vagas
              </h1>
              <small>{jobs.length} vagas de emprego</small>
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
        <TextField
          id="search"
          name="search"
          type="text"
          required
          onChange={handleChange}
          className="appearance-none rounded relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Pesquisar vaga"
        />
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
