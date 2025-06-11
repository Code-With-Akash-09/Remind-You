import { getType } from "@/lib/utils"
import cookieService from "@/services/cookie"
import { useRef, useState } from "react"
import { toast } from "sonner"
import * as tus from "tus-js-client"

const endpointUri = process.env.CLIENT_API_URL

const useTusUpload = options => {
    const { onSuccess, onError } = options ?? {}
    const [progress, setProgress] = useState("0.00")
    const [uploadState, setUploadState] = useState(null)
    const [props, setProps] = useState(null)
    const tusRef = useRef(null)

    const initTusUpload = (file, autoStart, additionalProps) => {
        const tusUpload = new tus.Upload(file, {
            endpoint: `${endpointUri}/v1/learn/upload/file`,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: file.name,
                filetype: file.type,
            },
            headers: {
                Authorization: `Bearer ${cookieService.getToken("access")}`,
            },
            onError: error => {
                toast.error("Error Uploading File", JSON.stringify(error))
                setUploadState("errored")
                if (getType(onError) === "Function")
                    onError({ error, props: additionalProps })
            },
            onProgress: (bytesUploaded, bytesTotal) => {
                const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(
                    2
                )
                setProgress(percentage)
            },
            onSuccess: () => {
                toast.success("File Uploaded Successfully")
                setUploadState("finished")
                if (getType(onSuccess) === "Function")
                    onSuccess({ tus: tusUpload, props: additionalProps })
            },
        })

        tusRef.current = tusUpload

        if (autoStart) startOrResumeUpload()
    }

    const startOrResumeUpload = () => {
        tusRef.current.findPreviousUploads().then(previousUploads => {
            if (previousUploads.length) {
                tusRef.current.resumeFromPreviousUpload(previousUploads[0])
            }

            tusRef.current.start()
            setUploadState("started")
        })
    }

    const pauseOrAbortUpload = () => {
        tusRef?.current?.abort()
        setUploadState("paused")
    }

    const toggleUpload = () => {
        if (tusRef.current)
            if (uploadState === null) startOrResumeUpload()
            else if (uploadState === "started") pauseOrAbortUpload()
            else if (uploadState === "paused") startOrResumeUpload()
    }

    const resetUpload = () => {
        setUploadState(null)
        setProgress("0.00")
    }

    const handleFileForTus = (
        file,
        autoStart = false,
        additionalProps = null
    ) => {
        resetUpload()
        if (file) {
            initTusUpload(file, autoStart, additionalProps)
            setProps(additionalProps)
        }
    }

    return {
        handleFileForTus,
        startOrResumeUpload,
        pauseOrAbortUpload,
        toggleUpload,
        resetUpload,
        progress,
        uploadState,
        tusProps: props,
        tusRef: tusRef.current,
    }
}

export default useTusUpload