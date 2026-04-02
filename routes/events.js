import { Router } from 'express';

import { getDb } from '../data/database.js';

const router = Router();

router.get('/', async (req, res) => {
  const db = getDb();
  const allEvents = await db.collection('events').find().toArray();
  res.json({ events: allEvents });
});

router.post('/', async (req, res) => {
  const eventData = req.body;
  const db = getDb();
  const result = await db.collection('events').insertOne({...eventData});
  res.status(201).json({
    message: 'Event created.',
    event: { ...eventData, id: result.insertedId },
  });
});

export default router;