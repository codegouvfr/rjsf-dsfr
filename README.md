# React JSON Schema Form with the DSFR

This is a wrapper around the
[react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/docs/)
with the components from
[`react-dsfr`](https://github.com/codegouvfr/react-dsfr).

> [!IMPORTANT]
> For now, this is simply extracted code from
> [`catala-dsfr`](https://github.com/CatalaLang/catala-dsfr).
> Therefore, the API is not yet defined and and is likely to be not flexible
> enough for your use case.
>
> If you want to use this library, please [open an
> issue](https://github.com/codegouvfr/rjsf-dsfr/issues) to discuss your needs!

👉 See a demo at : https://codegouvfr.github.io/rjsf-dsfr

## Installation

```bash
yarn add @codegouvfr/rjsf-dsfr
```

## Usage

For now, the API matches the one from `react-jsonschema-form` and you can
overrides some widgets (resp. templates) by specifying them in the props.

```tsx
import { RJSFSchema } from '@rjsf/utils'
import FormDSFR from '@codegouvfr/rjsf-dsfr'
import { customizeValidator } from '@rjsf/validator-ajv8'
import frenchLocalizer from 'ajv-i18n/localize/fr'

const validator = customizeValidator({}, frenchLocalizer)

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    nom: { title: 'Nom', type: 'string', minLength: 2 },
    prenom: { title: 'Prénom', type: 'string' },
    ddn: { title: 'Date de naissance', type: 'string', format: 'date' },
  },
  required: ['nom'],
}

export default function Form() {
  return <FormDSFR schema={schema} validator={validator} />
}
```

## Notes on writing schemas

### Title

The titles must not be defined inside `"kind"` properties of the object
definition but just before the `"$ref"` of the calling parent:

```json
"categorieEquivalenceLoyerD84216": {
  "title": "Catégorie de personnes résidant en logement-foyer",
  "$ref": "#/definitions/categorie_equivalence_loyer_allocation_logement_foyer"
}
```

### UI Options

As described in the [react-jsonschema-form
documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema),
you can customize the form by providing a `uiSchema`.
In addition to the standard options, you can use the following specific options
for `rjsf-dsfr`.

> [!TIP]
> You can have a look to a real world example
> [here](https://github.com/CatalaLang/catala-web-assets/blob/main/assets/aides_logement_ui_fr.schema.jsx)

#### Global field options

The following options can be set for any field in the `uiSchema`:

- `ui:heading`: set the heading level for the field's title (available values: `h2`, `h3`, `h4`, `h5`, `h6`)
- `ui:hideTitle`: hide the field's title.

#### Specific field options

##### Array fields

The following options can be set for fields of type `array`:

- `ui:addIcon`: set the [DSFR icon id](https://react-dsfr.codegouv.studio/icons) for the _Add_ button
- `ui:removeIcon`: set the [DSFR icon id](https://react-dsfr.codegouv.studio/icons) for the _Remove_ button
- `ui:tabLabel`: set the label for the tab in the array field (it needs to be
  defined at the root of the `array` field)

> [!NOTE]
> By default, array fields are displayed in a
> [`Tabs`](https://components.react-dsfr.codegouv.studio/?path=/docs/components-tabs--default)
> component. Each tab is labeled with the `ui:tabLabel` value and the last tab
> contains the _Add_ button.

> [!IMPORTANT]
> The `ui:hideTitle` option it's needed for items of type `object` inside a
> field of type `array` to hide the unique title of the array's items.
>
> Example:
>
> ```json
> "personnesACharge": {
>    "ui:tabLabel": "Personne",
>    "items": {
>        "ui:hideTitle": true,
> ...
> ```

## Development

Launch the playground to play with the DSFR theme :

```sh
cd demo
yarn
yarn start
```
