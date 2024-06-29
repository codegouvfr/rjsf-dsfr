import { ChangeEvent, FocusEvent } from 'react'
import {
  ariaDescribedByIds,
  enumOptionsIsSelected,
  enumOptionsValueForIndex,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils'

import React from 'react'
import RadioButtons from '@codegouvfr/react-dsfr/RadioButtons'
import LabelWithHint from './LabelWithHint'

export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
  uiSchema,
  schema,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))

  const inline = Boolean(options && options.inline)
  console.log({
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    uiSchema,
    schema,
  })
  return (
    <div style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
      <RadioButtons
        options={
          (options &&
            options.enumOptions?.map((option) => ({
              label: (
                <LabelWithHint
                  helpText={
                    uiSchema !== undefined ? uiSchema['ui:help'] : undefined
                  }
                >
                  {option.label}
                </LabelWithHint>
              ),
              nativeInputProps: {
                checked: value === option.value,
                onChange: (e) => onChange(option.value),
              },
            }))) ||
          []
        }
      />
    </div>
  )
}
