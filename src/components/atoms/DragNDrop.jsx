import { getType } from "@/lib/utils"
import { CheckIcon, FileIcon, TrashIcon, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import Loading from "./loading"

const getFileSizeConverted = _size => {
    let fSExt = ["Bytes", "KB", "MB", "GB"],
        i = 0
    while (_size > 900) {
        _size /= 1024
        i++
    }
    const size = Math.round(_size * 100) / 100
    return size + " " + fSExt[i]
}

const DragNDrop = ({
    label = "Upload a file",
    onFileChange = console.log,
    accept = "image/png, image/jpeg, image/jpg, image/webp",
    formats = ".png, .jpg, .jpeg, .webp",
    formatType = "image",
    maxSize = 10,
    disabled = false,
    src = null,
    required = true,
    showPreview = true,
    largeFileProtocol = false,
    isUploading = false,
    progress = 0,
    startUpload = () => false,
    cancelUpload = () => false,
    resetUpload = () => false,
    uploadState = null,
    maxWidth = "max-w-xl",
    ...props
}) => {
    const dropRef = useRef()
    const dragCounter = useRef(0)
    const dropHeight = useRef()
    const dragging = useRef()
    const [file, setFile] = useState(src)

    useEffect(() => {
        setFile(src)
    }, [src])

    const fileLink = useMemo(
        () =>
            formatType === "image"
                ? file === src
                    ? src
                    : file
                        ? Object.prototype.toString.call(file) === "[object String]"
                            ? file
                            : URL.createObjectURL(file)
                        : null
                : null,
        [file, formatType, src]
    )

    const inputLabel = useMemo(() => {
        label ? label.replace(" ", "-").toLowerCase() : "image"
    }, [label])

    const fileSizeValid = useCallback(
        fileSize => {
            if (maxSize === 0) return true
            if (parseInt(fileSize / 1024) <= maxSize * 1000) return true
            return false
        },
        [maxSize]
    )

    const handleDrag = e => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = e => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter.current++
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
            dragging.current = true
    }
    const handleDragOut = e => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter.current--
        if (dragCounter.current === 0) dragging.current = false
    }
    const handleDrop = e => {
        e.preventDefault()
        e.stopPropagation()
        dragging.current = false
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const inputFile = e.dataTransfer.files[0]
            if (fileSizeValid(inputFile.size)) {
                setFile(inputFile)
                onFileChange({
                    target: {
                        id: props.id,
                        files: e.dataTransfer.files,
                        type: "file",
                    },
                })
                e.dataTransfer.clearData()
                dragCounter.current = 0
            } else toast.error(`File size should be less than ${maxSize}MB`)
        }
    }

    const handleFileInput = e => {
        const inputFile = e.target.files[0]
        if (fileSizeValid(inputFile.size)) {
            setFile(inputFile)
            onFileChange(e)
        } else toast.error(`File size should be less than ${maxSize}MB`)
    }

    const removeFile = () => {
        setFile()
        onFileChange({
            target: {
                id: props.id,
                files: [],
                type: "file",
            },
        })
        if (getType(resetUpload) === "Function") resetUpload()
    }

    useEffect(() => {
        const dropDiv = dropRef.current
        dropHeight.current = dropDiv.offsetHeight
        dropDiv.addEventListener("dragenter", handleDragIn)
        dropDiv.addEventListener("dragleave", handleDragOut)
        dropDiv.addEventListener("dragover", handleDrag)
        dropDiv.addEventListener("drop", handleDrop)
        return () => {
            dropDiv.removeEventListener("dragenter", handleDragIn)
            dropDiv.removeEventListener("dragleave", handleDragOut)
            dropDiv.removeEventListener("dragover", handleDrag)
            dropDiv.removeEventListener("drop", handleDrop)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    // 	localStorage.setItem("fileChunksUploadProgress", null)

    // 	const handleLocalStorageChange = () => {
    // 		const storageValue = JSON.parse(
    // 			localStorage.getItem("fileChunksUploadProgress")
    // 		)
    // 		const totalProgress =
    // 			Object.values(storageValue).reduce((a, b) => a + b, 0) /
    // 			Object.values(storageValue).length
    // 		console.debug(`🚀 ~ Progress:`, { totalProgress })
    // 		setProgress(totalProgress)
    // 	}

    // 	window.addEventListener("progressUpdated", handleLocalStorageChange)

    // 	return () => {
    // 		window.removeEventListener(
    // 			"progressUpdated",
    // 			handleLocalStorageChange
    // 		)
    // 	}
    // }, [])

    return (
        <>
            <div className="h-full flex flex-col">
                <div
                    className={classNames(
                        "mt-1 rounded-md border-neutral-300 dark:border-neutral-700 overflow-hidden transition-all duration-300",
                        file && showPreview
                            ? "group relative border shadow"
                            : "flex-grow border-2 border-dashed hover:border-neutral-400 dark:hover:border-neutral-500",
                        maxWidth
                    )}
                    ref={dropRef}
                >
                    {!file || !showPreview ? (
                        <div className="h-full w-full space-y-1 flex items-center justify-center flex-col text-center p-4">
                            <div className="mx-auto w-8 text-slate-400 mb-3">
                                <FileIcon
                                    color="white"
                                    extension={formats
                                        .split(",")[0]
                                        .replace(".", "")}
                                    {...defaultStyles[
                                    formats.split(",")[0].replace(".", "")
                                    ]}
                                />
                            </div>
                            <div className="flex flex-col text-sm text-slate-600">
                                <label
                                    disabled={disabled}
                                    htmlFor={props.id}
                                    className={classNames(
                                        "relative flex flex-col cursor-pointer rounded-md font-medium text-purple-500 focus-within:outline-none focus-within:ring-0 dark:text-purple-400",
                                        disabled ? "cursor-not-allowed" : ""
                                    )}
                                >
                                    {props.multiple ? (
                                        <span>Upload files</span>
                                    ) : (
                                        <span>Upload a file</span>
                                    )}
                                    <input
                                        disabled={disabled}
                                        type="file"
                                        className="sr-only disabled:cursor-not-allowed"
                                        required={required}
                                        onChange={handleFileInput}
                                        accept={accept}
                                        name={props.id}
                                        {...props}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-slate-500">
                                <span>
                                    {accept === "*" ? "All formats" : formats}
                                </span>{" "}
                                {maxSize === 0 ? null : (
                                    <span>up to {maxSize}MB</span>
                                )}
                            </p>
                        </div>
                    ) : file && showPreview ? (
                        formatType === "image" && fileLink ? (
                            <>
                                <div className="h-full w-full relative aspect-video border border-neutral-200 dark:border-neutral-700">
                                    <Image
                                        src={fileLink}
                                        alt={label}
                                        fill
                                        priority
                                        className="group-hover:blur-sm group-hover:opacity-50 object-contain transition-all duration-300"
                                    />
                                </div>
                                <div
                                    className="w-full h-full absolute inset-0 group-hover:scale-100 scale-0 transition-all duration-300 flex items-center justify-center z-10 cursor-pointer"
                                    onClick={removeFile}
                                >
                                    <TrashIcon className="h-8 w-8 text-red-500" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-2 w-full p-4 bg-neutral-100 dark:bg-neutral-700 items-center justify-between">
                                    <div className="w-full flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 flex-shrink-0">
                                                <FileIcon
                                                    color="white"
                                                    extension={formats
                                                        .split(",")[0]
                                                        .replace(".", "")}
                                                    {...defaultStyles[
                                                    formats
                                                        .split(",")[0]
                                                        .replace(".", "")
                                                    ]}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">
                                                    {file.name ??
                                                        file.originalName}
                                                </span>
                                                {file.size ? (
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        {getFileSizeConverted(
                                                            file.size
                                                        )}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        {isUploading ? <Loading /> : null}
                                        {getType(file) !== "File" ||
                                            !largeFileProtocol ||
                                            uploadState === "finished" ? (
                                            <button
                                                type="button"
                                                className="text-xs text-red-600 dark:text-red-500 group p-2 border border-neutral-300 dark:border-neutral-600 rounded-md cursor-pointer"
                                                onClick={removeFile}
                                            >
                                                <X className="h-6 w-6 group-hover:scale-110 transition duration-300" />
                                            </button>
                                        ) : null}
                                    </div>
                                    {getType(file) === "File" &&
                                        getType(startUpload) === "Function" &&
                                        largeFileProtocol &&
                                        uploadState !== "finished" ? (
                                        <div className="w-full flex items-center gap-4">
                                            {[null, "paused"].includes(
                                                uploadState
                                            ) ? (
                                                <button
                                                    type="button"
                                                    className="w-full flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-500 group p-2 border border-neutral-300 dark:border-neutral-600 rounded-md cursor-pointer"
                                                    onClick={startUpload}
                                                >
                                                    <CheckIcon className="h-4 w-4 group-hover:scale-110 transition duration-300" />
                                                    <span>Upload</span>
                                                </button>
                                            ) : (
                                                <div className="w-full flex flex-col gap-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">
                                                            Progress
                                                        </span>
                                                        <span className="text-sm font-medium">
                                                            {progress}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full rounded-full h-2.5 dark:bg-white/5 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-700">
                                                        <div
                                                            className="bg-blue-500 h-2.5 rounded-full dark:bg-blue-500"
                                                            style={{
                                                                width: `${progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {[null, "paused"].includes(
                                                uploadState
                                            ) ? (
                                                <button
                                                    type="button"
                                                    className="w-full flex items-center justify-center gap-2 text-xs text-red-600 dark:text-red-500 group p-2 border border-neutral-300 dark:border-neutral-600 rounded-md cursor-pointer"
                                                    onClick={removeFile}
                                                >
                                                    <X className="h-4 w-4 group-hover:scale-110 transition duration-300" />
                                                    <span>Cancel</span>
                                                </button>
                                            ) : uploadState === "finished" ||
                                                parseInt(progress) === 100 ? (
                                                <Loading className="text-white" />
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center text-xs text-red-600 dark:text-red-500 group p-2 border border-neutral-300 dark:border-neutral-600 rounded-md cursor-pointer"
                                                    onClick={cancelUpload}
                                                >
                                                    <X className="h-6 w-6 group-hover:scale-110 transition duration-300" />
                                                </button>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        )
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default DragNDrop