require('../scss/main.scss');
const list_data = require('../data/data.json');

window.$('.icon-facebook').click((e) => {
  e.preventDefault();
  const uri = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uri}`);
});


window.$('.icon-twitter').click((e) => {
  e.preventDefault();
  const uri = window.location.href;
  const status = encodeURIComponent(`${window.tweetText} ${uri}`);
  window.open(`https://twitter.com/home?status=${status}`);
});

$(document).ready(function() {
    console.log(list_data)
    
    for (var i = 0; i < list_data.length; i++) {
        var article = list_data[i];
        var new_card = $('<a></a>');
        new_card.attr('href', article["Link"]);
        new_card.addClass('article-card');

        new_card.append(
            $('<div>' + article["Rank"] + '</div>')
            .addClass('article-rank')
        );
        new_card.append(
            $('<div></div>')
            .addClass('article-img-container')
            .append(
                $('<img>')
                .attr('src', article["Img Link"])
                .addClass('article-img')
            )
        );
        new_card.append(
            $('<div>' + article["Title"] + '</div>')
            .addClass('article-title')
        );

        if (article["Breaking news"] != 'y') {
            new_card.addClass('not-breaking-news');
        }
        if (article["Free Speech Week"] != 'y') {
            new_card.addClass('not-free-speech-week');
        }
        if (article["Protest coverage"] != 'y') {
            new_card.addClass('not-protest-coverage');
        }
        if (article["Sexual misconduct"] != 'y') {
            new_card.addClass('not-sexual-misconduct');
        }
        if (article["Opinion"] != 'y') {
            new_card.addClass('not-opinion');
        }

        new_card.appendTo('#top-stories');
    };

    // Add actions to buttons
    function select(btn) {
        var btns = ['#btn-all-topics', '#btn-breaking-news', '#btn-free-speech-week', '#btn-protest-coverage', '#btn-sexual-misconduct', '#btn-opinion']
        for (var i = 0; i < btns.length; i++) {
            if (btn == btns[i]) {
                $(btn).addClass('selected')
            } else {
                $(btns[i]).removeClass('selected')
            }
        }
    };

    $('#btn-all-topics').addClass('selected')
    $('#btn-all-topics').click( function() {
        console.log('pressed')
        $('.not-breaking-news').show();
        $('.not-free-speech-week').show();
        $('.not-protest-coverage').show();
        $('.not-sexual-misconduct').show();
        $('.not-opinion').show();
        select('#btn-all-topics');
    });
    $('#btn-breaking-news').click( function() {
        console.log('pressed')
        $('.not-free-speech-week').show();
        $('.not-protest-coverage').show();
        $('.not-sexual-misconduct').show();
        $('.not-opinion').show();
        $('.not-breaking-news').hide();
        select('#btn-breaking-news');
    });
    $('#btn-free-speech-week').click( function() {
        console.log('pressed')
        $('.not-breaking-news').show();
        $('.not-protest-coverage').show();
        $('.not-sexual-misconduct').show();
        $('.not-opinion').show();
        $('.not-free-speech-week').hide();
        select('#btn-free-speech-week');
    });
    $('#btn-protest-coverage').click( function() {
        console.log('pressed')
        $('.not-breaking-news').show();
        $('.not-free-speech-week').show();
        $('.not-sexual-misconduct').show();
        $('.not-opinion').show();
        $('.not-protest-coverage').hide();
        select('#btn-protest-coverage');
    });
    $('#btn-sexual-misconduct').click( function() {
        console.log('pressed')
        $('.not-breaking-news').show();
        $('.not-free-speech-week').show();
        $('.not-protest-coverage').show();
        $('.not-opinion').show();
        $('.not-sexual-misconduct').hide();
        select('#btn-sexual-misconduct');
    });
    $('#btn-opinion').click( function() {
        console.log('pressed')
        $('.not-breaking-news').show();
        $('.not-free-speech-week').show();
        $('.not-protest-coverage').show();
        $('.not-sexual-misconduct').show();
        $('.not-opinion').hide();
        select('#btn-opinion');
    });
});
