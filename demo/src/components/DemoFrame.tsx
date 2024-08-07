import {
  useState,
  useRef,
  useCallback,
  cloneElement,
  ReactElement,
  ReactNode,
} from 'react'
import { CacheProvider } from '@emotion/react'
import createCache, { EmotionCache } from '@emotion/cache'
import { create, Jss } from 'jss'
import Frame, {
  FrameComponentProps,
  FrameContextConsumer,
} from 'react-frame-component'

interface DemoFrameProps extends FrameComponentProps {
  theme: string
  /** override children to be ReactElement to avoid Typescript issue. In this case we don't need to worry about
   * children being of the other valid ReactNode types, undefined and string as it always contains an RJSF `Form`
   */
  children: ReactElement
}

export default function DemoFrame(props: DemoFrameProps) {
  const { children, head, theme, ...frameProps } = props

  const [jss, setJss] = useState<Jss>()
  const [ready, setReady] = useState(false)
  const [sheetsManager, setSheetsManager] = useState(new Map())
  const [emotionCache, setEmotionCache] = useState<EmotionCache>(
    createCache({ key: 'css' })
  )
  const [container, setContainer] = useState()
  const [window, setWindow] = useState()

  const instanceRef = useRef<any>()

  const handleRef = useCallback(
    (ref: any) => {
      instanceRef.current = {
        contentDocument: ref ? ref.node.contentDocument : null,
        contentWindow: ref ? ref.node.contentWindow : null,
      }
    },
    [instanceRef]
  )

  const onContentDidMount = useCallback(() => {
    setReady(true)
    setJss(
      create({
        //plugins: jssPreset().plugins,
        insertionPoint: instanceRef.current.contentWindow['demo-frame-jss'],
      })
    )
    setSheetsManager(new Map())
    setEmotionCache(
      createCache({
        key: 'css',
        prepend: true,
        container: instanceRef.current.contentWindow['demo-frame-jss'],
      })
    )
    setContainer(instanceRef.current.contentDocument.body)

    setWindow(() => instanceRef.current.contentWindow)
  }, [])

  let body: ReactNode = children
  if (theme === 'dsfr') {
    body = ready ? (
      <div>{children}</div>
    ) : // TODO <AntdStyleProvider container={instanceRef.current.contentWindow['demo-frame-jss']}>{children}</AntdStyleProvider>
    null
  }

  return (
    <Frame
      ref={handleRef}
      contentDidMount={onContentDidMount}
      head={head}
      {...frameProps}
    >
      <div id="demo-frame-jss" />
      {body}
    </Frame>
  )
}
