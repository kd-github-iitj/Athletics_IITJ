// src/routes/eventRoutes.js
import express from "express";
import { addEvent, getAllEvents, updateEvent, deleteEvent } from "../../services/eventService.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Add a new event with validation
router.post(
  '/',
  [
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('date').isISO8601().withMessage('Date must be in a valid format (ISO8601)'),
  ],
  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Call the addEvent service function to add the event to Firestore
      const docRef = await addEvent(req.body);
      res.status(201).json({ message: "Event added successfully", id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: "Error adding event" });
    }
  }
);

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

// Update an event
router.put("/:id", async (req, res) => {
  try {
    await updateEvent(req.params.id, req.body);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    await deleteEvent(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
});

export default router;
