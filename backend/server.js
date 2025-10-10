require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const nodemailer = require("nodemailer");
const compression = require('compression');
// const XLSX = require("xlsx");
// const fs = require("fs");

// ------------------ SCHEMA  -------------------

const UserSignup = require("./models/userSignup");
// const UserContact = require("./models/ContactUs");


// ------------- CONNECT TO MONGODB ATLAS ------------
connectDB();

const app = express();

// ------------ MIDDLEWARE ---------------
app.use(compression()); 

// Configure CORS to allow credentials and specify the origin
app.use(cors({
  origin: ["http://localhost:3000","https://bundelkhandchamberofcommerce.com","https://www.bundelkhandchamberofcommerce.com" ], // Your Next.js app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// -------------- SESSION SETUP -----------------

// app.use(session({
//   secret: process.env.SESSION_SECRET, // use long random secret in .env
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // true if using HTTPS
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000 // 1 day
//   }
// }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000
}
}));

// -------------------  Helper function to read Excel files---------------------


// ==================== Helper: Load + Normalize Excel ====================
// function loadExcelOnce(fileName) {
//   const filePath = path.join(process.cwd(), "public", "excel", fileName);

//   // Read once into buffer
//   const fileBuffer = fs.readFileSync(filePath);

//   // Parse Excel
//   const workbook = XLSX.read(fileBuffer, { type: "buffer" });
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];

//   // Convert to JSON & normalize keys
//   const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
//   return rawData.map(row => {
//     const normalized = {};
//     Object.keys(row).forEach(key => {
//       normalized[key.trim().replace(/\s+/g, " ")] = row[key];
//     });
//     return normalized;
//   });
// }
// ==================== Cache at Server Startup ====================
const cachedData = {
  service: require("../public/data/service.json"),
  industry: require("../public/data/industry.json"),
  business: require("../public/data/business.json"),
};

// --------------  PATH OF THE CHAMBER OF COMMERCE ----------

const dirname = "C://Users//hp//Desktop//BCCI-main" ;

app.get('/', (req,res)=>{
  res.send('Hello im Running !! ')
})

app.get('/signup', (req, res) => {
  res.send('This is the backend. Use POST /signup to register.');
});

app.get('/login', (req, res) => {
  res.send('This is the backend.');
});

app.get('/contact', (req, res) => {
  res.send('This is the backend.');
});

// Routes for each members type
// app.get("/memberZone/nominee", (req, res) => {
//   res.json(readExcelFile("Nominee coc.xlsx"));
// });

// app.get("/memberZone/service", (req, res) => {
//   res.json(readExcelFile("service members.xlsx"));
// });

// app.get("/memberZone/industry", (req, res) => {
//   res.json(readExcelFile("industry members.xlsx"));
// });

// app.get("/memberZone/business", (req, res) => {
//   res.json(readExcelFile("Business members.xlsx"));
// });

app.get("/memberZone/enrollNow", (req, res) => { 
   res.json("ENROLL IS WORKING ...")
});

// ---------------------------- ROUTES --------------------------

// -------------------------------- SIGNUP ROUTE -------------------------------

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await UserSignup.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserSignup({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Save user in session
    req.session.user = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    // res.status(201).json({ message: "User registered successfully", user: req.session.user });
      
    return res.status(200).json({
      message: "Signup successful",
      user: req.session.user,
      redirectUrl: "/"
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ---------------------------------- LOGIN ROUTE --------------------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSignup.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Please create your account first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    // ✅ Send JSON so frontend can redirect
    return res.status(200).json({
      message: "Login successful",
      user: req.session.user,
      redirectUrl: "/"
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ====================================================================
//  --------------- NODEMAILER TRANSPORTER  (GMAIL) ------------------
// ====================================================================

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "bccijhansi@gmail.com",   
    pass: "xjvi tyzw iair otbm",      
  },
});

// ----------------  CONTACT ROUTE ---------------------------

app.post('/contact', async (req, res) => {
  const { name, email, phone, typeMessage } = req.body;
  console.log('req.body = ', req.body)
  // Create Gmail transporter
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'bccijhansi@gmail.com',           // ✅ Your Gmail address
  //     pass: 'xjvi tyzw iair otbm',             // ✅ App password (not your regular password)
  //   }
  // });

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,          // Sender (user's email)
      to: 'bccijhansi@gmail.com',             // ✅ Your email to receive the message
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${typeMessage}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${typeMessage}</p>
      `
    });

    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
});

// ----------------  JOIN BCCI FORM ROUTE ---------------------------

// Route to send email
app.post("/send-form", async (req, res) => {
  try {
    const formData = req.body;

    const mailOptions = {
      from: `"BCCI Join Form" <${formData.email}>`,
      to: "pallavipatel8080@gmail.com", // where you want to receive form submissions
      subject: "New BCCI Join Form Submission",
      html: `
        <h2>New Application Received</h2>
        <p><b>Name:</b> ${formData.firstName} ${formData.lastName}</p>
        <p><b>Company Address:</b> ${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state}, ${formData.zip}, ${formData.country}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Mobile:</b> ${formData.mobile}</p>
        <p><b>GSTIN:</b> ${formData.gstin}</p>
        <p><b>MSME:</b> ${formData.msme}</p>
        <p><b>PAN:</b> ${formData.pan}</p>
        <p><b>Entity Type:</b> ${formData.entityType}</p>
        <p><b>Year of Establishment:</b> ${formData.year}</p>
        <p><b>Business Interests:</b> ${formData.businessInterests}</p>
        <p><b>Consent:</b> ${formData.consent ? "Yes" : "No"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email", error });
  }
});

// --------------------------- CHECK SESSION --------------------------

app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});


// ---------- LOGOUT ----------
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});


