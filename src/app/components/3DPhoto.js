"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ThreeDCardDemo({ photo, index }) {
  // 默认照片数据
  const defaultPhoto = {
    title: "没有照片了！",
    description: "实在是没有照片了，所以用这个凑数吧......",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "thumbnail"
  };

  const currentPhoto = photo || defaultPhoto;

  return (
    <CardContainer className="inter-var dark">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {currentPhoto.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {currentPhoto.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={currentPhoto.src}
            height="400"
            width="400"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={currentPhoto.alt}
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
