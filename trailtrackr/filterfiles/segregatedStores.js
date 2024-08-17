const XLSX = require('xlsx');
const fs = require('fs');

const filterAndSaveStoresByState = (inputFilePath, outputFilePath) => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(inputFilePath);
    
    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];
    
    // Get the sheet
    const sheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON format
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Extract header and rows separately
    const header = data[0];
    const rows = data.slice(1);
    
    // Find unique states
    const states = [...new Set(rows.map(row => row[3] && row[3].split(' ')[0]))].filter(Boolean);
    
    // Create a new workbook
    const newWorkbook = XLSX.utils.book_new();
    
    // Process each state
    states.forEach(stateCode => {
      // Filter rows by state code
      const filteredRows = rows.filter(row => row[3] && row[3].startsWith(stateCode)).slice(0, 10);
      
      // Add state name to each row
      const rowsWithStateName = filteredRows.map(row => [stateCode, ...row]);

      // Add header with state name column
      const newHeader = ['State', ...header];
      const outputRows = [newHeader, ...rowsWithStateName];
      
      // Create a new worksheet for each state
      const newWorksheet = XLSX.utils.aoa_to_sheet(outputRows);
      
      // Append the worksheet to the new workbook
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, `${stateCode}_Stores`);
    });
    
    // Write the new workbook to a file
    XLSX.writeFile(newWorkbook, outputFilePath);
    
    console.log(`Filtered stores saved to: ${outputFilePath}`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

// Replace with your actual input and output file paths
const inputFilePath = 'output.xlsx'; // Input Excel file path
const outputFilePath = 'all_states_stores.xlsx'; // Output Excel file path

filterAndSaveStoresByState(inputFilePath, outputFilePath);
