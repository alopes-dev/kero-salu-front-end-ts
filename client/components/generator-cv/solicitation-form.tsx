import useIsMounted from '@client/hooks/use-is-mounted'
import { SelectFieldSelectable } from '@components/fields'
import { Select } from '@itypes/index'
import { getDocumentType } from '@services/document-type'
import { transfSelect } from '@utils/index'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SolicitationFormProps } from './types'

// import { Container } from './styles';

const SolicitationForm: React.FC<SolicitationFormProps> = ({
  gettersValue
}) => {
  const { register, getValues, control } = useForm()
  const [DocumentTypes, setDocumentTypes] = useState<ReadonlyArray<Select>>()
  const isMounted = useIsMounted()
  const [documents, setDocuments] = useState<string>('')

  const fetchDocumentType = async () => {
    try {
      const res = await getDocumentType()
      if (isMounted.current) setDocumentTypes(transfSelect(res.data))
    } catch (error) {}
  }

  useEffect(() => {
    fetchDocumentType()
  }, [])

  return (
    <form>
      <div className="px-2 py-5 bg-white space-y-6 ">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-12">
            <SelectFieldSelectable
              options={DocumentTypes}
              labelName="Tipo de Documento"
              name="documentTypeId"
              {...register('documentTypeId')}
              control={control}
              onChange={e => {
                setDocuments(e.value)
                gettersValue({
                  documentTypeId: e.value,
                  description: getValues('description')
                })
              }}
            />
          </div>

          <div className="col-span-12 sm:col-span-12">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              Detalhe dos documentos a solicitar
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Detalhe dos documentos a solicitar..."
                {...register('description')}
                onChange={e => {
                  gettersValue({
                    documentTypeId: documents,
                    description: e.target.value
                  })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SolicitationForm
