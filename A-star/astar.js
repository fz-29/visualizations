/***************************************************************************
This file contains 2 functions as required by p5.js
    setup() - just to initialize a Canvas
    draw() - I will ustilize this function of p5.js for running A* algorithm

    find best on the value of f
        f = g + h
        f = cost so far + heuristic

******************************************************************************/

console.log("*******************\nCode Author : \n Feroz Ahmad\n Reach me at : ferozahmad.com \n*******************")
//Field Dims
var field_i = 500;
var field_j = 500;
//cell count
var cols = 25;
var rows = 25;
//cell dims
var w,h;
//field as a grid
var grid = new Array(cols);
//path if solution exists
var path = [];
//start and end
var start;
var end;

//Sets invloved in A* algo
// Open and closed set
var openSet = [];
var closedSet = [];
// heuristic fn choice
var heu_fn = 1;
// diagonality choice
var allow_diagonal = 0;
/*######################HELPER FUNCTIONS########################*/
/************************** Heuristic **************************/
function heuristic(a, b)
{
    var d;
    if(heu_fn == 0)
        d = dist(a.i, a.j, b.i, b.j);
    else
        d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}

/***********Function to delete element from the array************/
function removeFromArray(arr, elt)
{
    // Could use indexOf here instead to be more efficient
    for (var i = arr.length - 1; i >= 0; i--)
    {
        if (arr[i] == elt)
        {
            arr.splice(i, 1);
        }
    }
}
/**************************Draw Path*******************************/
function drawPath(path)
{
   for (var i = 0; i < path.length; i++)
    {
        path[i].show(color(255,0,0))
    }
}

function setup() 
{
    createCanvas(field_i, field_j);

    // Grid cell size
    w = field_j / cols;
    h = field_i / rows;


    //Associating Cell object with each cell
    for (var i = 0; i < cols; i++) 
    {
        grid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) 
    {
        for (var j = 0; j < rows; j++) 
        {
            grid[i][j] = new Cell(i, j);
        }
    }
    // All the neighbors
    for (var i = 0; i < cols; i++)
    {
        for (var j = 0; j < rows; j++)
        {
            grid[i][j].addNeighbors(grid);
        }
    }

    // Start and end
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    
    //avoid edge case generation
    start.wall = false;
    end.wall = false;

    // openSet should contain start point
    openSet.push(start);

}

function draw()
{
    //Search is not complete
    if(openSet.length > 0)
    {
        var best = 0;
        // find best on the value of f
        // f = g + h
        // f = cost so far + heuristic
        for(var i = 0; i < openSet.length; i++)
        {
            if(openSet[i].f < openSet[best].f)
            {
                best = i;
            }
        }
        var current = openSet[best];
        
        //search complete
        if(current == end)
        {
            noLoop();//p5.js function to stop its looping
            console.log("*** Reached at destination ***");
        }

        //we have visited current, so remove it from openSet and insert it into closedSet
        removeFromArray(openSet, current);
        closedSet.push(current);

        //check out neighbors of the best cell
        var neighbors = current.neighbors;

        for(var i = 0; i < neighbors.length; i++)
        {
            var neighbor = neighbors[i];
            // if neighbor not in closedSet it must be in open set or should be added now.
            // neighbour should be reachable, it should not be a wall
            if (!closedSet.includes(neighbor) && !neighbor.wall)
            {
                // temporary g, to check if we can reach this neighbor(cell) with less cost 
                var _g = current.g + 1;
                
                // neighbour was not in closedSet - so it may be openSet or not
                // if its not in openSet then, it should be added in the openSet
                if(openSet.includes(neighbor))
                {
                    if(neighbor.g < _g)
                    {
                        neighbor.g = _g;
                        neighbor.h = heuristic(neighbor, end);
                        neighbor.f = neighbor.h + neighbor.g;
                        neighbor.previous = current;
                    }

                }
                else
                {
                    neighbor.g = _g;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.h + neighbor.g;
                    neighbor.previous = current;
                    //its not in the openSet so push it
                    openSet.push(neighbor);
                }
            }          
        }
    }
    else
    {
        console.log('***** no solution *********');
        noLoop();
        return;
    }
    
    background(255);
    for (var i = 0; i < cols; i++)
    {
        for (var j = 0; j < rows; j++)
        {
            grid[i][j].show();
        }
    }        
    
    //print closedSet
    for (var i = 0; i < closedSet.length; i++)
    {
        closedSet[i].show(color(255, 0, 0, 50));
    }
    //print openSet
    for (var i = 0; i < openSet.length; i++)
    {
        openSet[i].show(color(0, 255, 0, 50));
    }

    //generate path
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous)
    {
        path.push(temp.previous);
        temp = temp.previous;
    }

    //draw path
    drawPath(path);
}