// --------------EXCEL -------------------

// app.post('/memberZone/nominee', (req, res) => {
//   try {
//     // Absolute path to the Excel file
//     const filePath = path.join(process.cwd(), "public", "excel", "Nominee coc.xlsx");

//     // Read Excel file
//     const fileBuffer = fs.readFileSync(filePath);

//     // Parse Excel
//     const workbook = XLSX.read(fileBuffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];

//     // Convert to JSON & normalize keys
//     const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
//     const jsonData = rawData.map(row => {
//       const normalized = {};
//       Object.keys(row).forEach(key => {
//         // Trim spaces in keys and collapse multiple spaces
//         normalized[key.trim().replace(/\s+/g, " ")] = row[key];
//       });
//       return normalized;
//     });

//     console.log("Excel columns:", Object.keys(jsonData[0] || {}));
//     res.json(jsonData);

//   } catch (error) {
//     console.error("Error reading Excel:", error);
//     res.status(500).json({ error: "Failed to load members" });
//   }
// });


// ==================== Routes ====================
// app.post("/memberZone/service", (req, res) => {
//   try {
//     console.log("Excel columns:", Object.keys(cachedData.service[0] || {}));
//     res.json(cachedData.service);
//   } catch (error) {
//     console.error("Error serving service members:", error);
//     res.status(500).json({ error: "Failed to load service members" });
//   }
// });

// app.post("/memberZone/industry", (req, res) => {
//   try {
//     console.log("Excel columns:", Object.keys(cachedData.industry[0] || {}));
//     res.json(cachedData.industry);
//   } catch (error) {
//     console.error("Error serving industry members:", error);
//     res.status(500).json({ error: "Failed to load industry members" });
//   }
// });

// app.post("/memberZone/business", (req, res) => {
//   try {
//     console.log("Excel columns:", Object.keys(cachedData.business[0] || {}));
//     res.json(cachedData.business);
//   } catch (error) {
//     console.error("Error serving business members:", error);
//     res.status(500).json({ error: "Failed to load business members" });
//   }
// });

// server.js

// ==================== A Helper Function for Pagination ====================
function getPaginatedData(data, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);

  if (endIndex < totalItems) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.data = data.slice(startIndex, endIndex);
  results.totalItems = totalItems;
  results.totalPages = totalPages;
  results.currentPage = page;

  return results;
}


// ==================== Updated Paginated Routes ====================

app.get("/memberZone/service", (req, res) => {
  try {
    // Get page and limit from query params, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // Show 20 items per page by default

    const paginatedResults = getPaginatedData(cachedData.service, page, limit);
    res.json(paginatedResults);

  } catch (error) {
    console.error("Error serving service members:", error);
    res.status(500).json({ error: "Failed to load service members" });
  }
});

app.get("/memberZone/industry", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    
    const paginatedResults = getPaginatedData(cachedData.industry, page, limit);
    res.json(paginatedResults);

  } catch (error) {
    console.error("Error serving industry members:", error);
    res.status(500).json({ error: "Failed to load industry members" });
  }
});

app.get("/memberZone/business", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const paginatedResults = getPaginatedData(cachedData.business, page, limit);
    res.json(paginatedResults);
    
  } catch (error) {
    console.error("Error serving business members:", error);
    res.status(500).json({ error: "Failed to load business members" });
  }
});

// --------------------  ENROLL NOW   -----------------  

app.post("/memberZone/enrollNow", async(req, res) => {

 const { name, email,mobile,  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required!" });
  }

  try {
    // Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Mail options
    let mailOptions = {
      from: "bccijhansi@gmail.com" ,
      to:  `"Enrollment Form" <${process.env.EMAIL_USER}>` , // where you want to receive submissions
      subject: "New Enrollment Submission",
      html: `
        <h3>New Enrollment Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Enrollment request sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }

});


// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});



















//DEVELOPED BY - ARPIT SHUKLA, PALLAVI PATEL