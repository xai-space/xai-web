import { ComponentProps, forwardRef } from 'react'
import {
  SelectProps as MySelectProps,
  FormSelectField as SelectField,
} from './form-field'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

export const FormSelectField = forwardRef<
  HTMLInputElement,
  Omit<MySelectProps, 'render'> & ComponentProps<'input'> & SelectProps
>((props, ref) => {
  const { label, isRequired, error, value, ...restProps } = props

  return (
    <SelectField
      label={label}
      isRequired={isRequired}
      id={restProps.id}
      error={error}
      render={
        <Select {...restProps}>
          <SelectTrigger>
            <SelectValue placeholder={restProps.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {restProps.data?.map((data) => {
              return <SelectItem value={data.value}>{data.label}</SelectItem>
            })}
          </SelectContent>
        </Select>
      }
    />
  )
})
