import React, { useCallback, useEffect, useState } from 'react'
import { LanguageContainer, LanguageItems, UserInfoDetails } from '../styles'
import { v4 as uuid } from 'uuid'
import {
  IoAddCircleOutline,
  IoCheckmarkDoneOutline,
  IoCheckmarkOutline,
  IoChevronForwardOutline
} from 'react-icons/io5'
import {
  getLanguage,
  getPersonLanguage,
  postPersonLanguage,
  removePersonLanguage
} from '@services/language'
import useIsMounted from '@client/hooks/use-is-mounted'
import { Select } from '@itypes/index'
import { transfSelect } from '@utils/index'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'
import toast, { Toaster } from 'react-hot-toast'
import { toastErrorProps } from '@constants/index'
import { toastSuccessProps } from '@constants/index'

type Languages = {
  id: string
  designation: string
  accepted: boolean
  plangId: string
}

const Languages: React.FC = () => {
  const { user } = useContext(AuthContext)
  const isMounted = useIsMounted()
  const [languages, setLanguages] = useState<ReadonlyArray<Languages>>()

  const handleSave = async (languageId: string) => {
    const { error, message } = await postPersonLanguage({
      languageId,
      personId: user.personId
    })

    if (error) return toast.error(message, toastErrorProps)

    toast.success('idioma adicionada.', toastSuccessProps)
    fetchLanguage()
  }

  const handleRemove = async (languageId: string) => {
    const { error, message } = await removePersonLanguage(languageId)

    if (error) return toast.error(message, toastErrorProps)

    toast.success('idioma removido.', toastSuccessProps)
    fetchLanguage()
  }

  const fetchLanguage = useCallback(async () => {
    try {
      const res = await getLanguage()

      const persons = await getPersonLanguage(user.personId)

      const langs = persons.data.map(item => item.languageId)
      const languagesMapped = res.data.map(item => ({
        ...item,
        plangId: persons.data.find(lang => lang.languageId === item.id)?.id,
        accepted: langs.includes(item.id)
      }))

      if (isMounted.current) setLanguages(languagesMapped)
    } catch (error) {}
  }, [])

  useEffect(() => {
    fetchLanguage()
  }, [fetchLanguage])

  return (
    <LanguageContainer>
      <Toaster />
      {languages?.map(item => (
        <LanguageItems key={uuid()}>
          <div className="item-iconed">
            <span>{item.designation}</span>
          </div>
          <span
            onClick={() => {
              if (!item.accepted) handleSave(item.id)
              else handleRemove(item.plangId)
            }}
          >
            {item.accepted ? <IoCheckmarkOutline /> : <IoAddCircleOutline />}
          </span>
        </LanguageItems>
      ))}
    </LanguageContainer>
  )
}

export default Languages
