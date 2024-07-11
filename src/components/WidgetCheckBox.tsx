import { WidgetProps } from '@rjsf/utils'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import LabelWithHelp from './LabelWithHelp'

export default function (props: WidgetProps) {
  return (
    <div style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
      <Checkbox
        options={[
          {
            label: (
              <LabelWithHelp
                helpText={
                  props.uiSchema !== undefined
                    ? props.uiSchema['ui:help']
                    : undefined
                }
              >
                {props.schema.title + (props.required ? '*' : '')}
              </LabelWithHelp>
            ),
            nativeInputProps: {
              checked: props.value,
              onChange: (e) => props.onChange(e.target.checked),
            },
          },
        ]}
      />
    </div>
  )
}
