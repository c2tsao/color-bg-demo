import React from 'react'
import Head from 'next/head'
import { useStore } from '../hooks/useStore'
import { getContrastColor, getStyleColorString } from '../lib/utils'
import { StoreType } from '../../types/configStoreType'
import ControlPanel from '../components/controlPanel'
import Modal from '../components/modal'
import Gallery from '../components/gallery'

let imageUrl = ''
let videoUrl = ''
export default function HomePage() {
  const { state, dispatch } = useStore()
  const [initialized, setInitialized] = React.useState(false)
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [configType, setConfigType] = React.useState<'color' | 'media'>('color')

  React.useEffect(() => {
    async function runEffect() {
      const config = await window.ipc.invoke<StoreType>('configStore:get')
      dispatch({ type: 'init', payload: config })
      setInitialized(true)
      window.ipc.invoke('ready-to-show')
    }
    runEffect()
    return () => {
      URL.revokeObjectURL(imageUrl)
      URL.revokeObjectURL(videoUrl)
    }
  }, [])

  React.useEffect(() => {
    if (initialized) {
      window.ipc.send('configStore:set', {
        activated: `${state.activated}`,
        map: state.map,
      })
    }
  }, [state.activated])

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  let style = {}
  let buttonStyle = <></>
  const activatedItem = state.map[state.activated] ?? {}
  if (activatedItem.type === 'image') {
    const buffer = window.ipc.sendSync('readfile', activatedItem.data.path)
    const image = new Blob([buffer], { type: activatedItem.data.format })
    URL.revokeObjectURL(imageUrl)
    imageUrl = URL.createObjectURL(image)
    style = {
      backgroundImage: `url("${imageUrl}")`,
    }
  }
  if (activatedItem.type === 'video') {
    const buffer = window.ipc.sendSync('readfile', activatedItem.data.path)
    const video = new Blob([buffer], { type: activatedItem.data.format })
    URL.revokeObjectURL(videoUrl)
    videoUrl = URL.createObjectURL(video)
  }
  if (activatedItem.type === 'color') {
    URL.revokeObjectURL(videoUrl)
    URL.revokeObjectURL(imageUrl)
    style = {
      backgroundColor: getStyleColorString(activatedItem.data.primary),
    }
    buttonStyle = (
      <style>
        {`
          button {
            background-color: ${getStyleColorString(activatedItem.data.secondary)} !important;
            color: ${getContrastColor(activatedItem.data.secondary)} !important;
          }
        `}
      </style>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Color Background Demo</title>
        {buttonStyle}
      </Head>
      <div className="w-screen h-screen transition bg-cover" style={style}>
        {activatedItem.type === 'video' && (
          <video autoPlay muted loop className="absolute object-cover w-full h-full">
            <source src={videoUrl} type={activatedItem.data.format} />
          </video>
        )}
        <ControlPanel openModal={openModal} setConfigType={setConfigType}></ControlPanel>
        <Gallery></Gallery>
      </div>
      <Modal type={configType} isModalOpen={isModalOpen} closeModal={closeModal}></Modal>
    </React.Fragment>
  )
}
