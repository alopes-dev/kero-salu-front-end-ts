import useIsMounted from '@client/hooks/use-is-mounted'
import { toastErrorProps } from '@constants/index'
import { AuthContext } from '@contexts/auth'
import { ISkillAttributes } from '@itypes/index'
import { getSkill } from '@services/skill'
import { useAsyncState } from 'just-hook'
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import SkillForm from './skill-form'

import { Container, ContainerSkillItems, SkillItem } from './styles'

const SkillView: React.FC = () => {
  const [showSkills, setShowSkills] = useState<boolean>(false)
  const { user } = useContext(AuthContext)
  const { loading, setLoading, data, setData } = useAsyncState<
    Array<ISkillAttributes>
  >()
  const isMounted = useIsMounted()

  const fetchSkill = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data: res, error, message } = await getSkill(user?.personId)

    if (error) return toast.error(message, toastErrorProps)
    if (isMounted.current) {
      setData(res)
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchSkill()
  }, [fetchSkill])

  return (
    <Container>
      <Toaster />
      <div className="topbar">
        <h3>Minhas Habilidades</h3>
        <span
          className="shadow"
          onClick={() => {
            setShowSkills(prev => !prev)
          }}
        >
          <IoAddCircleOutline />
        </span>
      </div>
      {showSkills && (
        <SkillForm
          setter={() => {
            setShowSkills(false)
            fetchSkill()
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

export default SkillView
