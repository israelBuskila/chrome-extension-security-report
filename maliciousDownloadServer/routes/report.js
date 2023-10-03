const express = require("express");
const router = express.Router();
const MaliciousDownload = require("../models/maliciousDownload");

router.post("/", async (req, res) => {
  try {
    const { filename, url, timestamp } = req.body;
    const report = await MaliciousDownload.create({ filename, url, timestamp });

    console.log("Malicious download reported:", report);
    res
      .status(200)
      .json({ message: "Malicious download reported successfully" });
  } catch (error) {
    console.error("Error reporting malicious download:", error);
    res.status(500).json({ message: "Error reporting malicious download" });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const MaliciousDownload = require("../models/maliciousDownload");

// router.post("/", (req, res) => {
//   const { filename, url, timestamp } = req.body;

//   const newReport = new MaliciousDownload({
//     filename,
//     url,
//     timestamp,
//   });

//   newReport
//     .save()
//     .then((report) => {
//       console.log("Malicious download reported:", report);
//       res.status(200).json({ message: "Malicious download reported successfully." });
//     })
//     .catch((error) => {
//       console.error("Error reporting malicious download:", error);
//       res.status(500).json({ message: "Error reporting malicious download." });
//     });
// });

// module.exports = router;
