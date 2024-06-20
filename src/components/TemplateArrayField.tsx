import Button from '@codegouvfr/react-dsfr/Button'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { ArrayFieldTemplateProps } from '@rjsf/utils'
import React from 'react'

const defaultAddIcon = 'fr-icon-add-circle-line'
const defaultRemoveIcon = 'fr-icon-delete-line'

export default function ({
  title,
  uiSchema,
  items,
  canAdd,
  onAddClick,
}: ArrayFieldTemplateProps & { removeIcon?: string; addIcon?: string }) {
  const tabLabel = uiSchema !== undefined ? uiSchema['ui:tabLabel'] : 'Element'

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
                      iconId={
                        uiSchema !== undefined
                          ? uiSchema['ui:removeIcon']
                          : defaultRemoveIcon
                      }
                      onClick={element.onDropIndexClick(element.index)}
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
                          iconId={
                            uiSchema !== undefined
                              ? uiSchema['ui:addIcon']
                              : defaultAddIcon
                          }
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
