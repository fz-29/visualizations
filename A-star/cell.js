function Cell(i, j) {

  // Location param for the cell
  this.i = i;
  this.j = j;

  //f = g + h
  this.f = 0;
  this.g = 0; //cost covered so far
  this.h = 0; //heuristic

  // Neighbors
  this.neighbors = [];

  // From where to reach it during the traversal
  this.previous = undefined;

  // if is it a occlusion
  this.wall = false;
  var p = 0.15;
  if(abs(i - j) < 10)
  	p = 0.25
  if (random(1) < p)
  {
  	this.wall = true;
  	
  }


  // Display
  this.show = function(col)
  {
	if (this.wall) //it is a blockage
	{
	  fill(0);
	  rect(this.i * w, this.j * h, w, h);
	  
	  //noStroke();
	  //ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
	}
	else if (col)
	{
	  fill(col);
	  rect(this.i * w, this.j * h, w, h);
	}
  }

  // Stores references to  neighbors of the cell
  this.addNeighbors = function(grid)
  {
	var i = this.i;
	var j = this.j;
	//left right top bottom neighbors
	if (i < cols - 1)
	{
	  this.neighbors.push(grid[i + 1][j]);
	}
	if (i > 0)
	{
	  this.neighbors.push(grid[i - 1][j]);
	}
	if (j < rows - 1)
	{
	  this.neighbors.push(grid[i][j + 1]);
	}
	if (j > 0)
	{
	  this.neighbors.push(grid[i][j - 1]);
	}
	
	//diagonal neighbors
	if( allow_diagonal == 1)
	{
		if (i > 0 && j > 0)
		{
		  this.neighbors.push(grid[i - 1][j - 1]);
		}
		if (i < cols - 1 && j > 0)
		{
		  this.neighbors.push(grid[i + 1][j - 1]);
		}
		if (i > 0 && j < rows - 1) {
		  this.neighbors.push(grid[i - 1][j + 1]);
		}
		if (i < cols - 1 && j < rows - 1) {
		  this.neighbors.push(grid[i + 1][j + 1]);
		}
	}
  }
}
