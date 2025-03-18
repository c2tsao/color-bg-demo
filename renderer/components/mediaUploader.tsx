import React from 'react'
import { MediaType, StoreType } from '../../types/configStoreType'
import { FileUploadErrorType } from '../../types/errorType'
import { IPC_FILE_IO_OPEN_DIALOG } from '../../constants/ipc'
import { FILE_SIZE_LIMIT } from '../../constants/error'
import { useStore } from '../hooks/useStore'

type Props = {
  closeModal: () => void
  fileUploadError?: FileUploadErrorType
  setFileUploadError: (error?: FileUploadErrorType) => void
}
const fileLimitMegabytes = 10

function MediaUploader(props: Props) {
  const { setFileUploadError, fileUploadError, closeModal } = props
  const { state, dispatch } = useStore()

  const openFile = async () => {
    setFileUploadError(undefined)
    const file = await window.ipc.sendSync<
      number,
      | { error: typeof FILE_SIZE_LIMIT }
      | { error: false; filepath: string; id: string; type: MediaType; format: string }
      | undefined
    >(IPC_FILE_IO_OPEN_DIALOG, fileLimitMegabytes)
    if (file === undefined) return
    if (file.error === FILE_SIZE_LIMIT) {
      setFileUploadError(FILE_SIZE_LIMIT)
      return
    }
    const newState: StoreType = {
      activated: file.id,
      map: {
        ...state.map,
        [file.id]: {
          type: file.type,
          data: { path: file.filepath, format: file.format },
        },
      },
    }
    dispatch({ type: 'update', payload: newState })
    closeModal()
  }
  return (
    <div
      className={`cursor-pointer flex flex-col justify-center items-center w-full h-5/6 pb-4 border border-2 border-dashed ${fileUploadError !== undefined ? 'border-red-500' : 'border-stone-700'} rounded`}
      onClick={openFile}
    >
      <div className="text-xl text-stone-700 px-10 py-10 tracking-wider">{'Click To Upload'}</div>
      <div className={`text-sm ${fileUploadError === FILE_SIZE_LIMIT ? 'text-red-500' : 'text-stone-500'}`}>
        {`Max file size: ${fileLimitMegabytes} MB`}
      </div>
      <div className="text-sm text-stone-500">{'File types: JPG, PNG, GIF, MP4, AVI, MKV'}</div>
    </div>
  )
}

export default MediaUploader
