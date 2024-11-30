// testFirebase.js
import { db } from "./config/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

async function addSampleEvent() {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      eventName: "100 MT FINAL",
      date: "2024-11-09",
      group: "MEN",
      participants: [
        { position: 1, bibNumber: 393, name: "AKHIL KUMAR", institution: "KHARAGPUR", performance: 11.39 },
        { position: 2, bibNumber: 435, name: "YUVANANDHAN T", institution: "MADRAS", performance: 11.43 }
        // Add more participants if needed
      ]
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

addSampleEvent(); 
