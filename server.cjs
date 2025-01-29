const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Update this configuration with your SMTP provider details
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 587, // Use 465 for SSL or 587 for TLS
  secure: false, // True for SSL (port 465), false for TLS (port 587)
  auth: {
    user: "fikastundenmail@gmail.com", // Your full email address
    pass: "vahg prno zjax sqfc", // Replace with your actual app password
  },
});

// POST /send-order endpoint
app.post("/send-order", (req, res) => {
  const { name, address, postcode, city, orderDetails } = req.body;

  // Basic validation
  if (!name || !address || !postcode || !city || !orderDetails) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const validPostcodes = ["702 31", "702 30", "702 29"];
  if (!validPostcodes.includes(postcode)) {
    return res.status(400).json({ message: "Invalid postcode." });
  }

  // Prepare email details
  const mailOptions = {
    from: "fikastundenmail@gmail.com", // Your email address
    to: "fikastundenmail@gmail.com", // The same or a different email where you receive orders
    subject: `New Order from ${name}`,
    text: `
      You received a new order:
      
      Name: ${name}
      Address: ${address}
      Postcode: ${postcode}
      City: ${city}
      Order Details:
      ${orderDetails}

      Total Items: ${orderDetails.length}
    `,
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send the order email." });
    }

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Order received and email sent successfully!" });
  });
});

const port = process.env.PORT || 0; // Let the OS pick an available port


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
