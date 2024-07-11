import { fr } from '@codegouvfr/react-dsfr'
import { ReactNode, useState } from 'react'

type ElementWithHintProps = {
  helpText: string | undefined
  children: ReactNode
  as?: string
  [x: string]: any
}

export default function LabelWithHelp({
  helpText,
  children,
  as = 'span',
  ...rest
}: ElementWithHintProps) {
  const [showHelp, setShowHelp] = useState(false)
  const Content = as as keyof JSX.IntrinsicElements
  if (children == undefined) {
    return null
  }

  return (
    <div className="flex flex-col ">
      <div className="flex" style={{ alignItems: 'center' }}>
        <Content {...rest}>
          {children}
          {helpText ? (
            <i
              style={{ cursor: 'pointer' }}
              className={fr.cx(
                'fr-icon--sm',
                'fr-ml-1w',
                !showHelp
                  ? 'fr-icon-information-line'
                  : 'fr-icon-information-fill',
              )}
              onClick={() => setShowHelp(!showHelp)}
            />
          ) : null}
        </Content>
      </div>
      {showHelp ? <p className="fr-hint-text">{helpText}</p> : null}
    </div>
  )
}
