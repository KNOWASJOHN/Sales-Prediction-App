import type React from "react"
import type { Metadata } from "next"
import { condenso, copixel, epoch, ezonix, gunken, highrise, lemon, roxhead } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sales Prediction Tool",
  description: "AI-powered sales forecasting based on advertising budget allocation",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`
        ${condenso.variable}
        ${copixel.variable}
        ${epoch.variable}
        ${ezonix.variable}
        ${gunken.variable}
        ${highrise.variable}
        ${lemon.variable}
        ${roxhead.variable}
      `}>
        {children}
      </body>
    </html>
  )
}
