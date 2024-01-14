"use client";

import { convertFileSrc } from "@tauri-apps/api/tauri";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Pause,
  Play,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { Progress } from "@/components/ui/progress";
import { shuffle } from "@/lib/utils";
interface DrawingShellProps {
  imagePathList: string[];
  drawingTimeInterval: number;
  setIsSettings(isSettings: boolean): void;
}

export function DrawingShell({
  imagePathList,
  drawingTimeInterval,
  setIsSettings,
}: DrawingShellProps) {
  const [imagePaths, setImagePaths] = useState<string[]>(imagePathList);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [progressDrawingTimeInterval, setProgressDrawingTimeInterval] =
    useState<number>(0);

  useKeyboardShortcut(["ArrowRight"], setNextImage);
  useKeyboardShortcut(["ArrowLeft"], setPrevImage);
  useKeyboardShortcut([" "], () => setIsDrawing(!isDrawing));
  useKeyboardShortcut(["Escape"], stopDrawing);

  const [drawingTimeCountdown, setDrawingTimeCountdown] =
    useState<number>(drawingTimeInterval);
  const [isDrawing, setIsDrawing] = useState<boolean>(true);
  const imageTimeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  useEffect(() => {
    if (isDrawing) {
      imageTimeIntervalRef.current = setInterval(() => {
        setDrawingTimeCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(imageTimeIntervalRef.current as NodeJS.Timeout);
  }, [isDrawing]);

  useEffect(() => {
    setProgressDrawingTimeInterval(
      ((drawingTimeInterval - drawingTimeCountdown) / drawingTimeInterval) *
        100,
    );

    if (drawingTimeCountdown === 0) {
      setNextImage();
      resetDrawingTimeCountdown();
    }
  }, [drawingTimeCountdown]);

  useEffect(() => {
    resetDrawingTimeCountdown();
  }, [currentImageIndex]);
  function resetDrawingTimeCountdown() {
    setDrawingTimeCountdown(drawingTimeInterval);
    setIsDrawing(true);
  }

  function stopDrawing() {
    clearInterval(imageTimeIntervalRef.current as NodeJS.Timeout);
    setDrawingTimeCountdown(drawingTimeInterval);
    setIsSettings(true);
  }
  function hasNextImage() {
    return currentImageIndex + 2 <= imagePaths.length;
  }

  function hasPrevImage() {
    return currentImageIndex - 1 >= 0;
  }

  function setNextImage() {
    if (hasNextImage()) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      setCurrentImageIndex(0);
    }
  }

  function setPrevImage() {
    if (hasPrevImage()) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  }

  return (
    <section className="flex flex-col items-center h-screen">
      <div className="p-2 h-[calc(100%-4rem)]">
        <img
          src={convertFileSrc(imagePaths[currentImageIndex])}
          alt="g"
          className="h-full object-scale-down"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-fit h-[3rem] flex items-center justify-center">
          <CardContent className="flex p-2 gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={!hasPrevImage()}
              onClick={() => setCurrentImageIndex((prev) => prev - 1)}
            >
              <ChevronLeft />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawing(!isDrawing)}
            >
              {isDrawing ? <Pause /> : <Play />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => resetDrawingTimeCountdown()}
            >
              <RefreshCcw />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => stopDrawing()}>
              <LogOut />
            </Button>

            <p className="flex items-center justify-center">
              {/*{`${currentImageIndex + 1} / ${imagePaths.length}`}*/}
              {drawingTimeCountdown}
            </p>

            <Button
              variant="ghost"
              size="icon"
              disabled={!hasNextImage()}
              onClick={() => setCurrentImageIndex((prev) => prev + 1)}
            >
              <ChevronRight />
            </Button>
          </CardContent>
        </Card>
        <Progress value={progressDrawingTimeInterval} className="w-full h-1" />
      </div>
    </section>
  );
}
