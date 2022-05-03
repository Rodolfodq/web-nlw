import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps {
  screenshot: string | null;
  onScreenshootTook: (screenshot: string | null) => void;
}

export function ScreenShotButton({
  screenshot,
  onScreenshootTook,
}: ScreenShotButtonProps) {
  const [isTakingShoot, setIsTankingShoot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTankingShoot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    onScreenshootTook(base64image);
    setIsTankingShoot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshootTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors "
    >
      {isTakingShoot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
