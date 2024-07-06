import { Sample } from './Sample'

const simple: Sample = {
  schema: {
    title: 'Un formulaire simple',
    description: 'La description du formulaire.',
    type: 'object',
    required: ['firstName', 'lastName'],
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
      age: {
        type: 'integer',
        title: 'Age',
      },
      bio: {
        type: 'string',
        title: 'Bio',
      },
      password: {
        type: 'string',
        title: 'Mot de passe',
        minLength: 3,
      },
      telephone: {
        type: 'string',
        title: 'Téléphone',
        minLength: 10,
      },
    },
  },
  uiSchema: {
    firstName: {
      'ui:autofocus': true,
      'ui:placeholder': 'Ex: Louise',
      'ui:autocomplete': 'family-name',
      'ui:enableMarkdownInDescription': true, // todo
      'ui:description': 'Description du champ firstName',
    },
    lastName: {
      'ui:autocomplete': 'given-name',
      'ui:enableMarkdownInDescription': true, // todo
      'ui:description': 'Description du champ lastName',
    },
    age: {
      'ui:widget': 'updown',
      'ui:title': 'Age de la personne',
      'ui:description': 'En années',
    },
    bio: {
      'ui:widget': 'textarea',
    },
    password: {
      'ui:widget': 'password',
      'ui:help': 'Créez un mot de passe unique pour chaque service !',
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
    bio: 'Roundhouse kicking asses since 1830',
    password: 'noneed',
    telephone: '1-800-000',
  },
}

export default simple
