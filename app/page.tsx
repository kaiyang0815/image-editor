import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  Image,
  Paintbrush2,
  FileImage,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero 区域 */}
      <section className="relative flex-1 w-full py-24 md:py-32 overflow-hidden">
        {/* 渐变背景 */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.1),rgba(255,255,255,0))]" />
          <div className="absolute inset-0">
            <div className="h-full w-full bg-white">
              <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* 动态光晕效果 */}
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-[100px] animate-blob" />
          <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-pink-400/30 to-blue-400/30 blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-[100px] animate-blob animation-delay-4000" />
        </div>

        {/* 内容区域 */}
        <div className="relative container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                简单好用的在线图片处理工具
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                支持多种图片格式，提供编辑、转换等功能，让图片处理变得简单高效。
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="h-11 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
                >
                  开始使用
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特点 */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <Upload className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold mb-2">支持多种格式</h3>
                <p className="text-sm text-gray-500">
                  支持 JPG、PNG、GIF、WebP 等多种图片格式，单个文件最大支持
                  5MB。
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <Paintbrush2 className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold mb-2">在线编辑</h3>
                <p className="text-sm text-gray-500">
                  提供旋转、缩放、裁剪、调整亮度对比度等基础编辑功能。
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <FileImage className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold mb-2">批量处理</h3>
                <p className="text-sm text-gray-500">
                  支持同时上传多张图片，提供网格和列表两种查看模式。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              使用步骤
            </h2>
            <p className="text-gray-500 mt-2">只需简单三步，即可完成图片处理</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">上传图片</h3>
              <p className="text-sm text-gray-500">
                拖拽或点击上传按钮选择需要处理的图片
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">编辑处理</h3>
              <p className="text-sm text-gray-500">
                使用提供的工具进行图片编辑和处理
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">保存下载</h3>
              <p className="text-sm text-gray-500">
                处理完成后点击保存按钮下载图片
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                立即开始使用
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
                无需注册，免费使用所有功能
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/upload">
                <Button size="lg" className="h-11">
                  开始使用
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
