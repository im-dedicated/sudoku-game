function createBoard() {
  const table = document.getElementById("sudoku-board");
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      td.appendChild(input);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function checkSolution() {
  const inputs = document.querySelectorAll("input");
  let valid = true;

  inputs.forEach(inp => {
    const val = inp.value;
    if (val && (!/^[1-9]$/.test(val))) {
      valid = false;
    }
  });

  if (valid) {
    alert("Looks good so far! (Full Sudoku validation can be added later)");
  } else {
    alert("Only numbers 1–9 are allowed!");
  }
}

createBoard();
