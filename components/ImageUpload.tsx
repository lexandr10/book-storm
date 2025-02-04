"use client"
import { toast } from "@/hooks/use-toast";
import config from "@/lib/confing";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import Image from "next/image";
import { useRef, useState } from "react";


const {env: {imagekit: {publicKey, urlEndpoint}}} = config



const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`)
        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }
        const data = await response.json();
        const { signature, expire, token } = data
        
        return {signature, expire, token}
        
    } catch (error: unknown) {
        if (error instanceof Error) {
        throw new Error(`Authentication request failed: ${error.message}`)
        } else {
        throw new Error("Authentication request failed: Unknown error")
        }
    }
}

const ImageUpload = ({onFileChange}: {onFileChange: (filePath: string) => void}) => {

  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)
  
  const onError = (error: IKUploadResponse) => {
    console.log(error)

    toast({
      title: "Image upload failed",
      description: `Your image could not be upload. Please try again`,
      variant: "destructive"
    })
  }
  const onSuccess = (resp: IKUploadResponse) => {
    setFile(resp)
    onFileChange(resp.filePath)

    toast({
      title: "Image uploaded successfully",
      description: `${resp.filePath} uploaded successfully`
    })
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        fileName="test-upload.png"
        onSuccess={onSuccess}
      />
      <button onClick={(e) => {
        e.preventDefault()

        if (ikUploadRef.current) {
          //@ts-ignore 
          ikUploadRef.current?.click()
        }
      }} className="upload-btn">
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain" />
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{ file.filePath}</p>}
      </button>
      {file && <IKImage
        alt={file.filePath}
        path={file.filePath}
        width={500}
        height={300} />}
    </ImageKitProvider>
  );
};

export default ImageUpload;