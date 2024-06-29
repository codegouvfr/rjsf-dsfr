import { FieldTemplateProps } from '@rjsf/utils'
import React from 'react'
import LabelWithHint from './LabelWithHint'
import { Alert } from '@codegouvfr/react-dsfr/Alert'

// TODO: add to props
const schemaTypesToNotRenderTitles = ['boolean', 'array']

export default function ({
  classNames,
  style,
  errors,
  children,
  id,
  required,
  label,
  schema,
  uiSchema,
}: FieldTemplateProps) {
  let title: JSX.Element | null = null
  let heading = uiSchema && uiSchema['ui:heading']

  if (heading != undefined) {
    switch (heading) {
      case 'h3':
        title = <h3 className="fr-h3">{label}</h3>
        break
      case 'h4':
        title = <h4 className="fr-h4">{label}</h4>
        break
      case 'h5':
        title = <h5 className="fr-h5">{label}</h5>
        break
      case 'h6':
        title = <h6 className="fr-h6">{label}</h6>
        break
      default:
        title = <h2 className="fr-h2">{label}</h2>
        break
    }
  } else {
    title = !schemaTypesToNotRenderTitles.includes(schema.type) ? (
      !uiSchema || !uiSchema['ui:hideTitle'] ? (
        <LabelWithHint helpText={uiSchema ? uiSchema['ui:help'] : undefined}>
          <label htmlFor={id} className="fr-label">
            {label + (required ? '*' : '')}
          </label>
        </LabelWithHint>
      ) : null
    ) : null
  }

  const description = uiSchema && uiSchema['ui:description']

  return (
    <div className={classNames + ' fr-mt-1w'} style={style}>
      {title}
      {description && <p className="fr-hint-text">{description}</p>}
      {children}
      {errors?.props?.errors != null && (
        <Alert severity="error" description={errors} small />
      )}
    </div>
  )
}
