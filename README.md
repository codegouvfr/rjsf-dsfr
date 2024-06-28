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

## Installation

```bash
yarn add @codegouvfr/rjsf-dsfr
```

## Usage

For now, the API matches the one from `react-jsonschema-form` and you can
overrides some widgets (resp. templates) by specifying them in the props.

```tsx
import { RJSFSchema } from "@rjsf/utils";
import FormDSFR from "@codegouvfr/rjsf-dsfr";
import { customizeValidator } from "@rjsf/validator-ajv8";
import frenchLocalizer from "ajv-i18n/localize/fr";

const validator = customizeValidator({}, frenchLocalizer);

const schema: RJSFSchema = {
  type: "object",
  properties: {
    nom: { title: "Nom", type: "string", minLength: 2 },
    prenom: { title: "Prénom", type: "string" },
    ddn: { title: "Date de naissance", type: "string", format: "date" },
  },
  required: ["nom"],
};

export default function Form() {
  return (
      <FormDSFR schema={schema} validator={validator} />
  );
}
```
