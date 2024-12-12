import { FormTextareaField } from '@/components/form-field'
import { FormInputField } from '@/components/form-input-field'
import { FormSelectField } from '@/components/form-select-field'
import ImageUpload from '@/components/image-upload'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { createField, useFields } from '@/hooks/use-fields'
import { useUploadImage } from '@/hooks/use-upload-image'
import { isEmpty } from 'lodash'
import { nanoid } from 'nanoid'
import { DOMAttributes, FormEvent, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoAdd } from 'react-icons/io5'
import { toast } from 'sonner'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { RiNftFill } from 'react-icons/ri'
import { apiUrl, staticUrl } from '@/config/url'
import { aiApi } from '@/api/ai'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { defaultAgentLogo } from '@/config/link'
import { defaultUserId } from '@/config/base'

export const AIAgentCreateForm = () => {
  const { t } = useTranslation()
  const inputId = useMemo(nanoid, [])
  const isPublicId = useMemo(nanoid, [])
  const nameId = useMemo(nanoid, [])
  const descId = useMemo(nanoid, [])
  const greetingId = useMemo(nanoid, [])

  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [submiting, setSubmiting] = useState(false)

  const { fields, updateField, clearField } = useFields({
    name: createField({}),
    desc: createField({}),
    greeting: createField({}),
    isPublic: createField({
      value: '1',
    }),
    logoIdentify: createField({
      value: '0',
    }),
  })

  let { isUploading, blobUrl, onChangeUpload, onSubmitImg, clearFile } =
    useUploadImage({
      inputEl: inputRef.current,
      showToast: false,
    })

  const SelectPermission = [
    {
      value: '0',
      label: <div>{t('only.self')}</div>,
    },
    {
      value: '1',
      label: <div>{t('everyone.visible')}</div>,
    },
  ]

  const onChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: 'name' | 'isPublic' | 'logoIdentify' | 'desc' | 'greeting'
  ) => {
    updateField(fieldName, { value: target.value })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setSubmiting(true)

      const url = await onSubmitImg()

      const { data } = await aiApi.createAgent({
        name: fields.name.value,
        user_id: defaultUserId,
        is_public: fields.isPublic.value,
        logo: Array.isArray(url) ? url[0] : url || '',
        greeting: fields.greeting.value,
        instructions: [],
        description: fields.desc.value,
        logo_identify: fields.logoIdentify.value,
      })

      router.replace(`${Routes.AIChat}/${data.agent_id}`)
      toast.success(t('create.agent.success'))
      clearField()
      clearFile()
    } catch (e: any) {
      toast.warning(t('create.agent.errpr') + e.toString())
    } finally {
      setSubmiting(false)
    }
  }

  return (
    <form
      ref={formRef}
      className="flex flex-col w-full px-[20%] max-sm:px-[5%]"
      onSubmit={onSubmit}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative cursor-pointer w-[100px] mx-auto">
            <img
              src={blobUrl[0] ? blobUrl[0] : defaultAgentLogo}
              alt="Logo"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-cover border-white border rounded-full"
            />
            <div className="absolute right-0 bottom-0 flex justify-center items-center rounded-full bg-[#616fd6]">
              <IoAdd size={32} color="#ffffff"></IoAdd>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center space-x-[5px]"
            onClick={() => {
              inputRef.current?.click()
              fields.logoIdentify.value = '0'
            }}
          >
            <MdOutlinePhotoSizeSelectActual size={20} />
            <span>{t('local.upload')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center space-x-[5px]"
            onClick={() => {
              fields.logoIdentify.value = '1'
            }}
          >
            <RiNftFill size={20} color="#FFBC58FF" />
            <span className="text-[#FFBC58FF]">{t('use.nft.profile')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ImageUpload
        id={inputId}
        ref={inputRef}
        onChange={onChangeUpload}
        className="hidden ml-2"
      />

      <FormInputField
        id={nameId}
        label={t('name')}
        placeholder={t('name.input')}
        value={fields.name.value}
        disabled={submiting}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e, 'name')}
      />
      <div className="mt-2"></div>

      <FormTextareaField
        id={descId}
        label={t('description')}
        placeholder={t('description.input')}
        value={fields.desc.value}
        disabled={submiting}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e, 'desc')}
        rows={3}
      />
      <div className="mt-2"></div>

      <FormInputField
        id={greetingId}
        label={t('welcome,msg')}
        placeholder={t('welcome.input')}
        value={fields.greeting.value}
        disabled={submiting}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e, 'greeting')}
      />
      <div className="mt-2"></div>

      <FormSelectField
        id={isPublicId}
        label={t('power.settting')}
        disabled={submiting}
        defaultValue={'1'}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => onChange(e, 'logoIdentify')}
        data={SelectPermission}
      />

      <Button
        type="submit"
        className="mt-5 !mx-auto w-full"
        disabled={
          !blobUrl.length ||
          isEmpty(fields.name.value) ||
          isEmpty(fields.logoIdentify.value) ||
          isEmpty(fields.desc.value) ||
          isUploading
        }
      >
        {submiting ? t('submiting') : t('create.agent')}
      </Button>
    </form>
  )
}
