/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {

// This is created to throw error when no content is entered
const emptyTweetError = `<div>
<p class="Error-Box">
  <i style="font-size: medium;" class="fas fa-exclamation-triangle">
  </i>
  You Haven't TWEETED Yet.!!!
  <i style="font-size: medium;" class="fas fa-exclamation-triangle">
  </i>
<p>
</div>`

// This is created to throw error when more than 140 chars are tweeted
const longTweetError = `<div>
<p class="Error-Box">
<i style="font-size: medium;" class="fas fa-exclamation-triangle">
</i>
Too Long. Please respect arbitary limit of 140 Chars
<i style="font-size: medium;" class="fas fa-exclamation-triangle">
</i>
<p>
</div>`

// Escape function to identify Cross Side Scripting 
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

 // This function generates random ID Value.
 function generateIDValue() {
  return Math.random().toString(36).substr(2,8);
}

// Function to create Tweet Container when user is tweeting 
const createTweetElement = (tweet) => {
  const name = tweet["user"].name;
  const avatars = tweet["user"].avatars;
  const handle = tweet["user"].handle;
  const text = tweet["content"].text;
  const timeago_test = timeago.format(tweet["created_at"]);
  const flag = generateIDValue();
  const retweet = generateIDValue();
  const likes = generateIDValue();
  const hover = generateIDValue();
  const $tweetReturn = `<article class="tweet-box" id="${hover}" onmouseover="$(document).ready(function() 
  {
    $(${hover}).css('box-shadow', '0px 0px 11px rgba(68,68,68,.6)');
  });" onmouseout="$(document).ready(function() {
    $(${hover}).css('box-shadow', '');
  });">
    <header class="tweet-header">
      <div class="profile">
        <img id="chat-img" src="${avatars}" width="70" height="70">
        <label id="chat-name" style="color: black;" for="tweet-text">${name}</label>
      </div>
      <div id="handle" style="color:cadetblue">${handle}</div>
    </header>
    <br>
    <div class="tweetArea">
        <textarea name="text" id="tweet-textarea" rows="2" cols="100" readonly>${text}</textarea>
    </div>
    <footer>
      <div class="foot-data">
        <p style="color: black;">${timeago_test}</p>
        <div>
        <i onmouseover="$(document).ready(function() {
          $(${flag}).css('color', 'yellow');
        });" onmouseout="$(document).ready(function() {
          $(${flag}).css('color', 'black');
        });" id=${flag} style="color: black;" class="fas fa-flag"></i>
    
          <i onmouseover="$(document).ready(function() {
            $(${retweet}).css('color', 'yellow');
          });" onmouseout="$(document).ready(function() {
            $(${retweet}).css('color', 'black');
          });" id=${retweet} style="color: black;" class="fas fa-retweet"></i>
    
          <i onmouseover="$(document).ready(function() {
            $(${likes}).css('color', 'yellow');
          });" onmouseout="$(document).ready(function() {
            $(${likes}).css('color', 'black');
          });"id=${likes} style="color: black;" class="fas fa-heart"></i>
        </div>
      </div>
    </footer>
  </article>`;
// The below line is left commented intentionally. This can be opened when validating XSS during hack.
//  const safeHtml = `<p>${escape($tweetReturn)}</p>`;
return $tweetReturn;
};


// This funciton is created to render multiple tweets
const renderTweets = (tweets) => {
  $('#tweets-container').empty();
  for (const itr of tweets) {
    $('#tweets-container').append(createTweetElement(itr));
  }
}

  
// This function is created to get AJAX request which renders page.
  const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweetObj) {
    console.log('Success: ', tweetObj);
    tweetObj.sort(function(a, b) {
      return b.created_at - a.created_at;
    });
    renderTweets(tweetObj)
  });
  }

// This loads the past tweets
   loadTweets();

// The below function will be triggered when user enters data and hit Tweet button. This will eventually 
// prevent the default form submit behaviour. And also this forward the tweets as POST request through
// AJAX.
   $('#tweet-action').submit(function (event){
     event.preventDefault();  
     let textAreaVal = $('#tweet-textarea').val();
     let textAreaLen = textAreaVal.length;
     if (textAreaVal === null || textAreaLen === 0) {
       $(".new-tweet").prepend(emptyTweetError);
       setTimeout(function() {
       $('.Error-Box').remove();},3000);
     }
      else if (textAreaLen > 140) {
        $(".new-tweet").prepend(longTweetError);
        setTimeout(function() {
          $('.Error-Box').remove();},3000);
     } else {
      $('.Error-Box').remove();
      const data = $(this).serialize();
      $('#tweet-textarea').val('');
      $('#counter').val('140');
      $.ajax(`/tweets`, { method: 'POST', data: data })
       .then(function (data) {
         console.log('Received: ', data);
         loadTweets();
       });
     }
   })
   });
   
