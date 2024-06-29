import React from 'react'
import Input from '@codegouvfr/react-dsfr/Input'
import { WidgetProps } from '@rjsf/utils'

export default function ({
  id,
  placeholder,
  value,
  required,
  type,
  uiSchema,
  label,
  disabled,
  autofocus,
  readonly,
  hideError,
  formContext,
  rawErrors,
  options,
  onBlur,
  onFocus,
  onChange,
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
      disabled={disabled}
      nativeInputProps={{
        type,
        required,
        placeholder,
        autoFocus: autofocus,
        readOnly: readonly,
        value,
        onChange: (e) => onChange(e.target.value),
        min: rest.schema.minimum,
      }}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...rest}
    />
  )
}
