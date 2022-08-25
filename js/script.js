var menuShow = document.querySelector('.menu-show');
var menu = document.querySelector('.menu');
var menuIcon = document.querySelector('.menu');
var xIcon = document.querySelector('.x-icon');

var totalRes = {};
menu.addEventListener('click', () => {
  menuShow.classList.toggle('show');
  menuIcon.classList.toggle('hide');
});
xIcon.addEventListener('click', () => {
  menuShow.classList.toggle('show');

  menuIcon.classList.toggle('hide');
});
window.onclick = function (event) {
  if (!event.target.matches('.menu')) {
    if (menuShow.classList.contains('show')) {
      menuShow.classList.toggle('show');
      menuIcon.classList.toggle('hide');
    }
  }
};
var searchData = window.location.search
  .substring(window.location.search.indexOf('=') + 1)
  .replace('+', ' ');
var topHeadlines =
  'https://newsapi.org/v2/top-headlines?country=ng&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
if (searchData != '' && searchData != ' ' && searchData != null) {
  var topHeadlines = `https://newsapi.org/v2/everything?q=${searchData}&apiKey=f2e7ffc9216b49938579d3cd6d90b117`;
  var searchDiv = document.querySelector('.search-data');
  var searchDiv2 = document.querySelector('.search-data-i');
  searchDiv2.innerHTML = `search:${searchData}`;
  searchDiv.classList.toggle('show-search');
}

var health = document.querySelector('.health');
health.addEventListener('click', () => {
  topHeadlines =
    'https://newsapi.org/v2/everything?q=health&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
  showNews();
});
var tech = document.querySelector('.tech');
tech.addEventListener('click', () => {
  topHeadlines =
    'https://newsapi.org/v2/everything?q=tech nigeria&sortBy=publishedAt&language=en&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
  showNews();
});
var food = document.querySelector('.food');
food.addEventListener('click', () => {
  topHeadlines =
    'https://newsapi.org/v2/everything?q=food nigeria&sortBy=publishedAt&language=en&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
  showNews();
});
var politics = document.querySelector('.politics');
politics.addEventListener('click', () => {
  topHeadlines =
    'https://newsapi.org/v2/everything?q=politics nigeria&sortBy=publishedAt&language=en&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
  showNews();
});
var entertainment = document.querySelector('.entertainment');
entertainment.addEventListener('click', () => {
  topHeadlines =
    'https://newsapi.org/v2/everything?q=entertainment nigeria&sortBy=publishedAt&language=en&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
  showNews();
});
var movies = document.querySelector('.movies');
movies.addEventListener('click', () => {
  topHeadlines =
    'https://newsapi.org/v2/everything?q=movies&sortBy=publishedAt&language=en&apiKey=f2e7ffc9216b49938579d3cd6d90b117';
  showNews();
});
function showNews() {
  fetch(topHeadlines)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.totalResults);
      totalRes = data.totalResults;
      var state = {
        querySet: data.articles,
        page: 1,
        rows: 12,
      };
      buildNews();
      function pagination(querySet, page, rows) {
        var trimStart = (page - 1) * rows;
        var trimEnd = trimStart + rows;

        var trimmedData = querySet.slice(trimStart, trimEnd);

        var pages = Math.ceil(querySet.length / rows);
        return {
          querySet: trimmedData,
          pages: pages,
        };
      }
      function pageButtons(pages) {
        var wrapper = document.querySelector('.pagenumbers');
        wrapper.innerHTML = '';

        for (var page = 1; page <= pages; page++) {
          wrapper.innerHTML += `
          <div class="pagenumber pn pn-${page}">${page}</div>`;
        }
        $('.pagenumber').on('click', function () {
          console.log(state.page);

          state.page = parseInt(this.innerHTML);
          $(this).addClass('blue-bg');
          console.log(this);
          buildNews();
        });
      }

      function buildNews() {
        var pageData = pagination(state.querySet, state.page, state.rows);

        document.querySelector('.news-body').innerHTML = '';

        for (var resNum = 0; resNum < pageData.querySet.length; resNum++) {
          var myDate = new Date(pageData.querySet[resNum].publishedAt);

          function timeSince(date) {
            var seconds = Math.floor((new Date() - date) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
              return Math.floor(interval) + ' years ago';
            }
            interval = seconds / 2592000;
            if (interval > 1) {
              return Math.floor(interval) + ' months ago';
            }
            interval = seconds / 86400;
            if (interval > 1) {
              return Math.floor(interval) + ' days ago';
            }
            interval = seconds / 3600;
            if (interval > 1) {
              if (Math.floor(interval) == 1) {
                return Math.floor(interval) + ' hour ago';
              } else {
                return Math.floor(interval) + ' hours ago';
              }
            }
            interval = seconds / 60;
            if (interval > 1) {
              return Math.floor(interval) + ' minutes ago';
            }
            return Math.floor(seconds) + ' seconds ago';
          }

          document.querySelector(
            '.news-body'
          ).innerHTML += ` <div class="news-body-i">
          <div class="time ti${resNum}">${timeSince(myDate)}</div>
          <img src="${
            pageData.querySet[resNum].urlToImage
          }" alt="" class="news-pic np${resNum}" />
          <a href="${pageData.querySet[resNum].url}">
            <div class="title t${resNum}">${
            pageData.querySet[resNum].title
          }</div>
          </a>`;
        }
        pageButtons(pageData.pages);
      }
    });
}
showNews();
