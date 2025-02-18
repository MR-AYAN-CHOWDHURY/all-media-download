document.getElementById("downloadBtn").addEventListener("click", function() {
    const videoUrl = document.getElementById("videoUrl").value;
    const statusElement = document.getElementById("status");

    if (videoUrl.trim() === "") {
        statusElement.textContent = "Please enter a valid video URL.";
        return;
    }

    statusElement.textContent = "Processing...";

    // Send the URL to the API for downloading
    fetch("https://nayan-videos-downloader-seven.vercel.app/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: videoUrl })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            statusElement.textContent = "Download Started! Please wait.";
            // Create a link to trigger the download
            const downloadLink = document.createElement("a");
            downloadLink.href = data.downloadUrl; // assuming API returns a download URL
            downloadLink.download = "video.mp4"; // You can customize the file name here
            downloadLink.click();
        } else {
            statusElement.textContent = "Failed to download video. Please try again.";
        }
    })
    .catch(error => {
        statusElement.textContent = "Error occurred while processing your request.";
        console.error(error);
    });
});
