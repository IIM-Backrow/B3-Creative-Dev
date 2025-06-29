import './cover.css'
import img from '/agent.png'

export default function CoverAlbum() {
  return (
    <div className="aspect-square w-full max-w-xl relative" style={{ background: 'linear-gradient(to bottom, #1f193c 0%, #010101 50%, #1f193c 100%)' }}>
      <canvas
      className="absolute inset-0 w-full h-full"
      ref={(canvas) => {
        if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Set canvas dimensions
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;

          // Load font once
          document.fonts.load('16px Nemesys').then(() => {
            const texts = [
              { text: 'REVES', size: '110px', y: 80, fill: '#584293', stroke: false },
              { text: 'DHIER', size: '130px', y: 180, fill: 'transparent', stroke: true },
              { text: 'REVES', size: '110px', y: 280, fill: 'transparent', stroke: true },
              { text: 'DHIER', size: '130px', y: 400, fill: 'transparent', stroke: true },
              { text: 'REVES', size: '110px', y: 500, fill: 'transparent', stroke: true },
              { text: 'DHIER', size: '130px', y: 600, fill: '#584293', stroke: false }
            ];

            // Function to draw a single letter
            const drawLetter = (textConfig, letterIndex, charIndex) => {
              const { text, size, y, fill, stroke } = textConfig;
              const letter = text[letterIndex];
              
              ctx.font = `${size} Nemesys`;
              ctx.fillStyle = fill;
              
              // Calculate position for the letter
              ctx.textAlign = 'left';
              const metrics = ctx.measureText(text.substring(0, letterIndex));
              const x = metrics.width;
              
              if (stroke) {
                ctx.strokeStyle = '#584293';
                ctx.lineWidth = 2;
                ctx.strokeText(letter, x, y);
              }
              
              ctx.fillText(letter, x, y);
              
              // Continue animation if there are more letters
              if (letterIndex < text.length - 1) {
                setTimeout(() => drawLetter(textConfig, letterIndex + 1, charIndex), 100);
              } else if (charIndex < texts.length - 1) {
                // Move to the next word after a pause
                setTimeout(() => drawLetter(texts[charIndex + 1], 0, charIndex + 1), 300);
              }
            };

            // Clear the canvas first
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Start the animation with the first letter of the first word
            setTimeout(() => drawLetter(texts[0], 0, 0), 200);
          });
          
        }
        }
      }}
      />
      <canvas
      className="absolute inset-0 w-full h-full z-30"
      ref={(canvas) => {
        if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Set canvas dimensions to match the first canvas
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;

          // Load font and draw overlaid text
            document.fonts.load('16px Nemesys').then(() => {
            ctx.font = '70px Nemesys';
            ctx.fillStyle = '#e1388c';
            ctx.textAlign = 'center';
            ctx.fillText('L', 150, 150);
            ctx.fillText('E', 275, 150);
            ctx.fillText('S', 400, 150);

            ctx.font = '61px Nemesys';
            ctx.strokeStyle = '#e1388c';
            ctx.lineWidth = 2;  
            ctx.fillStyle = 'transparent';
            ctx.textAlign = 'center';
            ctx.strokeText('REVES', 275, 210);

            // Add "DHIER" with just stroke effect
            ctx.font = '72px Nemesys';
            ctx.strokeStyle = '#e1388c';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'transparent';
            ctx.textAlign = 'center';
            ctx.strokeText('DHIER', 275, 275);
            });

          // Draw the image
          const image = new Image();
          image.src = img;
          image.onload = () => {
            ctx.drawImage(image, 110, 110, 350, 250);
          };

          // Add text in Gemina font
          document.fonts.load('16px Gemina').then(() => {
            const text = "Osez affronter la beaute hostile de ce chateau francais devenu ville miniere et battez-vous pour ses precieuses ressources";
            
            // Position the text under the image
            ctx.font = '10px Gemina';
            ctx.fillStyle = '#e1388c';
            ctx.textAlign = 'center';
            
            // Break text into multiple lines
            const maxWidth = 350;
            let words = text.split(' ');
            let line = '';
            let lines = [];
            let y = 390; // Position below the image
            
            for (let i = 0; i < words.length; i++) {
              let testLine = line + words[i] + ' ';
              let metrics = ctx.measureText(testLine);
              if (metrics.width > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
              } else {
                line = testLine;
              }
            }
            lines.push(line);
            
            // Draw each line of text
            lines.forEach((line, index) => {
              ctx.fillText(line, canvas.width / 2 - 20, y + (index * 15));
            });
          });
        }
        }
      }}
      />
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="-50 -50 1100 1100">
      <path className="path" fill="#0c0b06" stroke="#e1388c" strokeWidth="4" d="M982.95,956.32h-126.15c-2.43,5.38-4.87,10.76-7.3,16.13-23.29-.05-46.58-.11-69.87-.16-2.02-5.32-4.05-10.65-6.07-15.97-68.88,0-137.76,0-206.65,0,0-.14,0-.29,0-.43.12-23.58-18.9-42.79-42.48-42.9l-288.61-1.36c-24.74-.12-45.06,19.51-45.8,44.24v.45H53.41c-28.94,0-52.41-23.46-52.41-52.41,0-50.4,0-100.8,0-151.2,10.41-13.91,20.81-27.82,31.22-41.73-.44-68.59-.89-137.17-1.33-205.76L1,462.39V83.3c30.78.15,61.56.31,92.34.46,15.17-27.59,30.33-55.17,45.5-82.76,263.9,0,527.81,0,791.71,0,28.94,0,52.41,23.46,52.41,52.41,0,28.01,0,56.02,0,84.03-11.86,9.99-23.73,19.98-35.59,29.96-.22,39.73-.44,79.46-.67,119.19l36.25,18.11v312.52c-6.59,3.54-13.18,7.09-19.76,10.63-1.12,69.61-2.05,127.16-3.18,196.77,7.65,9.77,15.29,19.54,22.94,29.3,0,34.13,0,68.26,0,102.39Z" />
      </svg>
      <svg className="absolute inset-0 w-full h-full z-20" viewBox="-900 -150 1100 1100">
      <path fill="#e1388c" d="M19.82,778.96c0,3.98-3.24,7.22-7.22,7.22s-7.22-3.24-7.22-7.22,3.24-7.22,7.22-7.22,7.22,3.24,7.22,7.22ZM8.86,778.96c0,2.06,1.68,3.74,3.74,3.74s3.74-1.68,3.74-3.74-1.68-3.74-3.74-3.74-3.74,1.68-3.74,3.74Z" />
      <path fill="#e1388c" d="M36.13,7.22c0,3.98-3.24,7.22-7.22,7.22s-7.22-3.24-7.22-7.22S24.92,0,28.91,0s7.22,3.24,7.22,7.22ZM25.16,7.22c0,2.06,1.68,3.74,3.74,3.74s3.74-1.68,3.74-3.74-1.68-3.74-3.74-3.74-3.74,1.68-3.74,3.74Z" />
      <path fill="#e1388c" d="M52.04,49.64c0,3.98-3.24,7.22-7.22,7.22s-7.22-3.24-7.22-7.22,3.24-7.22,7.22-7.22,7.22,3.24,7.22,7.22ZM41.08,49.64c0,2.06,1.68,3.74,3.74,3.74s3.74-1.68,3.74-3.74-1.68-3.74-3.74-3.74-3.74,1.68-3.74,3.74Z" />
      <path fill="#e1388c" d="M74.42,484.52c0,3.98-3.24,7.22-7.22,7.22s-7.22-3.24-7.22-7.22,3.24-7.22,7.22-7.22,7.22,3.24,7.22,7.22ZM63.45,484.52c0,2.06,1.68,3.74,3.74,3.74s3.74-1.68,3.74-3.74-1.68-3.74-3.74-3.74-3.74,1.68-3.74,3.74Z" />
      <polygon fill="#e1388c" points="51.6 359.35 51.6 529.97 30.81 538.3 30.81 692.19 14.24 698.52 14.24 774.73 10.76 774.73 10.76 696.12 27.34 689.79 27.34 535.95 48.12 527.62 48.12 361.42 27.34 350.16 27.34 247.1 2.72 237.1 2.72 116.17 27.34 102.59 27.34 11 30.81 11 30.81 104.64 6.19 118.23 6.19 234.76 30.81 244.76 30.81 348.09 51.6 359.35" />
      <polygon fill="#e1388c" points="33.53 244.03 33.53 283.04 24.62 283.04 24.62 250.03 0 240.03 0 194.08 8.91 194.08 8.91 234.03 33.53 244.03" />
      <polygon fill="#e1388c" points="68.94 349.72 68.94 479.31 65.46 479.31 65.46 351.16 43.08 328.79 43.08 53.61 46.56 53.61 46.56 327.35 68.94 349.72" />
      <path fill="#e1388c" d="M38.48,608.4v63.2c0,5.07-4.13,9.2-9.2,9.2s-9.2-4.13-9.2-9.2v-63.2c0-5.07,4.13-9.2,9.2-9.2s9.2,4.13,9.2,9.2ZM23.56,671.6c0,3.15,2.57,5.72,5.72,5.72s5.72-2.57,5.72-5.72v-63.2c0-3.15-2.57-5.72-5.72-5.72s-5.72,2.57-5.72,5.72v63.2Z" />
      <rect fill="#e1388c" x="26.52" y="661.38" width="5.53" height="14.92" transform="translate(-639.55 698.12) rotate(-90)" />
      <rect fill="#e1388c" x="26.52" y="650.05" width="5.53" height="14.92" transform="translate(-628.23 686.79) rotate(-90)" />
      <rect fill="#e1388c" x="26.52" y="638.72" width="5.53" height="14.92" transform="translate(-616.9 675.46) rotate(-90)" />
      <rect fill="#e1388c" x="26.52" y="627.4" width="5.53" height="14.92" transform="translate(-605.57 664.14) rotate(-90)" />
      <rect fill="#e1388c" x="26.52" y="616.07" width="5.53" height="14.92" transform="translate(-594.25 652.81) rotate(-90)" />
      <rect fill="#e1388c" x="26.52" y="604.74" width="5.53" height="14.92" transform="translate(-582.92 641.48) rotate(-90)" />
      <polygon fill="#e1388c" points="42.13 439.95 42.13 520.97 49.86 515.79 49.86 430.28 42.13 439.95" />
      <polygon fill="#e1388c" points="37.64 467.16 37.64 499.07 44.82 504.6 44.82 467.16 37.64 467.16" />
      <polygon fill="#e1388c" points="34.39 38.36 34.39 84.59 29.42 80.72 29.42 43.22 34.39 38.36" />
      <polygon fill="#e1388c" points="23.92 93.7 23.92 63.41 29.42 63.41 29.42 99.32 23.92 93.7" />
      <polygon fill="#e1388c" points="28.15 50.33 28.15 65.43 25.39 65.43 25.39 53.61 28.15 50.33" />
      </svg>
      <svg 
        className="absolute inset-0 w-full h-full z-40" 
        viewBox="-120 -650 1100 1100"
      >
        <path fill="#584293" d="M651.46,231.56H27.88V37.61h737.3v117.08l-113.71,76.86ZM34.39,225.04h615.08l109.19-73.81V44.13H34.39v180.91Z"/>
        <polygon fill="#584293" points="774.35 57.18 761.92 44.24 761.92 125.26 774.35 125.26 774.35 57.18"/>
        <polygon fill="#584293" points="777.71 109.21 768.14 116.46 768.14 83.59 777.71 83.59 777.71 109.21"/>
        <polygon fill="#584293" points="16.35 67.02 31.13 67.02 31.13 119.57 16.35 115.69 16.35 67.02"/>
        <polygon fill="#584293" points="32.66 153.74 21.27 162.8 21.27 112.58 32.66 112.58 32.66 153.74"/>
        <polygon fill="#584293" points="194.11 23.96 120.07 23.96 108.51 32.41 108.51 40.87 194.11 40.87 194.11 23.96"/>
        <polygon fill="#584293" points="80.72 41.91 116.45 41.91 116.45 35.52 83.83 35.52 80.72 41.91"/>
        <polygon fill="#584293" points="199.81 40.01 188.59 40.01 188.59 27.06 199.81 31.38 199.81 40.01"/>
        <polygon fill="#584293" points="218.62 22.06 221.55 22.06 213.27 36.73 210.33 36.73 218.62 22.06"/>
        <polygon fill="#584293" points="224.23 22.06 227.16 22.06 218.88 36.73 215.94 36.73 224.23 22.06"/>
        <polygon fill="#584293" points="229.84 22.06 232.77 22.06 224.49 36.73 221.55 36.73 229.84 22.06"/>
        <polygon fill="#584293" points="235.45 22.06 238.38 22.06 230.1 36.73 227.16 36.73 235.45 22.06"/>
        <polygon fill="#584293" points="241.05 22.06 243.99 22.06 235.7 36.73 232.77 36.73 241.05 22.06"/>
        <polygon fill="#584293" points="246.66 22.06 249.6 22.06 241.31 36.73 238.38 36.73 246.66 22.06"/>
        <polygon fill="#584293" points="252.27 22.06 255.21 22.06 246.92 36.73 243.99 36.73 252.27 22.06"/>
        <polygon fill="#584293" points="257.88 22.06 260.82 22.06 252.53 36.73 249.6 36.73 257.88 22.06"/>
        <polygon fill="#584293" points="263.49 22.06 266.43 22.06 258.14 36.73 255.21 36.73 263.49 22.06"/>
        <polygon fill="#584293" points="269.1 22.06 272.03 22.06 263.75 36.73 260.82 36.73 269.1 22.06"/>
        <polygon fill="#584293" points="274.71 22.06 277.64 22.06 269.36 36.73 266.43 36.73 274.71 22.06"/>
        <polygon fill="#584293" points="158.04 217.43 71.57 217.43 61.39 228.3 146.48 228.3 158.04 217.43"/>
        <polygon fill="#584293" points="264.85 259.44 140.45 259.44 123.63 242.61 16.79 242.61 16.79 111.03 20.05 111.03 20.05 239.36 124.97 239.36 141.8 256.18 263.51 256.18 281.39 238.3 365.23 238.3 365.23 241.56 282.74 241.56 264.85 259.44"/>
        <polygon fill="#584293" points="235.1 243.31 173.23 243.31 162.87 228.3 235.1 228.3 235.1 243.31"/>
        <polygon fill="#584293" points="316 245.13 293.35 245.13 288.82 239.93 316 239.93 316 245.13"/>
        <rect fill="#584293" x="241.57" y="229.25" width="2.85" height="6.56"/>
        <rect fill="#584293" x="283.25" y="229.85" width="8.11" height="3.71"/>
        <rect fill="#584293" x="242" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="247.28" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="252.55" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="257.83" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="263.1" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="268.38" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="273.65" y="232.53" width="3.1" height="1.9"/>
        <rect fill="#584293" x="278.93" y="232.53" width="3.1" height="1.9"/>
        <polygon fill="#584293" points="133.64 260.81 0 260.81 0 69.87 16.27 53.61 16.27 31.6 116.45 31.6 116.45 33.23 17.89 33.23 17.89 54.28 1.63 70.55 1.63 259.19 132.97 259.19 153.04 239.11 187.21 239.11 187.21 240.74 153.72 240.74 133.64 260.81"/>
        <polygon fill="#584293" points="672.09 235.33 616.26 235.33 616.26 233.7 671.57 233.7 767.32 164.72 767.32 116.46 768.95 116.46 768.95 165.55 768.61 165.79 672.09 235.33"/>
        <polygon fill="#584293" points="768.95 66.32 767.32 66.32 767.32 25.23 598.82 25.23 577.34 3.75 188.81 3.75 162.59 29.97 161.43 28.82 188.13 2.12 578.01 2.12 599.5 23.61 768.95 23.61 768.95 66.32"/>
        <path fill="#584293" d="M509.24,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M521.93,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M534.61,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M547.3,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M559.98,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M572.67,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M585.35,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M598.04,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M610.72,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M623.41,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M636.09,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <path fill="#584293" d="M648.78,217.94c0,2.41-1.95,4.36-4.36,4.36s-4.36-1.95-4.36-4.36,1.95-4.36,4.36-4.36,4.36,1.95,4.36,4.36Z"/>
        <polygon fill="#584293" points="611.34 27.35 597.95 27.35 576.46 5.87 557.92 5.87 562.41 0 578.89 0 600.38 21.49 607.11 21.49 611.34 27.35"/>
        <polygon fill="#584293" points="551.27 54.25 428.83 54.25 441.95 40.87 551.27 40.87 551.27 54.25"/>
        <polygon fill="#584293" points="208.38 30.21 187.21 30.21 187.21 28.58 207.71 28.58 210.02 26.27 216.85 26.27 216.85 27.9 210.69 27.9 208.38 30.21"/>
        <polygon fill="#584293" points="483.17 33.23 273.65 33.23 273.65 31.6 482.53 31.6 497.03 18.31 593.68 18.31 593.68 19.94 497.66 19.94 483.17 33.23"/>
      </svg>
    </div>
  );
}