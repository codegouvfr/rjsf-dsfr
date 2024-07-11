import Alert from '@codegouvfr/react-dsfr/Alert'

import {
  ErrorListProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils'

export default function ErrorList<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ errors, registry }: ErrorListProps<T, S, F>) {
  const { translateString } = registry
  return (
    <Alert
      severity="error"
      title="Erreurs"
      description={
        <ul>
          {errors.map((error, i: number) => {
            return (
              <li key={i} className="border-0">
                <span>{error.stack}</span>
              </li>
            )
          })}
        </ul>
      }
    />
  )
}
