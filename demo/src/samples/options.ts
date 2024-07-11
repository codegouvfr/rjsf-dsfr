import { fr } from '@codegouvfr/react-dsfr'
import { Sample } from './Sample'

const optionsSample: Sample = {
  schema: {
    title: 'Un formulaire avec des ui:options',
    description: 'Description du formulaire',
    type: 'object',
    required: ['firstName', 'lastName', 'telephone'],
    properties: {
      firstName: {
        type: 'string',
        title: 'Prénom',
        default: 'Louise',
      },
      lastName: {
        type: 'string',
        title: 'Nom',
      },
      telephone: {
        type: 'string',
        title: 'Téléphone',
        minLength: 10,
      },
    },
  },
  uiSchema: {
    'ui:submitButtonOptions': {
      submitText: 'Confirmer les détails',
      props: {
        disabled: false,
        style: { color: 'yellow' },
        iconId: 'fr-icon-account-circle-line',
      },
    },
    firstName: {
      'ui:autocomplete': 'family-name',
    },
    lastName: {
      'ui:autofocus': true,
      'ui:title': 'Override du prénom',
      'ui:autocomplete': 'given-name',
    },
    telephone: {
      'ui:options': {
        inputType: 'tel',
      },
    },
  },
  formData: {
    lastName: 'Michel',
    age: 75,
  },
}

export default optionsSample
