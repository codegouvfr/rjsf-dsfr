import React, { useState } from 'react'
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
  registry,
}: ArrayFieldTemplateProps & { uiSchema?: UiSchemaDSFR }) {
  const [selectedTabId, setSelectedTabId] = useState('tab0')
  const tabLabel = uiSchema?.['ui:tabLabel'] ?? 'Element'
  const removeIcon = uiSchema?.['ui:removeIcon'] ?? 'fr-icon-delete-line'
  const addIcon = uiSchema?.['ui:addIcon'] ?? 'fr-icon-add-circle-line'

  // ensure no exception when last selected tab has been destroyed
  const selectedIndex = Math.min(
    items.length - 1,
    parseInt(selectedTabId.replace(/^tab(\d+)$/, '$1')),
  )

  const tabContent =
    (items.length && (
      <>
        <Button
          type="button"
          iconId={removeIcon}
          onClick={(e) => {
            items[selectedIndex].onDropIndexClick(selectedIndex)()
          }}
          size="small"
          priority="secondary"
        >
          Supprimer
        </Button>
        {items[selectedIndex].children}
      </>
    )) ||
    null

  const onTabChange = (id: string) => {
    if (id === 'add') {
      onAddClick()
      setSelectedTabId(`tab${items.length}`)
      return
    }
    setSelectedTabId(id)
  }

  return (
    <div className="form-group field">
      <div className="fr-input-group">
        <label className="fr-label">{title}</label>
        <div className="fr-input-wrap">
          <Tabs
            onTabChange={onTabChange}
            selectedTabId={selectedTabId}
            tabs={items
              .map((element) => ({
                label: `${tabLabel} ${element.index + 1}`,
                tabId: `tab${element.index}`,
              }))
              .concat([
                {
                  label: `Ajouter`,
                  tabId: 'add',
                },
              ])}
          >
            {selectedTabId !== 'add' && tabContent}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
