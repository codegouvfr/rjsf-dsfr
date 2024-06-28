import { templatesDSFR, widgetsDSFR } from '@codegouvfr/rjsf-dsfr'
import { customizeValidator } from '@rjsf/validator-ajv8'
import localize_fr from 'ajv-i18n/localize/fr'
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4'

import Layout from './layout'
import Playground, { PlaygroundProps } from './components'

const DSFRTheme = {
  templates: templatesDSFR,
  widgets: widgetsDSFR,
}

const frV8Validator = customizeValidator({}, localize_fr)

const validators: PlaygroundProps['validators'] = {
  AJV8: frV8Validator,
}

const themes: PlaygroundProps['themes'] = {
  dsfr: {
    stylesheet: '//unpkg.com/@gouvfr/dsfr@1.12.0/dist/dsfr.min.css',
    theme: DSFRTheme,
  },
  'bootstrap-4': {
    stylesheet:
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    theme: Bootstrap4Theme,
  },
}

export default function App() {
  return (
    <Layout>
      <Playground themes={themes} validators={validators} />
    </Layout>
  )
}
