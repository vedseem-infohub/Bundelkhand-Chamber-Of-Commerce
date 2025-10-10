const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

// Get the project's root directory (one level up from /backend)
const projectRoot = "C://Users//hp//Desktop//BCCI-main";
// const projectRoot = path.resolve(dirname, '..'); 

// Helper function to process one file
function convertExcelToJson(inputFileName, outputFileName) {
  try {
    console.log(`Converting ${inputFileName}...`);
    
    // Define paths relative to the project root
    const excelFilePath = path.join(projectRoot, "public", "excel", inputFileName);
    const jsonOutputDir = path.join(projectRoot, "public", "data");
    const jsonFilePath = path.join(jsonOutputDir, outputFileName);

    // ... (The rest of the function is exactly the same)
    if (!fs.existsSync(jsonOutputDir)) {
      fs.mkdirSync(jsonOutputDir, { recursive: true });
    }
    const fileBuffer = fs.readFileSync(excelFilePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    const jsonData = rawData.map(row => {
      const normalized = {};
      Object.keys(row).forEach(key => {
        normalized[key.trim().replace(/\s+/g, " ")] = row[key];
      });
      return normalized;
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`✅ Successfully converted ${inputFileName} to ${outputFileName}`);
  } catch (error) {
    console.error(`❌ Failed to convert ${inputFileName}:`, error);
  }
}

// --- Run the conversions ---
convertExcelToJson("service members.xlsx", "service.json");
convertExcelToJson("industry members.xlsx", "industry.json");
convertExcelToJson("Business members.xlsx", "business.json");

console.log("\nConversion process finished.");