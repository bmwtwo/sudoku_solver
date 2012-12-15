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
         checkRow(selectedBox);
      }
   }

   function checkRow(box) {
      var row = Math.floor(parseInt($(box).attr("index")) / 9);
      var value = parseInt($(box).text());
      for (var x = 9*row; x < 9 * (row+1); x++) {
         if (x == $(box).attr("index")) continue;
         if ($('p.[index="' + x + '"]').text() == value) {
            $(box).addClass("error");
            return;
         }
      }
      $(box).removeClass("error");
   }

});
