import type { Metadata } from "next";
import ImageUploader from "./image-uploader";
import { Upload, Info, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "图片上传 | Your App Name",
  description: "支持拖拽或点击上传图片，可同时上传多张图片",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <main className="space-y-8">
          {/* 页面标题区域 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Upload className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-semibold tracking-tight">图片上传</h1>
            </div>
            <p className="text-sm text-gray-600 max-w-2xl">
              支持拖拽或点击上传图片，可同时上传多张图片。上传后支持预览、删除等操作，提供网格和列表两种查看模式。
            </p>
          </div>

          {/* 功能说明卡片 */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">支持多种格式</CardTitle>
                <CardDescription>常见图片格式均可上传</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">JPG</Badge>
                  <Badge variant="secondary">PNG</Badge>
                  <Badge variant="secondary">GIF</Badge>
                  <Badge variant="secondary">WebP</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">文件限制</CardTitle>
                <CardDescription>单个文件大小限制</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-base font-mono">
                  ≤ 5MB
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">查看模式</CardTitle>
                <CardDescription>两种展示方式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="secondary">网格模式</Badge>
                  <Badge variant="secondary">列表模式</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 上传区域 */}
          <Card>
            <CardContent className="pt-6">
              <ImageUploader />
            </CardContent>
          </Card>

          {/* 注意事项 */}
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>上传说明</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 list-inside space-y-1 text-sm text-muted-foreground">
                  <li>• 支持拖拽上传或点击选择文件</li>
                  <li>• 可以同时选择多个文件上传</li>
                  <li>• 上传后可以预览、全屏查看和删除</li>
                  <li>• 支持网格和列表两种查看模式</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>注意事项</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 list-inside space-y-1 text-sm text-muted-foreground">
                  <li>• 请确保上传的图片内容合规</li>
                  <li>• 建议上传清晰度较高的图片</li>
                  <li>• 上传前请确认文件大小不超过限制</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          {/* 页脚信息 */}
          <footer className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              如有任何问题，请联系技术支持
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}