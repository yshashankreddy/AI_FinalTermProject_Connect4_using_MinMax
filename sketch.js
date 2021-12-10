// Kobe Lieseborgs
let w = 7;
let h = 6;
let bs = 100;
let factor = 9 / 10;
let player = 1;
let finished = 0;
let result;
let resultP;

let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];


function setup() {
  if (resultP == null) {
    resultP = createP("");
    resultP.style('font-size', '32pt');
  }

  createCanvas(700, 600);
  frameRate(60);
  ellipseMode(CORNER); //draw circles from their top left point


  player = 1;
  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      board[y][x] = 0;
      finished = 0;
      resultP.html('');
    }
  }
}

function p(y, x) {
  return (y < 0 || x < 0 || y >= h || x >= w) ? 0 : board[y][x];
}


function getWinner() { //loops through rows, columns, diagonals, etc for win condition

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {

      if (p(y, x) != 0 && p(y, x) == p(y, x + 1) && p(y, x) == p(y, x + 2) && p(y, x) == p(y, x + 3)) {
        return p(y, x);
      }

      if (p(y, x) != 0 && p(y, x) == p(y + 1, x) && p(y, x) == p(y + 2, x) && p(y, x) == p(y + 3, x)) {
        return p(y, x);
      }

      for (d = -1; d <= 1; d += 2) {
        if (p(y, x) != 0 && p(y, x) == p(y + 1 * d, x + 1) && p(y, x) == p(y + 2 * d, x + 2) && p(y, x) == p(y + 3 * d, x + 3)) {
          return p(y, x);
        }
      }

    }
  }


  for (y = 0; y < h; y++)
    for (x = 0; x < w; x++)
      if (p(y, x) == 0) return 0;
  return -1; //tie
}

function nextSpace(x) { //finds the next space (from the bottom)
  for (y = h - 1; y >= 0; y--){
    if (board[y][x] == 0) {
      return y;
    }
  }
  return -1;
}

function mousePressed() {

  if (player == 2) {
    if (getWinner() == 0) {
      let x = floor(mouseX / bs),
        y = nextSpace(x);
      if (y >= 0) {
        board[y][x] = player;
        player = 1;
      }
    }
  }
}



function draw() {

  if (player == 1) {
    result = bestMove();
    
    board[nextSpace(result)][result] = 1;
  }

  for (j = 0; j < h; j++)
    for (i = 0; i < w; i++) {
      fill(255);
      rect(i * bs, j * bs, bs, bs);
      if (board[j][i] > 0) {
        fill(board[j][i] == 1 ? 255 : 0, board[j][i] == 2 ? 255 : 0, 0);
        ellipse(i * bs + (1 - factor) / 2 * bs, j * bs + (1 - factor) / 2 * bs, bs * factor, bs * factor);
      }
    }

  if (getWinner() != 0 && finished == 0) {

    let result = getWinner();
    let text;

    if (result == -1) {
      text = 'You tied the AI!';
    } else {
      text = `${result == 1 ? "The AI": "You"} won. `;
    }

    text += " Press space to retry!";
    resultP.html(text);
    finished = 1;
  }
}

function keyPressed() {

  if (getWinner() != 0 && key == " ") {
    setup();
  }
}