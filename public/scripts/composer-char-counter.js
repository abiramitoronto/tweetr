$(document).ready(function() {

  textArea = $('#tweet-textarea');
  const charCount = $('#counter').val();

textArea.on('input', function(event) {
  let value = charCount - $('#tweet-textarea').val().length;
  if (value < 0) {
    $('#counter').val(value).css("color","red");
  } else {
    $('#counter').val(value).css("color","black");
  }
})
});