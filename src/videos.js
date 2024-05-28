// src/videos.js
const generateThumbnail = (videoPath) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoPath;
    video.crossOrigin = "anonymous"; // For CORS support

    video.addEventListener("loadeddata", () => {
      video.currentTime = 5; // Capture thumbnail at 5 seconds
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, "image/jpeg");
    });

    video.addEventListener("error", (err) => {
      reject("Error generating thumbnail:", err);
    });
  });
};

export { generateThumbnail };
