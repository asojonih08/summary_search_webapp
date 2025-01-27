import React from "react";

interface YoutubeEmbedProps {
  videoId: string;
}

export default function YoutubeEmbed({ videoId }: YoutubeEmbedProps) {
  return (
    <iframe
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      title="youtube.com"
      width="100%"
      height="100%"
      allowFullScreen
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&amp;color=white&amp;playsinline=true&amp;enablejsapi=1&amp;widgetid=11`}
      id="widget12"
    ></iframe>
  );
}
