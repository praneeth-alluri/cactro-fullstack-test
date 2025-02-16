import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [poll, setPoll] = useState(null);
  const [newPoll, setNewPoll] = useState({ question: '', options: [] });
  const [pollOptions, setPollOptions] = useState('')

  // Fetch poll data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (poll) {
        axios.get(`http://localhost:4000/api/polls/${poll._id}`)
          .then((res) => setPoll(res.data))
          .catch((err) => console.log(err));
      }
    }, 5000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [poll]);
  
  const createPoll = () => {
    if (newPoll.options.length < 2) {
      return alert('Select at least 2 options');
    }
    axios.post('http://localhost:4000/api/polls', newPoll)
      .then((res) => {
        setPoll(res.data);
        setNewPoll({ question: '', options: [] });
      })
      .catch((err) => console.log(err));
  };

  const createOptions = () => {
    if (pollOptions.trim()) {
      setNewPoll({ ...newPoll, options: [...newPoll.options, pollOptions] });
      setPollOptions('');  // Clear the input after adding the option
    }
  };

  const vote = (optionIndex) => {
    axios.post(`http://localhost:4000/api/polls/${poll._id}/vote`, { optionIndex })
      .then((res) => setPoll(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Polling App</h1>

      {!poll && (
        <div>
          <h2>Create a Poll</h2>
          <input
            type="text"
            placeholder="Question"
            value={newPoll.question}
            onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
          />
          <input
            type="text"
            placeholder={`Option ${newPoll.options.length + 1}`}
            value={pollOptions}
            onChange={(e) => setPollOptions(e.target.value)}
          />
          <button onClick={createOptions}>+ Add Option</button>
          {newPoll.options.length > 0 && (
            <ul>
              {newPoll.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          )}
          <button onClick={createPoll}>Create Poll</button>
        </div>
      )}

      {poll && (
        <div>
          <h2>{poll.question}</h2>
          {poll.options.map((option, index) => (
            <div key={index}>
              <button onClick={() => vote(index)}>{option.option}</button>
              <span>Votes: {option.votes}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
