"use client"

import { uploadFile } from "@/actions/general";
import { Button } from "@/ui/button";
import { Camera, FileText, FileTextIcon, FileVideo, Play, Upload, UploadIcon, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const FileUpload = ({ value, onChange, className, ...restProps }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const uploadFileToApi = async (file) => {
        const formData = new FormData();

        if (file.type.startsWith("image/")) {
            formData.append("image", file);
        } else if (file.type.startsWith("video/")) {
            formData.append("video", file);
        } else {
            toast.error("Unsupported file type");
            return null;
        }

        try {
            const resp = await uploadFile({ body: formData });
            const { results, error, message } = resp
            if (error) {
                toast.error(message)
                return null;
            }
            toast.success("File uploaded successfully!");
            return results?.video || results?.image;
        } catch (error) {
            toast.error("Upload failed");
            return null;
        }
    };

    const handleFile = useCallback(async (file) => {
        const allowedTypes = ['image/', 'video/', 'application/pdf'];
        const isValidType = allowedTypes.some(type => file.type.startsWith(type));

        const MAX_FILE_SIZE = 1000 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            toast.warning("File too large");
            onChange?.(null);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        if (!isValidType) {
            toast.warning("Invalid file type");
            onChange?.(null);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        setUploading(true);

        const uploadedFileUrl = await uploadFileToApi(file);
        console.log(uploadedFileUrl);

        if (!uploadedFileUrl) {
            setUploading(false);
            onChange?.(null);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        const newFile = {
            id: Date.now(),
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
            fileType: '',
            preview: null,
            uploadedUrl: uploadedFileUrl
        };

        const handleSetFile = (preview, fileType) => {
            console.log("newFile", newFile);

            newFile.preview = preview || uploadedFileUrl;
            newFile.fileType = fileType;
            onChange?.(newFile);
            setUploading(false);
        };

        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleSetFile(e.target.result, file.type.startsWith("image/") ? "image" : "video");
            };
            reader.readAsDataURL(file);
        } else if (file.type === "application/pdf") {
            handleSetFile(null, "pdf");
        }
    }, [onChange]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    const removeFile = () => {
        onChange?.(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        toast.info("File removed");
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileType) => {
        switch (fileType) {
            case 'image':
                return <Camera className="w-5 h-5" />;
            case 'video':
                return <FileVideo className="w-5 h-5" />;
            case 'pdf':
                return <FileText className="w-5 h-5" />;
            default:
                return <Upload className="w-5 h-5" />;
        }
    };

    const renderPreview = () => {
        if (!value) return null;

        const { fileType, preview, name, uploadedUrl } = value;

        switch (fileType) {
            case 'image':
                return (
                    <div className="aspect-video bg-muted flex w-full items-center justify-center overflow-hidden rounded-t-lg">
                        <img
                            src={preview}
                            alt={name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                );

            case 'video':
                return (
                    <div className="aspect-video bg-black flex items-center justify-center overflow-hidden rounded-t-lg relative">
                        <video
                            src={preview}
                            className="w-full h-full object-cover"
                            controls={false}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                );

            case 'pdf':
                return (
                    <div className="aspect-video bg-red-50 flex items-center justify-center overflow-hidden rounded-t-lg">
                        <div className="text-center space-y-2">
                            <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                                <FileTextIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <p className="text-red-700 font-medium text-sm">PDF Document</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`space-y-2 ${className}`} {...restProps}>
            {!value ? (
                <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer
              ${dragActive
                            ? 'border-primary bg-primary/5 scale-[1.02]'
                            : 'border-border hover:border-primary/50 hover:bg-muted/30'
                        }
              ${uploading ? 'pointer-events-none opacity-70 cursor-not-allowed' : ''}
            `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={uploading ? null : onButtonClick}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*,video/*,application/pdf"
                        onChange={handleChange}
                        className="hidden"
                        disabled={uploading}
                    />

                    <div className="space-y-3">
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                ${dragActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
              `}>
                            {uploading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            ) : (
                                <UploadIcon className="w-6 h-6" />
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-1">
                                {uploading ? 'Uploading...' : (dragActive ? 'Drop your file here!' : 'Upload a file')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Drag and drop or{' '}
                                <span className="text-primary font-medium">browse</span> to choose
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Images, Videos, PDF (Max 10MB)
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border rounded-lg w-full overflow-hidden">
                    {renderPreview()}

                    <div className="p-4 w-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3 w-fit">
                                <div className="aspect-square w-fit text-muted-foreground">
                                    {getFileIcon(value.fileType)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs w-full max-w-[200px] font-medium truncate">
                                        {value.name}
                                    </p>
                                    <div className="flex items-center space-x-2 w-fit">
                                        <span className="text-xs text-muted-foreground">
                                            {formatFileSize(value.size)}
                                        </span>
                                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                                            {value.fileType}
                                        </span>
                                        {value.uploadedUrl && (
                                            <span className="text-xs text-blue-500 truncate max-w-[100px]">
                                                (Uploaded)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={removeFile}
                                className="h-8 w-8 p-0 border text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                disabled={uploading}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;