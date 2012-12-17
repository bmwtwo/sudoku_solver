# Sudoku Solver

## Overview
Sudoku Solver uses a simple algorithm consisting of recursion and backtracking,
so it can take a while to solve a puzzle. This version can actually take several
minutes, as it animates every step of the algorithm's progress, but without
animation it takes only seconds. I'm planning to add options to speed up or
turn off the animation, since it takes so long. My current solution actually
uses a stack instead of direct recursion. While I think it makes the code
slightly harder to read, it made it easier to animate, since recursion and
JavaScript's setTimeout method don't like to play nicely with each other. My
previous recursive solution can be found on the "recursive" branch of this
project.

The program will also highlight an number in red if you enter a duplicate in a
row, column, or 3x3 box. It doesn't (yet) perform real-time checks for more
complicated cases that could make a puzzle unsolvable. It will, however, tell
you if you created an unsolvable puzzle after you click "solve".

## How to use it
Just click on a square to select it, then press a number between 0 and 9 to fill
it. The backspace key will clear a square. Once you've entered the numbers you
want the solution to include, just click the "solve" button to find a solution
(not necessarily the only solution).
