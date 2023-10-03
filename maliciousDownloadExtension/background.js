chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  if (isMalicious(item)) {
    reportMaliciousDownload(item);
  }
});

function isMalicious(downloadItem) {
  const maliciousExtensions = [".exe", ".dmg", ".html"];
  const fileExtension = downloadItem.filename.split(".").pop();
  return maliciousExtensions.includes("." + fileExtension);
}

async function reportMaliciousDownload(downloadItem) {
  const reportData = createReportData(downloadItem);
  try {
    const response = await sendReportToServer(reportData);
    handleReportResponse(response);
  } catch (error) {
    handleReportError(error);
  }
}

function createReportData(downloadItem) {
  return {
    filename: downloadItem.filename,
    url: downloadItem.finalUrl,
    timestamp: Date.now(),
  };
}

async function sendReportToServer(reportData) {
  const reportEndpoint = "http://localhost:3000/report";
  return fetch(reportEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reportData),
  });
}

function handleReportResponse(response) {
  if (response.ok) {
    console.log("Malicious download reported successfully.");
  } else {
    console.error(`HTTP error!: ${response.status} - ${response.text()}`);
  }
}

function handleReportError(error) {
  console.error("Failed to report malicious download:", error);
}

