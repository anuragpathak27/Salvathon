const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8', 'Team 9', 'Team 10', 'Team 11', 'Team 12', 'Team 13', 'Team 14', 'Team 15', 'Team 16', 'Team 17', 'Team 18', 'Team 19', 'Team 20']; // List of teams
const problems = ['Problem 1', 'Problem 2', 'Problem 3', 'Problem 4', 'Problem 5', 'Problem 6', 'Problem 7', 'Problem 8', 'Problem 9', 'Problem 10', 'Problem 11', 'Problem 12']; // List of problems
let problemsAssigned = {}; // Object to keep track of problems assigned to teams

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.get('/assign-team', (req, res) => {
  if (teams.length === 0) {
    res.json(null); // All teams have been assigned
    return;
  }

  const team = teams.pop(); // Get the next team
  let problemIndex;
  let problem;

  // Check if the team has been assigned a problem before
  if (problemsAssigned[team]) {
    // If the team has been assigned a problem less than twice, assign a problem they haven't been assigned yet
    if (problemsAssigned[team] < 2) {
      do {
        problemIndex = Math.floor(Math.random() * problems.length);
        problem = problems[problemIndex];
      } while (problemsAssigned[problem] >= 2);
    } else { // If the team has been assigned a problem twice, remove them from the object
      delete problemsAssigned[team];
      problemIndex = Math.floor(Math.random() * problems.length);
      problem = problems[problemIndex];
    }
  } else { // If the team hasn't been assigned a problem before, assign a problem they haven't been assigned yet
    do {
      problemIndex = Math.floor(Math.random() * problems.length);
      problem = problems[problemIndex];
    } while (problemsAssigned[problem] >= 2);
  }

  // Update the problemsAssigned object
  if (problemsAssigned[team]) {
    problemsAssigned[team]++;
  } else {
    problemsAssigned[team] = 1;
  }

  // Save team and problem to Excel sheet (You need an Excel library for this)
  // For simplicity, I'll just log the data
  const dataToSave = { team, problem };
  console.log(dataToSave);

  res.json(dataToSave);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
