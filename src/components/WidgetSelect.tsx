import Select from '@codegouvfr/react-dsfr/Select'
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  getUiOptions,
} from '@rjsf/utils'
import { SyntheticEvent, useCallback } from 'react'

export default function <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  label,
  rawErrors,
  autofocus,
  readonly,
  formContext,
  hideError,
  hideLabel,
  uiSchema,
  ...props
}: WidgetProps<T, S, F>) {
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

  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const backgroundColor = (uiOptions.backgroundColor as string) || 'auto'

  return (
    <Select
      nativeSelectProps={{
        id: props.id,
        name: props.name,
        required: props.required,
        value,
        onChange: handleChange,
        style: { backgroundColor },
      }}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...props}
    >
      {!props.multiple &&
        props.schema.default === undefined &&
        props.options.placeholder && (
          <option value="" disabled>
            {props.options.placeholder}
          </option>
        )}
      {props.options.enumOptions?.map((item, index) => (
        <option key={index} value={String(index)}>
          {item.label}
        </option>
      ))}
      state={rawErrors && rawErrors.length ? 'error' : 'default'}
      stateRelatedMessage={rawErrors?.length && rawErrors[0]}
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
