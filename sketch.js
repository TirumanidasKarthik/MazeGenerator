

var w = 20;
var grid = [];
var stack = []
var current_i;
var current_j;

function check(i, j){
  if(i < 0 || i >= grid.length || j < 0 || j >= grid[i].length){
    return false;
  }
  if(grid[i][j].visited){
    return false;
  }
  return true;
}

function getNeighbors(i, j){
  var neighbors = [];
  if(check(i - 1, j)){
    neighbors.push(grid[i - 1][j]);
  }
  if(check(i, j + 1)){
    neighbors.push(grid[i][j + 1]);
  }
  if(check(i + 1, j)){
    neighbors.push(grid[i + 1][j]);
  }
  if(check(i, j - 1)){
    neighbors.push(grid[i][j - 1]);
  }
  if(neighbors.length == 0){
    return false;
  }
  return random(neighbors);
}

function removeWall(a, b){
  x_diff = a.x - b.x;
  y_diff = a.y - b.y;
  if(x_diff > 0){
    a.left = false;
    b.right = false;
  }
  else if(x_diff < 0){
    a.right = false;
    b.left = false;
  }
  else if(y_diff > 0){
    a.top = false;
    b.bottom = false;
  }
  else if(y_diff < 0){
    a.bottom = false;
    b.top = false;
  }
}

function find(i){
  if(i == 0){
    return 0;
  }
  else{
    return i / w;
  }
}

function active(cell){
  fill("blue");
  rect(cell.x, cell.y, cell.w, cell.w);
}

function setup() {
  createCanvas(400, 400);
  var rows = floor(height / w);
  var cols = floor(width / w);
  for(let i= 0; i < rows; i++){
    let row = [];
    for(let j = 0; j < cols; j++){
      row.push(new Cell(i * w, j * w, w));
    }
    grid.push(row);
  }
  //console.log(grid);
  current_i = 0;
  current_j = 0;
}

function draw() {
  background(51);
  for(let i= 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      grid[i][j].show();
    }
  } 
  grid[current_i][current_j].visited = true;
  active(grid[current_i][current_j])
  var neighbor = getNeighbors(current_i, current_j);
  if(neighbor){
    stack.push(grid[current_i][current_j]);
    removeWall(grid[current_i][current_j], neighbor);
    current_i = find(neighbor.x);
    current_j = find(neighbor.y);
    //console.log(current_i, current_j)
  }else{
    if(stack.length > 0){
      next = stack.pop()
      current_i = find(next.x);
      current_j = find(next.y);
    }else{
      noLoop();
    }
  }
  frameRate(6);
  
}