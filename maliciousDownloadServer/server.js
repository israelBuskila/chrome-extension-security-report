const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://Admin:SUp14abw5GDtq4xK@chrome-extension-data-c.8fqrw0n.mongodb.net/extensiondatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import the route handler for reporting malicious downloads
const reportRoute = require("./routes/report");
app.use("/report", reportRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
