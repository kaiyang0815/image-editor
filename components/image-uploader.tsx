"use client";
import React, { useState, useCallback, useRef } from "react";
import { Upload, X, Expand, Minimize, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface UploadedFile {
  file: File;
  preview: string;
}

// 展示模式类型
type ViewMode = "grid" | "table";

interface ImageUploaderProps {
  onFilesChange?: (files: UploadedFile[]) => void;
}

// 上传组件
const UploadControl: React.FC<ImageUploaderProps> = ({ onFilesChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (uploadedFiles: FileList) => {
      const newFiles: UploadedFile[] = [];

      Array.from(uploadedFiles).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          setError("只能上传图片文件");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setError("图片大小不能超过5MB");
          return;
        }

        const preview = URL.createObjectURL(file);
        newFiles.push({ file, preview });
      });

      onFilesChange?.(newFiles);
      setError(null);
    },
    [onFilesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFiles]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="w-full mb-8">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle className="text-sm font-medium">错误</AlertTitle>
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      <div
        className={`
          relative w-full min-h-[200px] border border-gray-200 rounded-lg
          flex flex-col items-center justify-center
          ${isDragging ? "bg-blue-50 border-blue-300" : "bg-gray-50/50 hover:bg-gray-50"}
          transition-colors duration-200 px-6 py-8
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileInput} />

        <Upload className="w-8 h-8 text-gray-400 mb-4" />
        <div className="space-y-3 text-center">
          <p className="text-sm text-gray-600">拖拽图片到此处或</p>
          <Button variant="outline" onClick={handleButtonClick} className="h-8 px-4 text-sm">
            选择图片
          </Button>
          <p className="text-xs text-gray-500">支持 JPG、PNG、GIF 格式，单个文件不超过5MB</p>
        </div>
      </div>
    </div>
  );
};

// 图片列表组件
const ImageList: React.FC<{
  files: UploadedFile[];
  onRemove: (index: number) => void;
  viewMode: ViewMode;
  filterText: string; // 新增的筛选文本属性
}> = ({ files, onRemove, viewMode, filterText }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handleImageClick = (e: React.MouseEvent, preview: string) => {
    e.stopPropagation();
    setFullscreenImage(preview);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 根据筛选文本过滤文件
  const filteredFiles = files.filter((file) => file.file.name.toLowerCase().includes(filterText.toLowerCase()));

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  if (viewMode === "table") {
    return (
      <>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">预览</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文件名</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFiles.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img src={file.preview} alt={file.file.name} className="w-full h-full object-cover cursor-pointer" onClick={(e) => handleImageClick(e, file.preview)} />
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-sm text-gray-900 truncate max-w-xs">{file.file.name}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-sm text-gray-500">{formatFileSize(file.file.size)}</p>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullscreenImage(file.preview);
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-100">
                        <Expand className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(index);
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-100">
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {fullscreenImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <img src={fullscreenImage} alt="fullscreen preview" className="max-w-full max-h-full object-contain" />

            {/* 右上角的关闭按钮 */}
            <button onClick={closeFullscreen} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        )}
      </>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file, index) => (
        <div key={index} className="relative group rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
          <div className="relative aspect-square">
            <img src={file.preview} alt={file.file.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => setFullscreenImage(file.preview)} className="p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors">
                  <Expand className="w-4 h-4 text-gray-700" />
                </button>
                <button onClick={() => onRemove(index)} className="p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors">
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
          <div className="px-3 py-2 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-600 truncate">{file.file.name}</p>
          </div>
        </div>
      ))}

      {fullscreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <img src={fullscreenImage} alt="fullscreen preview" className="max-w-full max-h-full object-contain" />

          {/* 右上角的关闭按钮 */}
          <button onClick={closeFullscreen} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      )}
    </div>
  );
};

// 主组件
const ImageUploader = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterText, setFilterText] = useState(""); // 新增筛选文本状态

  const handleFilesChange = useCallback((newFiles: UploadedFile[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  return (
    <div className="space-y-6">
      <UploadControl onFilesChange={handleFilesChange} />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">已上传图片</h2>
            <div className="flex gap-2">
              <Input placeholder="筛选文件" value={filterText} onChange={(e) => setFilterText(e.target.value)} className="h-8 text-sm px-2" />
              <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className="px-3">
                <Grid className="w-4 h-4 mr-1" />
                网格
              </Button>
              <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")} className="px-3">
                <List className="w-4 h-4 mr-1" />
                列表
              </Button>
            </div>
          </div>

          <ImageList
            files={files}
            onRemove={removeFile}
            viewMode={viewMode}
            filterText={filterText} // 传递筛选文本
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
