import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { Home, Image, Github } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "图片工具 | Your App Name",
  description: "简单好用的在线图片处理工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 导航栏 */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              {/* Logo 和网站名称 */}
              <Link
                href="/"
                className="font-semibold text-lg flex items-center gap-2"
              >
                <Image className="w-5 h-5" />
                <span>图片工具</span>
              </Link>

              {/* 右侧链接和 GitHub */}
              <div className="flex items-center space-x-6">
                <Link
                  href="/upload"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1.5"
                >
                  <Image className="w-4 h-4" />
                  图片上传
                </Link>
                <a
                  href="https://github.com/yourusername/yourrepo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main>{children}</main>

        {/* 页脚 */}
        <footer className="border-t bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 左侧介绍 */}
              <div className="space-y-3">
                <h3 className="font-semibold">关于图片工具</h3>
                <p className="text-sm text-gray-500">
                  一个简单好用的在线图片处理工具，支持图片上传、编辑、格式转换等功能。
                </p>
              </div>

              {/* 中间链接 */}
              <div className="space-y-3">
                <h3 className="font-semibold">快速链接</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <Link href="/" className="hover:text-gray-900">
                      首页
                    </Link>
                  </li>
                  <li>
                    <Link href="/upload" className="hover:text-gray-900">
                      图片上传
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 右侧联系方式 */}
              <div className="space-y-3">
                <h3 className="font-semibold">联系我们</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>邮箱：support@example.com</li>
                  <li>GitHub：@yourusername</li>
                </ul>
              </div>
            </div>

            {/* 版权信息 */}
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
              <p>
                © {new Date().getFullYear()} Your App Name. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
