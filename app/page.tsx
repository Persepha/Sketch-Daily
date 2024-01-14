"use client";

import { useState } from "react";

import { DrawingSettingsShell } from "@/components/shell/drawing-settings-shell";
import { DrawingShell } from "@/components/shell/drawing-shell";

export default function Home() {
  const [imagePathList, setImagePathList] = useState<string[]>([]);
  const [drawingTimeInterval, setDrawingTimeInterval] = useState<number>(30);
  const [isSettings, setIsSettings] = useState<boolean>(true);

  return (
    <main className="flex items-center justify-center h-full">
      {isSettings ? (
        <DrawingSettingsShell
          setDrawingTimeInterval={setDrawingTimeInterval}
          setImagePathList={setImagePathList}
          setIsSettings={setIsSettings}
        />
      ) : (
        <DrawingShell
          imagePathList={imagePathList}
          drawingTimeInterval={drawingTimeInterval}
          setIsSettings={setIsSettings}
        />
      )}
    </main>
  );
}
