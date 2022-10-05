import React from "react";

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsContent: number;
}
function GameBanner(props: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden hover:scale-105 transition-transform "
    >
      <img src={props.bannerUrl} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
        <strong className="font-bold text-white">{props.title}</strong>
        <span className="text-zinc-300 text-sm block mt-1">
          {props.adsContent} anúncio(s)
        </span>
      </div>
    </a>
  );
}

export default GameBanner;
