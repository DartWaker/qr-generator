document.getElementById("generateBtn").addEventListener("click", function () {
  const link = document.getElementById("linkInput").value.trim();
  const qrcodeDiv = document.getElementById("qrcode");
  const downloadOptions = document.getElementById("downloadOptions");

  // Очищення попереднього QR-коду
  qrcodeDiv.innerHTML = "";
  downloadOptions.style.display = "none";

  if (link) {
    // Генерація QR-коду у форматі Canvas
    QRCode.toCanvas(link, { width: 200 }, function (error, canvas) {
      if (error) {
        console.error("Помилка:", error);
        alert("Сталася помилка при створенні QR-коду!");
      } else {
        qrcodeDiv.appendChild(canvas); // Додаємо QR-код у div

        // Додаємо функціонал завантаження PNG
        document.getElementById("downloadPngBtn").onclick = function () {
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = "qr-code.png";
          downloadLink.click();
        };
      }
    });

    // Генерація QR-коду у форматі SVG
    QRCode.toString(link, { type: "svg" }, function (error, svgString) {
      if (error) {
        console.error("Помилка:", error);
      } else {
        // Збереження SVG для завантаження
        document.getElementById("downloadSvgBtn").onclick = function () {
          const blob = new Blob([svgString], { type: "image/svg+xml" });
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = "qr-code.svg";
          downloadLink.click();
        };

        downloadOptions.style.display = "block"; // Відображаємо кнопки завантаження
      }
    });
  } else {
    alert("Будь ласка, введіть посилання!");
  }
});
