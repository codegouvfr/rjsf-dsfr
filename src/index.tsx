import React from 'react'
import Form, { FormProps } from '@rjsf/core'
import {
  SubmitButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  FormContextType,
  UiSchema,
} from '@rjsf/utils'
import defaultValidator from '@rjsf/validator-ajv8'
import { Button } from '@codegouvfr/react-dsfr/Button'

import WidgetCheckBox from './components/WidgetCheckBox'
import WidgetRadio from './components/WidgetRadio'
import WidgetSelect from './components/WidgetSelect'
import WidgetTextarea from './components/WidgetTextarea'

import TemplateArrayField, {
  ArrayFieldUiOptionsDSFR,
} from './components/TemplateArrayField'
import TemplateBaseInput from './components/TemplateBaseInput'
import TemplateField from './components/TemplateField'
import TemplateTitleField from './components/TemplateTitleField'
import ErrorList from './components/ErrorList'

export type UiSchemaDSFR<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = UiSchema<T, S, F> & FieldUiOptionsDSFR & ArrayFieldUiOptionsDSFR

/** Custom UI options for all fields.
 * see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 *
 */

export type FieldUiOptionsDSFR = {
  /** Set the heading level for the title */
  'ui:heading'?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** To hide the title */
  'ui:hideTitle'?: boolean
  /** Add description */
  'ui:description'?: string
  /** Add help icon text after label */
  'ui:help'?: string
}

export type FormPropsDSFR<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = FormProps<T, S, F> & {
  uiSchema?: UiSchemaDSFR<T, S, F>
}

/**
 * Form component with default DSFR widgets and templates.
 *
 * @param props - classic react-jsonschema-form props
 *
 * @returns a react-jsonschema-form Form component with DSFR widgets and templates
 */
export default function FormDSFR<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ widgets, templates, validator, ...rest }: FormPropsDSFR<T, S, F>) {
  return (
    <Form
      validator={validator ?? defaultValidator}
      widgets={
        widgets !== undefined
          ? {
              ...widgetsDSFR,
              ...widgets,
            }
          : widgetsDSFR
      }
      templates={
        templates !== undefined
          ? {
              ...templatesDSFR,
              ...templates,
            }
          : templatesDSFR
      }
      {...rest}
    />
  )
}

export const widgetsDSFR = {
  CheckboxWidget: WidgetCheckBox,
  RadioWidget: WidgetRadio,
  SelectWidget: WidgetSelect,
  TextareaWidget: WidgetTextarea,
}

export const templatesDSFR = {
  ArrayFieldTemplate: TemplateArrayField,
  BaseInputTemplate: TemplateBaseInput,
  FieldTemplate: TemplateField,
  ButtonTemplates: { SubmitButton },
  TitleFieldTemplate: TemplateTitleField,
  ErrorListTemplate: ErrorList,
}

function SubmitButton({ uiSchema }: SubmitButtonProps) {
  const buttonOptions = uiSchema?.['ui:options']?.submitButtonOptions
  const buttonProps = uiSchema?.['ui:options']?.submitButtonOptions?.props || {}
  return (
    // NOTE: should the div stay here? Probably not.
    <div className="flex w-full fr-mt-2w">
      <Button {...buttonProps}>{buttonOptions?.submitText ?? 'Envoyer'}</Button>
    </div>
  )
}
