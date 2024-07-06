import {
  FormContextType,
  getUiOptions,
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
  const uiOptions = getUiOptions<T, S, F>(uiSchema)
  const rows = uiOptions.rows || 3
  const backgroundColor = (uiOptions.backgroundColor as string) || 'auto'

  return (
    <Input
      textArea
      nativeTextAreaProps={{
        rows,
        required,
        placeholder,
        autoFocus: autofocus,
        readOnly: readonly,
        value,
        onChange: (e) => onChange(e.target.value),
        style: { backgroundColor },
      }}
      state={rawErrors && rawErrors.length ? 'error' : 'default'}
      stateRelatedMessage={rawErrors?.length && rawErrors[0]}
      disabled={disabled}
      // NOTE: we don't want to display the label here because it is already
      // displayed in the FieldTemplate (which manages the label and hint).
      label={undefined}
      {...rest}
    />
  )
}
