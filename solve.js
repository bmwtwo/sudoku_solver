$(document).ready(function() {
   var stack;      // store state variables for recursion
   var solvable;   // return value for whether the board was solvable
   
   $("#button").on("click", function() {
      stack = new Array();
      solvable = false;

      var state = new Array();
      state["gridLocation"] = 0;
      state["firstTime"] = true;
      state["numberToTry"] = 1;
      stack.push(state);

      checkStack();
   });

   function checkStack() {
      if (!stack.length == 0)
         solve();
      else
         if (!solvable) alert("Puzzle is unsolvable");
      // Note that I currently assume that what the user entered was valid.
      // Though if the user entered invalid input, it would be highlighted in
      // red by input.js
   }

   function solve() {
      var state = stack.pop();

      if (state["gridLocation"] > 80) { // answer found, no need to backtrack
         solvable = true;
         stack = new Array(); // empty the stack
         checkStack();
         return;
      }

      var $box = $('p[index="' + state["gridLocation"] + '"]');

      if (state["numberToTry"] == 10) {
         // no number worked in this box. Return to a previous box to try new
         // combinations
         $box.text("");
         setTimeout(function() { checkStack() }, delay);
         return;
      }

      if (state["firstTime"] == true && $box.text() != "")  {
         // No need to return to this square, which already had a number
         // provided by the user. Just put the next one on the stack
         state["gridLocation"]++;
         stack.push(state);
         setTimeout(function() { checkStack() }, delay);
         return;
      }
      // (else) backtracking, or box was empty
      $box.text(state["numberToTry"]);
      if (hasError($box)) { // try a new number at this same location
         state["numberToTry"]++;
         state["firstTime"] = false;
         stack.push(state);
         setTimeout(function() { checkStack() }, delay);
         return;
      }
      // no error so far, check next level (but remember to check this one
      // after if you discover errors at a later level)
      state["numberToTry"]++;
      state["firstTime"] = false;
      stack.push(state);
      // must destroy link between the state variable and what I just pushed,
      // since state was passed by reference to the stack
      var gridLocation = state["gridLocation"];
      state = new Array();
      state["numberToTry"] = 1;
      state["firstTime"] = true;
      state["gridLocation"] = gridLocation + 1;
      stack.push(state);
      setTimeout(function() { checkStack() }, delay);
   }
});
