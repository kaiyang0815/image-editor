"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  FlipHorizontal,
  FlipVertical,
  Save,
  SunMedium,
  Contrast,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ImageEditorProps {
  filename: string;
  imageUrl: string;
}

export default function ImageEditor({ filename, imageUrl }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImage(img);
  }, [imageUrl]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 计算旋转后的尺寸
    const isRotated = rotation % 180 !== 0;
    let originalWidth = image.width;
    let originalHeight = image.height;

    // 计算旋转后的实际尺寸
    let width = isRotated ? originalHeight : originalWidth;
    let height = isRotated ? originalWidth : originalHeight;

    // 计算适当的缩放比例
    const maxWidth = 1200;
    const maxHeight = 800;
    const ratio = Math.min(
      maxWidth / width,
      maxHeight / height,
      1 // 不放大，只缩小
    );

    // 应用缩放
    width *= ratio;
    height *= ratio;

    // 设置画布尺寸为旋转后的尺寸
    canvas.width = isRotated ? height : width;
    canvas.height = isRotated ? width : height;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 移动到画布中心
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // 应用变换
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.scale(scale, scale);

    // 应用滤镜
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    // 绘制图片
    ctx.drawImage(
      image,
      (-originalWidth * ratio) / 2,
      (-originalHeight * ratio) / 2,
      originalWidth * ratio,
      originalHeight * ratio
    );

    // 重置变换
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [image, rotation, scale, flipX, flipY, brightness, contrast]);

  const handleSave = async () => {
    if (!canvasRef.current) return;

    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current?.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          "image/jpeg",
          0.95
        );
      });

      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const editedFilename = `edited_${filename}`;
      a.download = editedFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("保存图片失败:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      {/* 左侧工具栏 */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            {/* 基本操作按钮 */}
            <div className="grid grid-cols-3 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRotation((r) => r - 90)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>向左旋转</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRotation((r) => r + 90)}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>向右旋转</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFlipX((f) => !f)}
                    >
                      <FlipHorizontal className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>水平翻转</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScale((s) => s + 0.1)}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>放大</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setScale((s) => Math.max(0.1, s - 0.1))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>缩小</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFlipY((f) => !f)}
                    >
                      <FlipVertical className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>垂直翻转</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* 调节控制 */}
        <Card>
          <CardContent className="p-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SunMedium className="h-4 w-4" />
                <label className="text-sm font-medium">亮度</label>
              </div>
              <Slider
                defaultValue={[100]}
                min={0}
                max={200}
                step={1}
                value={[brightness]}
                onValueChange={([value]) => setBrightness(value)}
                className="w-full"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <label className="text-sm font-medium">对比度</label>
              </div>
              <Slider
                defaultValue={[100]}
                min={0}
                max={200}
                step={1}
                value={[contrast]}
                onValueChange={([value]) => setContrast(value)}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* 保存按钮 */}
        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          保存图片
        </Button>
      </div>

      {/* 右侧图片预览 */}
      <Card className="h-[calc(100vh-8rem)]">
        <CardContent className="p-4 h-full">
          <div className="relative w-full h-full flex items-center justify-center bg-[#fafafa] rounded-lg">
            <div className="relative w-full h-full flex items-center justify-center overflow-auto">
              <canvas
                ref={canvasRef}
                className="max-w-[95%] max-h-[95%] object-contain"
                style={{
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
                  backgroundColor: "white",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
