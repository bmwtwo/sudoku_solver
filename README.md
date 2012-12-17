# Sudoku Solver

## Overview
Sudoku Solver uses a simple algorithm consisting of recursion and backtracking,
so it can take several seconds to solve a puzzle. However, I'm planning to
implement an animation of the different numbers the algorithm is plugging
into the board as it tries to find the solution, so that should make the wait
more interesting.  I haven't finished the animation yet though, since it seems
that recursion and JavaScript's setTimeout method (which I was planning to use
in the animation) don't like to play nicely with each other.

The program will also highlight an number in red if you enter a duplicate in a
row, column, or 3x3 box. It doesn't (yet) perform real-time checks for more
complicated cases that could make a puzzle unsolvable. It will, however, tell
you if you created an unsolvable puzzle after you click "solve".

## How to use it
Just click on a square to select it, then press a number between 0 and 9 to fill
it. The backspace key will clear a square. Once you've entered the numbers you
want the solution to include, just click the "solve" button to find a solution
(not necessarily the only solution).
