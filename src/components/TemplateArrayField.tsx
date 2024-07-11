import React from 'react'
import { FrIconClassName, RiIconClassName } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { ArrayFieldTemplateProps } from '@rjsf/utils'

import { UiSchemaDSFR } from '..'

export type IconsDSFR = FrIconClassName | RiIconClassName

/** Custom UI options for array fields */
export type ArrayFieldUiOptionsDSFR = {
  /** Icon for the add button */
  'ui:addIcon'?: IconsDSFR
  /** Icon for the remove button */
  'ui:removeIcon'?: IconsDSFR
  /** Label for tab component. */
  'ui:tabLabel'?: string
}

/**
 * Array field are displayed in a Tabs component where:
 * - each tab corresponds to an element of the array,
 * - the last tab is an "add" button,
 * - tab label can be customized with `ui:tabLabel` and is numbered from 1,
 */
export default function ({
  title,
  uiSchema,
  items,
  canAdd,
  onAddClick,
}: ArrayFieldTemplateProps & { uiSchema?: UiSchemaDSFR }) {
  const tabLabel = uiSchema?.['ui:tabLabel'] ?? 'Element'
  const removeIcon = uiSchema?.['ui:removeIcon'] ?? 'fr-icon-delete-line'
  const addIcon = uiSchema?.['ui:addIcon'] ?? 'fr-icon-add-circle-line'
  console.log('items', items)
  return (
    <div className="form-group field">
      <div className="fr-input-group">
        <label className="fr-label">{title}</label>
        <div className="fr-input-wrap">
          <Tabs
            tabs={items
              .map((element) => ({
                label: `${tabLabel} ${element.index + 1}`,
                content: (
                  <>
                    <Button
                      type="button"
                      iconId={removeIcon}
                      onClick={(e) => {
                        console.log('io', element)
                        element.onDropIndexClick(element.index)
                      }}
                      size="small"
                      priority="secondary"
                    >
                      Supprimer
                    </Button>
                    {element.children}
                  </>
                ),
              }))
              .concat([
                {
                  label: `Ajouter`,
                  content: (
                    <>
                      {canAdd && (
                        <Button
                          type="button"
                          iconId={addIcon}
                          onClick={onAddClick}
                          size="small"
                          priority="secondary"
                        >
                          Ajouter
                        </Button>
                      )}
                    </>
                  ),
                },
              ])}
          />
        </div>
      </div>
    </div>
  )
}
