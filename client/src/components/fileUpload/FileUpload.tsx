import React, {FC, useEffect, useRef, useState} from 'react';
import './fileupload.scss'
import Compressor from 'compressorjs'

interface FileUploadProps{
    handleFile: (file: File | undefined) => void;
    displayImage?: boolean;
    defaultImageURL?: string | null;
}

const FileUpload: FC<FileUploadProps> = ({handleFile, displayImage, defaultImageURL}) => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(defaultImageURL){
            setImageUrl(defaultImageURL)
        }
    }, [defaultImageURL])
    const handleClick = () => {
        hiddenFileInput.current?.click()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = event.target.files?.[0]
        if(fileUploaded){
            new Compressor(fileUploaded, {
                quality: 0.8,
                success: (compressedResult) => {
                    handleFile(fileUploaded)
                },
            });
            setImageUrl(URL.createObjectURL(fileUploaded))
        }
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
                {imageUrl && <img width={300} height={300} src={imageUrl} alt="postPicture"/>}
            </div>}
        </div>
    );
};

export default FileUpload;