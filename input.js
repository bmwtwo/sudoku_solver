$(document).ready(function() {
   var $selectedBox = null;

   $(".largeBox p").on("click", function() {
      toggleSelection(this);
   });

   $(document).on("keydown", function(e) {
      // prevent navigating backwards in browser history using the backspace key
      if (e.keyCode == 8)
         e.preventDefault(); 

      input(e.keyCode);
   });

   function toggleSelection(box) {
      if ($selectedBox != null)
         $selectedBox.removeClass("selected");
      $(box).addClass("selected");
      $selectedBox = $(box);
   }

   function input(keyCode) {
      if ($selectedBox != null) {
         if (keyCode == 8) { // backspace
            $selectedBox.text("").removeClass("error");
         }
         else if (keyCode >= 49 && keyCode <= 57) { // a number key
            $selectedBox.text(-1 * (48 - keyCode));
            if (hasError($selectedBox))
               $selectedBox.addClass("error");
            else
               $selectedBox.removeClass("error");
         }
      }
   }

   function hasError($box) {
      var value = parseInt($box.text());

      // check row
      var row = Math.floor(parseInt($box.attr("index")) / 9);
      for (var x = 9*row; x < 9 * (row+1); x++) {
         if (x == $box.attr("index")) continue;
         if ($('p.[index="' + x + '"]').text() == value) {
            return true;
         }
      }

      // check column
      var col = Math.floor(parseInt($box.attr("index")) % 9);
      for (var x = col; x < 9*9 + col; x+=9) {
         if (x == $box.attr("index")) continue;
         if ($('p.[index="' + x + '"]').text() == value) {
            return true;
         }
      }

      // check box
      var topOfBox = Math.floor(row / 3) * 3;
      var leftOfBox = Math.floor(col / 3) * 3;
      for (var r = topOfBox; r < topOfBox + 3; r++) {
         for (var c = leftOfBox; c < leftOfBox + 3; c++) {
            if (9*r + c == $box.attr("index")) continue;
            if ($('p.[index="' + (9*r + c) + '"]').text() == value) {
               return true;
            }
         }
      }
      return false;
   }

   // The following should ideally go in a separate solve.js file, but I
   // currently don't have an Internet connection to look up how to handle the
   // function scopes.
   
   $("#button").on("click", function() {
      if (!solve(0)) alert("Puzzle is unsolvable");
   });

   function solve(offset) {
      if (offset > 80) return true; // reached end of puzzle successfully!

      var $box = $('p.[index="' + offset + '"]');
      var value = $box.text();

      if (value != "") { // this space has already been filled
         return solve(offset + 1);
      }
      // else
      for (var x = 1; x < 10; x++) {
         $box.text(x);
         if (hasError($box)) continue;     // try another number
         if (!solve(offset + 1)) continue; // try another number
         // no error, and solve returned true for all higher nubers
         return true;
      }

      // we tried all values and none worked:
      $box.text("");
      return false;
   }

});
