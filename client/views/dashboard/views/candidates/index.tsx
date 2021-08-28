import { FC, useCallback, useContext } from 'react'
import GenericTable from '@components/table'
import Profile from '@components/table/components/profile'
import Card from '@components/card'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import { useEffect } from 'react'
import { getPersonFromVacance } from '@services/person'
import { AuthContext } from '@contexts/auth'
import { useState } from 'react'
import { IPersonAttributes } from '@itypes/index'
import FilterForm from './filter'
//`${candidate.firstName} ${candidate.lastName}`

export const candidateParser = (candidates: Array<IPersonAttributes>) => {
  return candidates?.map(candidate => ({
    ...candidate,
    name: (
      <Profile
        name={`${candidate.firstName} ${candidate.lastName}`}
        info={`${candidate.user.email}`}
        image={`http://localhost:5500/files/${candidate?.user?.photoUrl}`}
      />
    ),
    age: candidate.birthDate
  }))
}

const Candidates: FC = () => {
  const { push } = useRouter()
  const { user } = useContext(AuthContext)
  const [candidates, setCandidates] = useState<Array<IPersonAttributes>>()
  const [dataFilter, setDataDFilter] = useState<Array<any>>()

  const fetchPersonFromVacance = useCallback(async () => {
    if (user) {
      const res = await getPersonFromVacance(user?.companyId)
      setCandidates(candidateParser(res) || [])
      setDataDFilter(res || [])
    }
  }, [user])

  useEffect(() => {
    fetchPersonFromVacance()
  }, [fetchPersonFromVacance])

  return (
    <Card classNames="bg-white shadow rounded-lg lg:pt-5 sm:px-6 lg:px-0">
      <div
        className="lg:flex lg:flex-end lg:flex-end px-4 pb-4"
        style={{ justifyContent: 'space-between' }}
      >
        <FilterForm data={dataFilter || []} triggerEvent={setCandidates} />
      </div>

      <GenericTable
        onShow={data => {
          push(`/dashboard/candidate/${data.id}/detail`).then()
        }}
        columns={[
          { label: 'Nome', key: 'name' },
          { key: 'age', label: 'Data de Nascimento' },
          { key: 'address', label: 'Morada' }
        ]}
        data={candidates}
      />
    </Card>
  )
}

export default Candidates
