import React from 'react'
import { WidgetProps } from '@rjsf/utils'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import LabelWithHint from './LabelWithHint'

export default function (props: WidgetProps) {
  return (
    <div style={{ marginTop: '1rem', marginBottom: '-1rem' }}>
      <Checkbox
        options={[
          {
            label: (
              <LabelWithHint
                hintText={
                  props.uiSchema !== undefined
                    ? props.uiSchema['ui:help']
                    : undefined
                }
              >
                {props.schema.title + (props.required ? '*' : '')}
              </LabelWithHint>
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
