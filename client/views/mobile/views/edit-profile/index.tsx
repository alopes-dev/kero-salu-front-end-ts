import { FC, useState } from 'react'
import SignUpForm from './sign-up-form'
import { Container, ArtContainer, FormContainer, othersStyles } from './styles'
import { useMediaQuery } from 'beautiful-react-hooks'
import { ActionsTopContainer } from '../home/views/profile/styles'
import {
  IoChevronBackOutline,
  IoDocumentAttachOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoShieldOutline
} from 'react-icons/io5'
import { useRouter } from 'next/router'

const favoriteButtonStyle = {
  borderRadius: '15px',
  width: '20%',
  border: '1px solid #f59595'
}

const applyButtonStyle = {
  width: '80%',
  borderRadius: '15px',
  backgroundColor: '#0d1146'
}

const tabButtonStyle = {
  opacity: '0.6',
  backgroundColor: '#ccc',
  borderRadius: '15px'
}

const buttonAtive = {
  backgroundColor: '#0d1146',
  color: '#fff',
  borderRadius: '15px'
}

type DetailRender = 'RESET_PW' | 'RESET_USER_INFO'

const generateButtonStyle = (isOk: boolean) => ({
  ...applyButtonStyle,
  backgroundColor: !isOk ? '#0d1146' : '#ccc',
  color: !isOk ? '#fff' : '#000',
  opacity: !isOk ? 1 : 0.6
})

const EditProfileView: FC = () => {
  const matches = useMediaQuery('(max-width: 48rem)')
  const { back } = useRouter()
  const [detailRender, setDetailRender] = useState<DetailRender>(
    'RESET_USER_INFO'
  )

  return (
    <Container>
      <ActionsTopContainer>
        <span
          onClick={() => {
            back()
          }}
        >
          <IoChevronBackOutline />
        </span>
      </ActionsTopContainer>
      <FormContainer style={{ width: matches ? '100%' : '48%' }}>
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <p className="flex mb-2 pt-5">
              <button
                style={
                  detailRender === 'RESET_USER_INFO'
                    ? { ...buttonAtive }
                    : { ...tabButtonStyle }
                }
                onClick={() => setDetailRender('RESET_USER_INFO')}
                className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black outline-none  `}
              >
                <IoPersonOutline className="mr-3" size={20} /> Descrição
              </button>
              <button
                style={
                  detailRender === 'RESET_PW'
                    ? { ...buttonAtive }
                    : { ...tabButtonStyle }
                }
                onClick={() => setDetailRender('RESET_PW')}
                className="group relative ml-3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black outline-none  "
              >
                <IoEyeOutline className="mr-3" size={20} /> Reset Senha
              </button>
            </p>
            <SignUpForm formActive={detailRender} />
          </div>
        </div>
      </FormContainer>
    </Container>
  )
}

export default EditProfileView
