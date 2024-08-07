import { Sample } from './Sample'
import { ErrorTransformer } from '@rjsf/utils'

function customValidate(
  { pass1, pass2 }: { pass1: string; pass2: string },
  errors: any,
) {
  if (pass1 !== pass2) {
    errors.pass2.addError('Les mots de passe ne correspondent pas')
  }
  return errors
}

const transformErrors: ErrorTransformer = (errors) => {
  return errors.map((error) => {
    if (
      error.name === 'minimum' &&
      error.schemaPath === '#/properties/age/minimum'
    ) {
      return Object.assign({}, error, {
        message: 'Vous devez avoir au moins 18 ans pour accéder à ce service',
      })
    }
    return error
  })
}

const validation: Sample = {
  schema: {
    title: 'Custom validation',
    description:
      "Ce formulaire ajoute des règles de validation sur l'age et les mots de passes qui doivent correspondre",
    type: 'object',
    required: ['pass1', 'pass2', 'age'],
    properties: {
      pass1: {
        title: 'Mot de passe',
        type: 'string',
        minLength: 3,
      },
      pass2: {
        title: 'Répéter le mot de passe',
        type: 'string',
        minLength: 3,
      },
      age: {
        title: 'Age',
        type: 'number',
        minimum: 18,
      },
    },
  },
  uiSchema: {
    pass1: { 'ui:widget': 'password' },
    pass2: { 'ui:widget': 'password' },
  },
  formData: {},
  customValidate,
  transformErrors,
}

export default validation
