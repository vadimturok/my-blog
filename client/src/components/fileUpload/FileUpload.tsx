import React, {FC, useRef, useState} from 'react';
import './fileupload.scss'
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface FileUploadProps{
    handleFile: (file: File | undefined) => void;
    displayImage?: boolean;
}

const FileUpload: FC<FileUploadProps> = ({handleFile, displayImage}) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        hiddenFileInput.current?.click()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = event.target.files?.[0]
        if(fileUploaded){
            setImageUrl(URL.createObjectURL(fileUploaded))
        }
        handleFile(fileUploaded)
    }
    return (
        <div className={'imageUpload'}>
            <div className={'uploadFile'}>
                <button onClick={handleClick}>Upload image</button>
            </div>
            <input
                type="file"
                ref={hiddenFileInput}
                style={{display: 'none'}}
                onChange={handleChange}
            />
            {displayImage && <div className={'imagePreview'}>
                {imageUrl && <img src={imageUrl} alt="postPicture"/>}
            </div>}
        </div>
    );
};

export default FileUpload;