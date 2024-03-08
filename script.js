// Generate random number between min and max (inclusive)

let bubblesCreated = false; // Flag to track if bubbles are already created

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random color for each bubble
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create bubbles and append them to the bubbles container
function createBubbles(container, numBubbles, startY, endY, delay) {
  if (!bubblesCreated) {
  for (let i = 0; i < numBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${getRandomNumber(0, window.innerWidth)}px`;
    bubble.style.backgroundColor = getRandomColor();
    container.appendChild(bubble);

    setTimeout(() => {
      bubble.style.top = `${getRandomNumber(startY, endY)}px`;
      bubble.style.animationDuration = `${getRandomNumber(5, 10)}s`;
    }, getRandomNumber(0, delay));
  }
  bubblesCreated = true;
}
}

// Call the createBubbles function with initial full-screen parameters
document.addEventListener('DOMContentLoaded', () => {
  const bubblesContainer = document.getElementById('bubbles-container');
  createBubbles(bubblesContainer, 50, 0, window.innerHeight, 10000); // Adjust parameters as needed
});

document.getElementById('assign-button').addEventListener('click', assignTeam);

async function assignTeam() {
  const response = await fetch('/assign-team');
  const data = await response.json();

  if (data) {
    const assignmentDiv = document.getElementById('assignment');
    assignmentDiv.innerText = `Team: ${data.team}`;
    const assignmentDiv2 = document.getElementById('assignments');
    assignmentDiv2.innerText = `Problem: ${data.problem}`;

    // Create bubbles between team name and problem statement
    const startY = assignmentDiv.offsetTop + assignmentDiv.offsetHeight;
    const endY = startY + 100; // Adjust bubble floating area height as needed
    createBubbles(document.body, 20, startY, endY, 5000); // Adjust parameters as needed

    // Save data to Excel sheet (You need an Excel library for this)
    // For simplicity, I'll just log the data
    console.log(data);

    // You can repeat the above process to assign teams until all teams are assigned
  } else {
    alert('All teams have been assigned!');
  }
}
