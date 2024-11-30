// services/eventService.js
import { db } from "../config/firebaseConfig.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Add a new event
export const addEvent = async (eventData) => {
  return await addDoc(collection(db, "events"), eventData);
};

// Get all events
export const getAllEvents = async () => {
  const eventsSnapshot = await getDocs(collection(db, "events"));
  return eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update an event
export const updateEvent = async (id, updatedData) => {
  const eventRef = doc(db, "events", id);
  return await updateDoc(eventRef, updatedData);
};

// Delete an event
export const deleteEvent = async (id) => {
  const eventRef = doc(db, "events", id);
  return await deleteDoc(eventRef);
};
