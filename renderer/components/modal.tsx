import React from 'react'
import { RgbaColor } from 'react-colorful'
import { useStore } from '../hooks/useStore'
import { SourceType, StoreType } from '../../types/configStoreType'
import { FileUploadErrorType } from '../../types/errorType'

import ColorPicker from './colorPicker'
import MediaUploader from './mediaUploader'

type PropsType = {
  isModalOpen: boolean
  closeModal: () => void
  type: SourceType
}

function Modal(props: PropsType) {
  const { state, dispatch } = useStore()
  const [primaryColor, setPrimaryColor] = React.useState<RgbaColor>({ r: 3, g: 76, b: 83, a: 1 })
  const [secondaryColor, setSecondaryColor] = React.useState<RgbaColor>({ r: 243, g: 140, b: 121, a: 1 })
  const [fileUploadError, setFileUploadError] = React.useState<FileUploadErrorType | undefined>()

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
      <MediaUploader
        closeModal={props.closeModal}
        fileUploadError={fileUploadError}
        setFileUploadError={setFileUploadError}
      ></MediaUploader>
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
