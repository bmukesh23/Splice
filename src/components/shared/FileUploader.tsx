import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';
import fileUploaderSvg from '/assets/icons/file-uploader.svg'

const FileUploader = () => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles);
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ? (
          <div>
            test 1
          </div>
        ) : (
          <div className='flex-center flex-col p-7 h-80 lg:h-[612px]'>
            <img
              src={fileUploaderSvg}
              width={96}
              height={77}
              alt='file-upload'
            />

            <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
            <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

            <Button className='shad-button_dark_4'>
              Select from computer
            </Button>
          </div>
        )
      }
    </div >
  )
}
export default FileUploader