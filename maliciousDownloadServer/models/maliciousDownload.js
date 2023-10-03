const mongoose = require("mongoose");

const maliciousDownloadSchema = new mongoose.Schema({
  filename: String,
  url: String,
  timestamp: Date,
});

module.exports = mongoose.model("MaliciousDownload", maliciousDownloadSchema);
