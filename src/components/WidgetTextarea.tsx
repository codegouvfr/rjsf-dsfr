import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils'
import Input from '@codegouvfr/react-dsfr/Input'

type CustomWidgetProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = WidgetProps<T, S, F> & {
  options: any
}

export default function WidgetTextarea<
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
}: CustomWidgetProps<T, S, F>) {
  const rows = uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].rows

  return (
    <Input
      textArea
      nativeTextAreaProps={{
        rows,
        required,
        disabled,
        placeholder,
        autoFocus: autofocus,
        readOnly: readonly,
        value,
        onChange: (e) => onChange(e.target.value),
      }}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...rest}
    />
  )
}
