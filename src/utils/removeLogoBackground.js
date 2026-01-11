/**
 * Remove gray background from logo image using Canvas API
 */
export const removeLogoBackground = (imageSrc, callback) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw the image
    ctx.drawImage(img, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Threshold for gray background detection
    const grayThreshold = 200;
    
    // Process each pixel
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      
      // If pixel is light gray/white, make it transparent
      if (brightness > grayThreshold) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }
    
    // Put modified image data back
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to data URL and call callback
    const dataUrl = canvas.toDataURL('image/png');
    callback(dataUrl);
  };
  
  img.src = imageSrc;
};

