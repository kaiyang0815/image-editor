"use client";

import { useParams, useSearchParams } from "next/navigation";
import ImageEditor from "@/components/image-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FileData {
  name: string;
  preview: string;
  id: string;
}

export default function EditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const filename = decodeURIComponent(params.filename as string);

  // 从 URL 参数中获取文件数据
  const fileDataStr = searchParams.get("data");
  let fileData: FileData | null = null;

  try {
    if (fileDataStr) {
      fileData = JSON.parse(decodeURIComponent(fileDataStr));
    }
  } catch (error) {
    console.error("Error parsing file data:", error);
  }

  if (!fileData) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
          </Link>
        </div>
        <div className="text-center text-red-500">没有找到图片数据</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <div className="border-b">
        <div className="container mx-auto">
          <div className="h-16 flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium">编辑图片</h1>
              <span className="text-sm text-muted-foreground">{filename}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto py-6">
        <ImageEditor filename={filename} imageUrl={fileData.preview} />
      </div>
    </div>
  );
}
