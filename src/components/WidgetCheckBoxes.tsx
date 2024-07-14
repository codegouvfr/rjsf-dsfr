import {
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  enumOptionsValueForIndex,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import LabelWithHelp from './LabelWithHelp'
import { ChangeEvent, FocusEvent } from 'react'

//export default function (props: WidgetProps) {

export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  id,
  disabled,
  options,
  value,
  autofocus,
  uiSchema,
  schema,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, inline, emptyValue } = options
  const checkboxesValues = Array.isArray(value) ? value : [value]

  const _onChange =
    (index: number) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        onChange(
          enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions),
        )
      } else {
        onChange(
          enumOptionsDeselectValue<S>(index, checkboxesValues, enumOptions),
        )
      }
    }

  const _onBlur = ({ target }: FocusEvent<HTMLInputElement>) =>
    onBlur(
      id,
      enumOptionsValueForIndex<S>(
        target && target.value,
        enumOptions,
        emptyValue,
      ),
    )
  const _onFocus = ({ target }: FocusEvent<HTMLInputElement>) =>
    onFocus(
      id,
      enumOptionsValueForIndex<S>(
        target && target.value,
        enumOptions,
        emptyValue,
      ),
    )

  return (
    <div style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
      <Checkbox
        options={
          (Array.isArray(enumOptions) &&
            enumOptions.map((option, index: number) => {
              const checked = enumOptionsIsSelected<S>(
                option.value,
                checkboxesValues,
              )
              const itemDisabled =
                Array.isArray(enumDisabled) &&
                enumDisabled.indexOf(option.value) !== -1

              return {
                label: (
                  <LabelWithHelp
                    helpText={
                      uiSchema !== undefined ? uiSchema['ui:help'] : undefined
                    }
                  >
                    {option.label + (required ? '*' : '')}
                  </LabelWithHelp>
                ),
                nativeInputProps: {
                  checked,
                  disabled: itemDisabled,
                  onChange: _onChange(index),
                  onBlur: _onBlur,
                  onFocus: _onFocus,
                },
              }
            })) ||
          []
        }
      />
    </div>
  )
}
