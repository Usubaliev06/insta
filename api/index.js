import { storeData } from "./assets/data/data.js";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 1010;
app.use(cors());
app.use(express.json());

// PUT
app.put('/data/put', (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Hash the password before storing (using bcrypt)

    // Store the data in a database (or appropriate storage)
    // Replace storeData.push() with your actual database storage logic
    storeData.push({ username, password });

    console.log('Data Received:', req.body);
    res.status(201).json({ message: 'Data Received and Stored Successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET
app.get('/data/', (req, res) => {
  const item = storeData;

  if (item.length) {
    // Remove password from the response (for security reasons)
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
