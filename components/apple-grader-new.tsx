"use client"

import { useState, useRef } from "react"
import { Camera, Apple, Loader2, RotateCcw, Menu, Shield, User, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Step = "start" | "camera" | "analyzing" | "result"

export function AppleGrader() {
  const [step, setStep] = useState<Step>("start")
  const [grade, setGrade] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleStartClick = () => {
    setStep("camera")
  }

  const handleCameraClick = () => {
    setStep("analyzing")
    
    // 1-5초 후 결과 표시
    const randomDelay = Math.random() * 4000 + 1000 // 1-5초
    setTimeout(() => {
      setGrade("상")
      setStep("result")
    }, randomDelay)
  }

  const handleAlbumClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setStep("analyzing")
      
      // 1-5초 후 결과 표시
      const randomDelay = Math.random() * 4000 + 1000 // 1-5초
      setTimeout(() => {
        setGrade("상")
        setStep("result")
      }, randomDelay)
    }
  }

  const handleReset = () => {
    setStep("start")
    setGrade(null)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-lg relative">
        {/* Menu Button */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Menu className="h-7 w-7" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-lg py-3 cursor-pointer">
                <User className="h-5 w-5 mr-3" />
                계정
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-3 cursor-pointer">
                <Shield className="h-5 w-5 mr-3" />
                앱 권한
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-3 cursor-pointer">
                <Apple className="h-5 w-5 mr-3" style={{ color: "#CE2029" }} />
                사과 등급 기준표
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-3 cursor-pointer">
                <User className="h-5 w-5 mr-3" />
                회원 가입
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4" style={{ backgroundColor: "#F2F2F2" }}>
            <Apple className="w-10 h-10" style={{ color: "#CE2029" }} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            사과 등급 판별기
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            AI가 사과 등급을 알려드립니다
          </p>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === "start" && (
            <Button
              onClick={handleStartClick}
              className="w-full h-20 text-2xl font-semibold"
              size="lg"
            >
              <Apple className="w-8 h-8 mr-3" style={{ color: "#CE2029" }} />
              사과 등급 판별하기
            </Button>
          )}

          {step === "camera" && (
            <>
              <Button
                onClick={handleCameraClick}
                className="w-full h-20 text-2xl font-semibold"
                size="lg"
              >
                <Camera className="w-8 h-8 mr-3" />
                사진 찍기
              </Button>
              <Button
                onClick={handleAlbumClick}
                variant="outline"
                className="w-full h-14 text-xl"
                size="lg"
              >
                <Image className="w-6 h-6 mr-2" />
                앨범에서 불러오기
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          )}

          {step === "analyzing" && (
            <div className="space-y-6">
              {/* Loading Indicator */}
              <div className="flex flex-col items-center justify-center py-8 bg-secondary rounded-xl">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                <p className="text-2xl font-semibold text-foreground">
                  판독중...
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  AI가 사과를 분석하고 있습니다
                </p>
              </div>
            </div>
          )}

          {step === "result" && (
            <div className="space-y-6">
              {/* Apple Image Display */}
              <div className="flex flex-col items-center justify-center py-8 bg-secondary rounded-xl">
                <Apple className="w-24 h-24 text-primary mb-2" style={{ color: "#CE2029" }} />
                <p className="text-sm text-muted-foreground">
                  (실제 사과 이미지)
                </p>
              </div>

              {/* Result Display */}
              <div className="flex flex-col items-center justify-center py-12 bg-primary/5 rounded-xl border-2 border-primary/20">
                <p className="text-lg text-muted-foreground mb-2">
                  판별 결과
                </p>
                <p className="text-6xl font-bold text-primary mb-2">
                  {grade}
                </p>
                <p className="text-2xl font-semibold text-foreground mb-8">
                  등급
                </p>
                
                {/* Judgment Reason */}
                <div className="w-full text-left bg-white rounded-lg p-4 space-y-3">
                  <p className="text-lg font-semibold text-foreground mb-3">
                    판정 근거
                  </p>
                  <div className="space-y-2 text-base text-foreground">
                    <p>
                      <span className="font-medium">착색률:</span> 95%
                    </p>
                    <p>
                      <span className="font-medium">크기:</span> 85mm
                    </p>
                    <p>
                      <span className="font-medium">당도:</span> 13.5Brix
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full h-14 text-xl"
                size="lg"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                다시 시작
              </Button>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex justify-center gap-3">
          <StepDot active={step === "start"} label="1" />
          <div className="w-8 h-1 bg-border self-center rounded-full" />
          <StepDot active={step === "camera"} label="2" />
          <div className="w-8 h-1 bg-border self-center rounded-full" />
          <StepDot active={step === "analyzing" || step === "result"} label="3" />
        </div>
      </Card>
    </div>
  )
}

function StepDot({ active, label }: { active: boolean; label: string }) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {label}
    </div>
  )
}
