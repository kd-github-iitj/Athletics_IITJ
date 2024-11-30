// Import necessary modules
import xlsx from 'xlsx';
import { db } from '../config/firebaseConfig.js'; // Adjust this path to where you have your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import fs from 'fs';

// Read the Excel file (adjust the path to match your setup)
const filePath = 'C:\Users\MI\OneDrive\Desktop\DC\Backend\assets\Results_of_56th_inter_IIT_Sports_Meet_2023.-1.xlsx'; // Adjust path if needed

try {
  // Step 1: Load and parse the workbook
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
  const worksheet = workbook.Sheets[sheetName];

  // Step 2: Convert sheet to JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Step 3: Process JSON data to format it properly for Firebase Firestore
  async function uploadToFirestore(data) {
    for (let item of data) {
      const {
        'POSITION': position,
        'BIB No.': bibNumber,
        'NAME OF ATHLETE': name,
        'INSTITUTION': institution,
        'PERFORMANCE': performance,
      } = item;

      try {
        await addDoc(collection(db, 'events', 'Inter_IIT_2023', 'results'), {
          position: position,
          bibNumber: bibNumber,
          name: name,
          institution: institution,
          performance: performance,
        });
        console.log(`Data added successfully for ${name}`);
      } catch (error) {
        console.error(`Error adding data for ${name}:`, error);
      }
    }
  }

  // Step 4: Call upload function
  uploadToFirestore(jsonData);
} catch (error) {
  console.error('Error reading or uploading data:', error);
}
