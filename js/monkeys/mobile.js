'use strict';

var mobile = module.exports = {};

mobile.calculateSize = function () {
  var $window = $(window);
  var height = Math.min($window.width(), $window.height());

  // Max height = iPad three
  return 'h=' + Math.min(768, Math.ceil(height));
};

mobile.generateHtml = function (data) {
  var $monkey = $('<div />').addClass('monkey mobile');
  var $images = $('<div />').appendTo($monkey)
    .addClass('landscape-images');
  var $inner = $('<div />').appendTo($images)
    .addClass('landscape-images-inner');

  $.each(data.urls, function (i, url) {
    var $page = $('<div />').appendTo($inner)
      .addClass('page page-' + data.letters[i].type);

    if (i === 0) {
      $('<div />').appendTo($page)
        .addClass('heidelberg-tapToOpen')
        .append($('<img />').attr('src', data.bookTipSwipe));
    }

    if (i === data.urls.length - 1) {
      $('<div />').appendTo($page)
        .addClass('last-page')
        .append($('<img />').attr('src', data.lastPage));
    }

    $('<img />').appendTo($page).attr('src', url);
  });

  return $monkey;
};

mobile.init = function (data) {
  var portrait;
  var windowLeft = 0;

  var $monkey = data.html;
  var monkey = this.monkey;

  $(window).on('orientationchange resize', flip);
  setTimeout(flip);

  function flip() {
    portrait = (window.innerHeight > window.innerWidth);

    var ratio = monkey.IMAGE_RATIO;
    var width = portrait ? window.innerWidth * 1.5 : window.innerHeight * ratio;
    var height = Math.ceil(width / monkey.IMAGE_RATIO);

    $('.page > img').css({
      height: height,
      width: Math.ceil(width)
    });

    $('.page .heidelberg-tapToOpen').css('width', Math.ceil(width / 2))
      .find('img').css('height', height);

    $('.monkey, body').removeClass('landscape portrait')
      .addClass(portrait ? 'portrait' : 'landscape');

    $monkey.scrollLeft($monkey.find('img').width() * windowLeft);
  }

  $monkey.on('scroll', function () {
    windowLeft = $monkey.scrollLeft() / $monkey.find('img').width();
  });
};

mobile.letterHandler = function (data) {
  var handler = {};
  var $monkey = data.html;

  var page = -1;

  $monkey.on('scroll', function () {
    var currentPage = 0;

    $monkey.find('.page').each(function (i) {
      if ($(this).offset().left >= -$(window).width()) {
        currentPage = i;

        return false;
      }
    });

    if (currentPage !== page) {
      page = currentPage;
      $(handler).trigger('letterChange', page);
    }
  });

  // Do it on the next free cycle to ensure the event has been added
  setTimeout(function () {
    $monkey.triggerHandler('scroll');
  });

  return handler;
};