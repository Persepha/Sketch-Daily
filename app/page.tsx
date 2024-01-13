"use client";

import { convertFileSrc } from "@tauri-apps/api/tauri";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { open } from "@tauri-apps/api/dialog";
import { useState, useEffect } from "react";

import { appDataDir, documentDir, join } from "@tauri-apps/api/path";
import { DrawingSettingsShell } from "@/components/shell/drawing-settings-shell";
import Link from "next/link";

export default function Home() {
  async function openDirect() {
    const selected = await open({
      directory: true,
      multiple: true,
    });
    setTest(JSON.stringify(selected));
  }

  const [test, setTest] = useState<string>("b");

  const [imagePath, setImagePath] = useState<string | null>(null);

  async function updatePaths() {
    setImagePath(
      convertFileSrc(await join("C:\\Shizuo\\drawing\\refs\\lips", "2.PNG")),
    );
    // const appDataDirPath = await appDataDir();
    // setImagePath(appDataDirPath);
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="">
      {/*<Menu />*/}
      <div>{imagePath}</div>

      <Button variant="outline" onClick={openDirect}>
        Outline
      </Button>

      <Button variant="outline" onClick={updatePaths}>
        gggggg
      </Button>

      <Link href={"/drawing"}>Start</Link>

      <DrawingSettingsShell />
      <img src={imagePath || ""} alt="bbb" />
    </main>
  );
}
