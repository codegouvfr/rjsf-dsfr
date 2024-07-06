import React from 'react'
import Input from '@codegouvfr/react-dsfr/Input'
import {
  FormContextType,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils'

export default function <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
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
}: WidgetProps<T, S, F>) {
  if (type === 'date') {
    value =
      uiSchema && uiSchema['ui:currentDate']
        ? value ?? new Date().toISOString().split('T')[0]
        : value
    onChange(value)
  }

  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const inputType = uiOptions.inputType || type
  const backgroundColor = (uiOptions.backgroundColor as string) || 'auto'

  return (
    <Input
      disabled={disabled}
      nativeInputProps={{
        type: inputType,
        required,
        placeholder,
        autoFocus: autofocus,
        readOnly: readonly,
        value,
        onChange: (e) => onChange(e.target.value),
        min: rest.schema.minimum,
        style: { backgroundColor },
      }}
      state={rawErrors && rawErrors.length ? 'error' : 'default'}
      stateRelatedMessage={rawErrors?.length && rawErrors[0]}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...rest}
    />
  )
}
