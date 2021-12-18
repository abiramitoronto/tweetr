# Tweeter Project

Tweeter is a simple, single-page Ajax-based  Twitter clone that uses Jquery, HTML5 and plain ol' CSS3 to help web bootcamp students get comfortable with their front-end chops with these technologies.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express back-end skills.

## Final Product

Login URL ==> http://localhost:8080

## Desktop Version 

!["Desktop Version"](https://github.com/abiramitoronto/tweetr/blob/master/docs/Desktop.png)

## Tablet Version
!["Table Version Header Page"](https://github.com/abiramitoronto/tweetr/blob/master/docs/TabletMain.png)

## Tablet Version
!["Tablet Version Tweet Box"](https://github.com/abiramitoronto/tweetr/blob/master/docs/TabletTweet.png)


## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- body-parser: "^1.15.2"
- chance: "^1.0.2",
- Express: "^4.13.4",
- Jquery: "^3.6.0",
- Node5.19.x or above
- md5: "^2.1.0",
- timeago.js: "^4.0.2"

## Dev Dependencies

- nodemon: "^1.9.2"

## CSS Styles

layout.css - This contains the style for main container. This is modifed for responsive design to differentiate the styles for both Desktop and Tablet.

```js
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

/*
 * Global layout stuff
 */

body {
  padding-top: 120px;
  color: #49544d;
  background-color: #f2f4ec;
  font-size: 24px;
  font-family: 'Bungee';
}

.container {
 display: flex;
 padding-left: 1.5em;
 font-family: "sans-serif";
 justify-content: space-between;
 align-items:center;
}


@media only screen and (min-width: 1024px) {
  
  .container {
    font-size: 16px;
    margin: 0 auto;
  }
}

```

header.css - This contains the header part of the browser which shows the profile name and picture

```js
.headAlign {
  min-height: 120px;
  background: rgb(255, 187, 0);
  padding-left: 12em;
}

.imgAlign {
  padding-left: 12em;
  min-height: 400px;
  background: rgb(255, 187, 0);
}

.userName {
  padding-left: 14em;
  font-weight: bold;
  color: black;
  font-family: "sans-serif";
}

/* Desktop styles */
@media only screen and (min-width: 1024px) {
  
  .headAlign {
    width: 33.3%;
    float: left;
    padding-top: 2em;
    padding-left: 4.5em;
    margin: 1em;
    margin-left: 1em;
  }

  .userName {
    padding-left: 2em;
  }
}
```

error.css - This contains the styles for throwing error box

```js
.Error-Box {
  border: 4px solid red;
  margin-block: 1em;
  font-size: 1em;
  color: red;
  padding-left: 2em;
}
```

nav.css - This contains the styles for Main Header that is clipped to the page on a permanent basis

```css
.navigate {
  min-height: 120px;
  padding-left: 1.5em;
  padding-right: 1.5em;
  color: #FFFFFF;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #4056A1;
  font-family: "Bungee";
}


.navRight {
  display:block;
  font-family: "sans-serif";

}

.navArrow {
  padding-left: 3em;
  color: #ff0000;
  justify-content: right;
  align-items: center;
}
```

tweeBox.css - This contains the style for tweetBox that shows current and old tweets

```js
.tweet-box {
  transition: box-shadow .3s;
  min-height: 120px;
  padding: 1.5em;
  color: #FFFFFF;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  border: 4px solid black;
};

.tweet-box:hover {
  box-shadow: 0 0 11px rgba(8, 4, 241, 0.892);
}
.chat-img {
    min-height: 120px;
    padding-left: 12em;
    justify-content: space-between;
  }

.chat-username {
  padding-left: 12em;
  color:black;
  font-family: "sans-serif";
}

.foot-data {
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}
.hr {
  margin: 0;
  padding: 0;
}
```

## Helper Functions

generateIDValue - This function generates random 8byte string to assign element ID values in-line

```js
 function generateIDValue() {
  return Math.random().toString(36).substr(2,8);
}
```

createTweetElement - This builds tweet-container and returns as string literal

```js
const createTweetElement = (tweet) => {
  const name = tweet["user"].name;
  const avatars = tweet["user"].avatars;
  const handle = tweet["user"].handle;
  const text = tweet["content"].text;
  const timeago_test = timeago.format(tweet["created_at"]);
  const flag = generateIDValue();
  const retweet = generateIDValue();
  const likes = generateIDValue();
  const $tweetReturn = `<article class="tweet-box">
    <header class="tweet-header">
      <div class="profile">
        <img id="chat-img" src="${avatars}" width="70" height="70">
        <label id="chat-name" style="color: black;" for="tweet-text">${name}</label>
      </div>
      <div id="handle">${handle}</div>
    </header>
    <br>
    <div class="tweetArea">
        <textarea name="text" id="tweet-textarea" rows="2" cols="100">${text}</textarea>
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
```

renderTweets - This function renders final accumulated consolidated tweet-container that is sorted based on the time Tweets are posted

```js
const renderTweets = (tweets) => {
  $('#tweets-container').empty();
  for (const itr of tweets) {
    $('#tweets-container').append(createTweetElement(itr));
  }
}
```

loadTweets - This functions retrieves response from server through Ajax GET request and loads the tweet into the browser

```js
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
```


