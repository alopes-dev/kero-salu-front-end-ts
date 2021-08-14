import useIsMounted from '@client/hooks/use-is-mounted'
import { toastErrorProps } from '@constants/index'
import { AuthContext } from '@contexts/auth'
import { IHobbesAttributes } from '@itypes/index'
import { getHobbes } from '@services/hobbes'
import { useAsyncState } from 'just-hook'
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import HobbesForm from './hobbs-form'

import { Container, ContainerSkillItems, SkillItem } from './styles'

const HobbesView: React.FC = () => {
  const [showHobbes, setShowHobbes] = useState<boolean>(false)
  const { user } = useContext(AuthContext)
  const { loading, setLoading, data, setData } = useAsyncState<
    Array<IHobbesAttributes>
  >()
  const isMounted = useIsMounted()

  const fetchHobbes = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data: res, error, message } = await getHobbes(user?.personId)

    if (error) return toast.error(message, toastErrorProps)
    if (isMounted.current) {
      setData(res)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchHobbes()
  }, [fetchHobbes])

  return (
    <Container>
      <Toaster />
      <div className="topbar">
        <h3>Meus Hobbes</h3>
        <span
          className="shadow"
          onClick={() => {
            setShowHobbes(prev => !prev)
          }}
        >
          <IoAddCircleOutline />
        </span>
      </div>
      {showHobbes && (
        <HobbesForm
          setter={() => {
            setShowHobbes(false)
            fetchHobbes()
          }}
        />
      )}
      <ContainerSkillItems>
        {data?.map(item => (
          <SkillItem key={item.id} className="shadow">
            <span>{item.designation}</span>
            <IoRemoveCircleOutline />
          </SkillItem>
        ))}
      </ContainerSkillItems>
    </Container>
  )
}

export default HobbesView
