"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brush } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { open } from "@tauri-apps/api/dialog";
import { useState } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { isImage, shuffle } from "@/lib/utils";

interface DrawingSettingsShellProps {
  setDrawingTimeInterval(time: number): void;
  setImagePathList(imagePathList: string[]): void;
  setIsSettings(isSettings: boolean): void;
}

export function DrawingSettingsShell({
  setDrawingTimeInterval,
  setImagePathList,
  setIsSettings,
}: DrawingSettingsShellProps) {
  // const [folderPath, setFolderPath] = useState<string>("");
  const [imagesCount, setImagesCount] = useState<number>(0);

  async function updatePaths(folderPath: string) {
    const fileList = await readDir(folderPath, {
      recursive: false,
    });

    const imageList = fileList
      .map((filePath) => filePath.path)
      .filter((filePath) => isImage(filePath));

    const shuffledImages = shuffle(imageList);

    setImagePathList(shuffledImages);
    setImagesCount(imageList.length);
  }
  async function openImagesFolder() {
    const selected = await open({
      directory: true,
      multiple: false,
    });

    if (typeof selected === "string") {
      // setFolderPath(selected);
      await updatePaths(selected);
    }
  }

  function startDrawing() {
    if (imagesCount > 0) {
      //start drawing
      setIsSettings(false);
    }
  }

  return (
    <section className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Gesture drawing</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            onClick={openImagesFolder}
            className="w-full"
          >
            Select folder with refs
          </Button>
          <Label>Selected images: {imagesCount}</Label>

          <Separator className="my-4" />

          <Label>Drawing time interval</Label>
          <Select
            onValueChange={(value) => setDrawingTimeInterval(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select drawing time interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="30">30 sec</SelectItem>
                <SelectItem value="45">45 sec</SelectItem>
                <SelectItem value="60">1 min</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            disabled={imagesCount <= 0}
            onClick={startDrawing}
          >
            <Brush className="mr-2 h-4 w-4" /> Go drawing
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
