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

// chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
//   if (isMalicious(item)) {
//     reportMaliciousDownload(item);
//   }
// });

// function isMalicious(downloadItem) {
//   const maliciousExtensions = [".exe", ".dmg", ".html", ".png"];
//   const fileExtension = downloadItem.filename.split(".").pop();
//   return maliciousExtensions.includes("." + fileExtension);
// }

// async function reportMaliciousDownload(downloadItem) {
//   const reportEndpoint = "http://localhost:3000/report";
//   const reportData = {
//     filename: downloadItem.filename,
//     url: downloadItem.finalUrl,
//     timestamp: Date.now(),
//   };

//   try {
//     const response = await fetch(reportEndpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(reportData),
//     });

//     if (response.ok) {
//       console.log("Malicious download reported successfully.");
//     } else {
//       const errorMessage = await response.text();
//       console.error(`HTTP error!: ${response.status} - ${errorMessage}`);
//     }
//   } catch (error) {
//     console.error("Failed to report malicious download:", error);
//   }
// }

//https://www.dwsamplefiles.com/?dl_id=238
//the difference between arrow function vs regular functions
//async await vs then
//body: JSON.stringify(reportData),?
//fech

//SUp14abw5GDtq4xK
//Admin
