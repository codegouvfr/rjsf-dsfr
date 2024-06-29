import Select from '@codegouvfr/react-dsfr/Select'
import {
  RJSFSchema,
  WidgetProps,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
} from '@rjsf/utils'
import React from 'react'
import { SyntheticEvent, useCallback } from 'react'

export default function ({
  label,
  rawErrors,
  autofocus,
  readonly,
  formContext,
  hideError,
  hideLabel,
  uiSchema,
  ...props
}: WidgetProps) {
  const { enumOptions, emptyValue: optEmptyVal } = props.options

  const handleChange = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      const newValue = getValue(event, props.multiple ?? false)
      return props.onChange(
        enumOptionsValueForIndex<RJSFSchema>(
          newValue,
          enumOptions,
          optEmptyVal,
        ),
      )
    },
    [props.onChange, props.schema, props.multiple, props.options],
  )

  const selectedIndexes = enumOptionsIndexForValue<RJSFSchema>(
    props.value,
    props.options.enumOptions,
    props.multiple,
  )

  const defaultIndex = enumOptionsIndexForValue<RJSFSchema>(
    props.schema.default,
    props.options.enumOptions,
    props.multiple,
  )

  const value =
    typeof selectedIndexes === 'undefined' ? defaultIndex : selectedIndexes

  return (
    <Select
      nativeSelectProps={{
        id: props.id,
        name: props.name,
        required: props.required,
        value,
        onChange: handleChange,
      }}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...props}
    >
      {!props.multiple && props.schema.default === undefined && (
        <option value="">{props.placeholder}</option>
      )}
      {props.options.enumOptions?.map((item, index) => (
        <option key={index} value={String(index)}>
          {item.label}
        </option>
      ))}
    </Select>
  )
}

function getValue(event: SyntheticEvent<HTMLSelectElement>, multiple: boolean) {
  if (multiple) {
    return Array.from((event.target as HTMLSelectElement).options)
      .slice()
      .filter((o) => o.selected)
      .map((o) => o.value)
  }
  return (event.target as HTMLSelectElement).value
}
