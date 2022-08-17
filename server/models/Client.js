const mongoose = require("mongoose");

const Client = mongoose.model("Client", {
  id: { type: String, required: false },
  name: String,
  email: String,
  phone: String,
  job: String,
});

module.exports = Client;
