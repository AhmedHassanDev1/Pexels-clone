export const generateThumbnail = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    video.src = url;

    
    video.onloadeddata = () => {
      video.currentTime = 1; 
    };

    video.onseeked = () => {
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight / 2;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const thumbnailUrl = canvas.toDataURL("image/png");

      video.remove();
      canvas.remove();

      resolve(thumbnailUrl);
    };
  });
};