import React from 'react'
import { RgbaColor } from 'react-colorful'
import ColorPicker from './colorPicker'
import { useStore } from '../hooks/useStore'
import { StoreType } from '../../types/configStoreType'
import { IPC_FILE_IO_OPEN_DIALOG } from '../../constants/ipc'

type PropsType = {
  isModalOpen: boolean
  closeModal: () => void
  type: 'color' | 'media'
}

function Modal(props: PropsType) {
  const { state, dispatch } = useStore()
  const [primaryColor, setPrimaryColor] = React.useState<RgbaColor>({ r: 3, g: 76, b: 83, a: 1 })
  const [secondaryColor, setSecondaryColor] = React.useState<RgbaColor>({ r: 243, g: 140, b: 121, a: 1 })
  const [fileUploadError, setFileUploadError] = React.useState<'sizeLimit' | undefined>()

  React.useEffect(() => {
    if (!props.isModalOpen) {
      setFileUploadError(undefined)
    }
  }, [props.isModalOpen])

  if (!props.isModalOpen) {
    return <></>
  }

  const onSave = () => {
    const id = `${new Date().valueOf()}`
    const newState: StoreType = {
      activated: id,
      map: {
        ...state.map,
        [id]: { type: 'color', data: { primary: primaryColor, secondary: secondaryColor } },
      },
    }
    dispatch({ type: 'update', payload: newState })
    props.closeModal()
  }

  const openFile = async () => {
    setFileUploadError(undefined)
    const file = await window.ipc.invoke<
      | { error: 'sizeLimit' }
      | { error: false; filepath: string; id: string; type: 'image' | 'video'; format: string }
      | undefined
    >(IPC_FILE_IO_OPEN_DIALOG)
    if (file === undefined) return
    if (file.error === 'sizeLimit') {
      setFileUploadError('sizeLimit')
      return
    }
    const newState: StoreType = {
      activated: file.id,
      map: {
        ...state.map,
        [file.id]: { type: file.type, data: { path: file.filepath, format: file.format } },
      },
    }
    dispatch({ type: 'update', payload: newState })
    props.closeModal()
  }

  console.log('123', fileUploadError)
  let content = (
    <ColorPicker
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      setPrimaryColor={setPrimaryColor}
      setSecondaryColor={setSecondaryColor}
    ></ColorPicker>
  )
  let headerText = 'Select Color'
  let saveButton = (
    <button className="btn-default h-1/6" onClick={onSave}>
      {'Add & Apply'}
    </button>
  )
  if (props.type === 'media') {
    content = (
      <div
        className={`cursor-pointer flex flex-col justify-center items-center w-full h-5/6 pb-4 border border-2 border-dashed ${fileUploadError !== undefined ? 'text-red-500' : 'text-stone-700'} rounded`}
        onClick={openFile}
      >
        <div className="text-xl text-stone-700 px-10 py-10 tracking-wider">{'Click To Upload'}</div>
        <div className={`text-sm ${fileUploadError === 'sizeLimit' ? 'text-red-500' : 'text-stone-500'}`}>
          {'Max file size: 10 MB'}
        </div>
        <div className="text-sm text-stone-500">{'File types: JPG, PNG, GIF, MP4, AVI, MKV'}</div>
      </div>
    )
    headerText = 'Upload Media'
    saveButton = <></>
  }

  return (
    <div className="w-screen h-screen absolute top-0">
      <div className="w-screen h-screen absolute top-0 mask" onClick={props.closeModal}></div>
      <div className="relative flex flex-col bg-gray-100 text-black px-4 py-4 w-3/4 h-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded">
        <button className="absolute top-2 right-2 rounded-full w-6 h-6" onClick={props.closeModal}>
          &#x2715;
        </button>
        <h2 className="text-2xl pb-4">{headerText}</h2>
        {content}
        {saveButton}
      </div>
    </div>
  )
}

export default Modal
