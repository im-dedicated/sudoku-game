// Example puzzles (0 = empty cell)
const puzzles = [
  [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ],
  [
    [0,2,0,6,0,8,0,0,0],
    [5,8,0,0,0,9,7,0,0],
    [0,0,0,0,4,0,0,0,0],
    [3,7,0,0,0,0,5,0,0],
    [6,0,0,0,0,0,0,0,4],
    [0,0,8,0,0,0,0,1,3],
    [0,0,0,0,2,0,0,0,0],
    [0,0,9,8,0,0,0,3,6],
    [0,0,0,3,0,6,0,9,0]
  ]
];

let currentPuzzle = 0;
let seconds = 0;
let timerInterval;

function createBoard(puzzle) {
  const table = document.getElementById("sudoku-board");
  table.innerHTML = ""; // clear old board

  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;

      if (puzzle[row][col] !== 0) {
        input.value = puzzle[row][col];
        input.disabled = true;
        input.style.backgroundColor = "#eee";
      }

      td.appendChild(input);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function hasDuplicates(arr) {
  const nums = arr.filter(n => n !== 0);
  return new Set(nums).size !== nums.length;
}

function checkSolution() {
  const table = document.getElementById("sudoku-board");
  let valid = true;

  const grid = [];
  for (let r = 0; r < 9; r++) {
    grid[r] = [];
    for (let c = 0; c < 9; c++) {
      const val = table.rows[r].cells[c].firstChild.value;
      grid[r][c] = val ? parseInt(val) : 0;
    }
  }

  // Check rows
  for (let r = 0; r < 9; r++) {
    if (hasDuplicates(grid[r])) valid = false;
  }

  // Check columns
  for (let c = 0; c < 9; c++) {
    const col = grid.map(row => row[c]);
    if (hasDuplicates(col)) valid = false;
  }

  // Check 3x3 blocks
  for (let br = 0; br < 9; br += 3) {
    for (let bc = 0; bc < 9; bc += 3) {
      const block = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          block.push(grid[br + r][bc + c]);
        }
      }
      if (hasDuplicates(block)) valid = false;
    }
  }

  highlightErrors(grid);

  if (valid && grid.flat().every(n => n !== 0)) {
    alert("🎉 Congratulations! You solved the puzzle!");
  } else if (valid) {
    alert("No duplicates yet, keep going!");
  } else {
    alert("There are mistakes in your solution.");
  }
}

function highlightErrors(grid) {
  const table = document.getElementById("sudoku-board");
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const input = table.rows[r].cells[c].firstChild;
      input.style.color = "black"; // reset
    }
  }

  // Highlight duplicates in rows
  for (let r = 0; r < 9; r++) {
    const seen = {};
    for (let c = 0; c < 9; c++) {
      const val = grid[r][c];
      if (val) {
        if (seen[val]) {
          table.rows[r].cells[c].firstChild.style.color = "red";
        }
        seen[val] = true;
      }
    }
  }
}

function newGame() {
  currentPuzzle = (currentPuzzle + 1) % puzzles.length;
  createBoard(puzzles[currentPuzzle]);
  resetTimer();
}

function resetBoard() {
  const inputs = document.querySelectorAll("input:not([disabled])");
  inputs.forEach(inp => inp.value = "");
  resetTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  document.getElementById("timer").innerText = "Time: 0s";
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("timer").innerText = "Time: " + seconds + "s";
  }, 1000);
}

// Initialize game
createBoard(puzzles[currentPuzzle]);
resetTimer();
