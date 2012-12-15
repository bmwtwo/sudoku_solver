$(document).ready(function() {
   var selectedBox = null;

   $(".largeBox p").on("click", function() {
      toggleSelection(this);
   });

   $(document).on("keydown", function(e) {
      input(e.keyCode);
   });

   function toggleSelection(box) {
      $(selectedBox).removeClass("selected");
      $(box).addClass("selected");
      selectedBox = box;
   }

   function input(keyCode) {
      if (selectedBox != null && keyCode >= 49 && keyCode <= 57) {
         $(selectedBox).text(-1 * (48 - keyCode));
         checkError(selectedBox);
      }
   }

   function checkError(box) {
      var value = parseInt($(box).text());

      // check row
      var row = Math.floor(parseInt($(box).attr("index")) / 9);
      for (var x = 9*row; x < 9 * (row+1); x++) {
         if (x == $(box).attr("index")) continue;
         if ($('p.[index="' + x + '"]').text() == value) {
            $(box).addClass("error");
            return;
         }
      }

      // check column
      var col = Math.floor(parseInt($(box).attr("index")) % 9);
      for (var x = col; x < 9*9 + col; x+=9) {
         if (x == $(box).attr("index")) continue;
         if ($('p.[index="' + x + '"]').text() == value) {
            $(box).addClass("error");
            return;
         }
      }

      // check box
      var topOfBox = Math.floor(row / 3) * 3;
      var leftOfBox = Math.floor(col / 3) * 3;
      for (var r = topOfBox; r < topOfBox + 3; r++) {
         for (var c = leftOfBox; c < leftOfBox + 3; c++) {
            if (9*r + c == $(box).attr("index")) continue;
            if ($('p.[index="' + (9*r + c) + '"]').text() == value) {
               $(box).addClass("error");
               return;
            }
         }
      }
      $(box).removeClass("error");
   }

});
