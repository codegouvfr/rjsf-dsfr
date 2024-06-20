import Input from '@codegouvfr/react-dsfr/Input'
import { WidgetProps } from '@rjsf/utils'
import React from 'react'
import LabelWithHint from './LabelWithHint'

export default function ({
  required,
  placeholder,
  type,
  value,
  onChange,
  uiSchema,
  label,
  id,
  ...rest
}: WidgetProps) {
  if (type === 'date') {
    value =
      uiSchema && uiSchema['ui:currentDate']
        ? value ?? new Date().toISOString().split('T')[0]
        : value
    onChange(value)
  }

  return (
    <Input
      nativeInputProps={{
        type: type,
        required: required,
        placeholder: placeholder,
        onChange: (e) => onChange(e.target.value),
        min: rest.schema.minimum,
        value: value,
      }}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...rest}
    />
  )
}
