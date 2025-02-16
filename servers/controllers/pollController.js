const Poll = require('../models/pollSchema'); // import model

// Create Poll
const createPoll = async (req, res) => {
  const { question, options } = req.body;
  try {
    // Create a new Poll document and save it
    const poll = new Poll({
      question,
      options: options.map(option => ({ option, votes: 0 }))
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ error: 'Error creating poll' });
  }
};

// Fetch and vote on Poll by ID
const fetchPollById = async (req, res) => {
  const { optionIndex } = req.body;
  try {
    // Find poll by ID
    const poll = await Poll.findById(req.params.id);
    if (poll) {
      // Validate optionIndex
      if (optionIndex >= 0 && optionIndex < poll.options.length) {
        poll.options[optionIndex].votes += 1;
        await poll.save();
        res.status(200).json(poll);
      } else {
        res.status(400).json({ error: 'Invalid option index' });
      }
    } else {
      res.status(404).json({ error: 'Poll not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error voting on poll' });
  }
};

// Display Poll results by ID
const displayPoll = async (req, res) => {
  try {
    // Fetch poll by ID
    const poll = await Poll.findById(req.params.id);
    if (poll) {
      res.status(200).json(poll);
    } else {
      res.status(404).json({ error: 'Poll not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error fetching poll results' });
  }
};

module.exports = {
  createPoll,
  fetchPollById,
  displayPoll,
};
