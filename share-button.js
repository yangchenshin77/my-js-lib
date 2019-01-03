(function($){
  var s = {
    'title': '',
    'share': [
      {
        'class': 'line',
        'fa': 'fab fa-line fa-2x',
        'name': 'Line',
        'href': 'https://lineit.line.me/share/ui?url=',
        'title': false,
        'show': true,
        'hideWrapper': true
      },
      {
        'class': 'fb',
        'fa': 'fab fa-facebook-f',
        'name': 'Fb',
        'href': 'https://www.facebook.com/sharer.php?u=',
        'title': false,
        'show': true
      },
      {
        'class': 'gplus',
        'fa': 'fab fa-google-plus-g',
        'name': 'Google+',
        'href': 'https://plus.google.com/share?url=',
        'title': false,
        'show': true
      },
      {
        'class': 'plurk',
        'fa': 'fab fa-plurk',
        'name': 'Plurk',
        'href': 'http://www.plurk.com/?qualifier=shares&status=',
        'title': true,
        'show': false
      },
      {
        'class': 'weibo',
        'fa': 'fab fa-weibo',
        'name': '微博',
        'href': 'href="http://service.weibo.com/share/share.php?title=',
        'title': true,
        'show': false
      },
      {
        'class': 'twitter',
        'fa': 'fab fa-twitter',
        'name': 'Twitter',
        'href': 'https://twitter.com/intent/tweet?original_referer=',
        'title': true,
        'show': false
      },
      // {
      //   'class': 'tumblr',
      //   'fa': 'fab fa-tumblr',
      //   'name': 'Tumblr',
      //   'href': 'http://www.tumblr.com/share/link?name=',
      //   'title': true,
      //   'show': false
      // },
      // {
      //   'class': 'pinterest',
      //   'fa': 'fab fa-pinterest-p',
      //   'name': 'Pinterest',
      //   'href': 'http://pinterest.com/pin/create/button/?url=',
      //   'title': true,
      //   'show': false
      // },
      {
        'class': 'email',
        'fa': 'fas fa-envelope',
        'name': 'E-mail',
        'href': 'mailto:?subject=',
        'title': true,
        'show': false
      }
    ],
    'spacing': 6
  };

  var d = {
    class: '.share-button',
    href: location.href.replace(/#\w/,''),
    mobile: navigator.userAgent.match(/([Mm]obile|[Aa]ndroid|[Pp]ad)/g)
  };

  $.fn.yShareButton = function(o){

    var e = $(this), t = $.extend({}, s, o);
    if(o){
      for(var c in t.share){
        t.share[c] = $.extend({}, s.share[c], o.share[c]);
      }
    }

    e.extend({
      css: function(){
        var m = 'auto ' + (Number(t.spacing) / 2) + 'px';
        e.children('a').css('margin', m);
        e.children('a').css({
          'display': 'inline-block',
          'text-decoration': 'none',
          '-webkit-transition': 'all .2s',
          '-moz-transition': 'all .2s',
          'transition': 'all .2s'
        });
        if(!d.mobile){
          e.children('a').hover(function(){
            $(this).css({
              '-webkit-transform': 'translateY(-4px)',
              '-ms-transform': 'translateY(-4px)',
              'transform': 'translateY(-4px)'
            });
          },function(){
            $(this).css({
              '-webkit-transform': 'translateY(0px)',
              '-ms-transform': 'translateY(0px)',
              'transform': 'translateY(0px)'
            });
          });
        }
        e.find('.fa-stack-1x').css('color', '#ffffff');
        e.find('.rs_fb .fa-stack-2x').css('color', '#3B5998');
        e.find('.rs_gplus .fa-stack-2x').css('color', '#d73d32');
        e.find('.rs_line .fa-stack-1x').css('color', '#00c300');
        e.find('.rs_plurk .fa-stack-2x').css('color', '#cf682f');
        e.find('.rs_plurk .fa-plurk').css({
          'font-family': 'arial',
          'font-style': 'normal',
          'font-weight': 'bold'
        });
        e.find('.rs_weibo .fa-stack-2x').css('color', '#F5CA59');
        e.find('.rs_twitter .fa-stack-2x').css('color', '#2ba9e1');
        e.find('.rs_tumblr .fa-stack-2x').css('color', '#35465d');
        e.find('.rs_pinterest .fa-stack-2x').css('color', '#EA1514');
        e.find('.rs_email .fa-stack-2x').css('color', '#939598');
        return e;
      },
      createElement: function(){
        for(var f in t.share){
          if(t.share[f].show){
            e.append('<a class="rs_' + t.share[f].class + '" href="" title="分享到 ' + t.share[f].name + '" target="_blank"><span class="fa-stack">' + (!t.share[f].hideWrapper ? '<i class="fa fa-circle fa-stack-2x"></i>' : '') + '<i class="' + t.share[f].fa + ' fa-stack-1x"></i></span></a>');
          }
        }
        return e;
      },
      createHref: function(){
        for(var f in t.share){
          var r = t.share[f].href;
          if(t.share[f].title){
            switch(t.share[f].class){
              case 'plurk':
                r += t.title + ' ' + d.href;
                e.find('.fa-plurk').text('P');
                break;
              case 'weibo':
                r += t.title + '&url=' + d.href;
                break;
              case 'twitter':
                r += d.href + '&url=' + d.href + '&text=' + t.title;
                break;
              case 'tumblr':
                r += t.title + ' ' + d.href + '&url=' + d.href;
                break;
              case 'pinterest':
                r += d.href + '&description=' + t.title + ' ' + d.href;
                break;
              case 'email':
                r += t.title + '&body=' + t.title + ' ' + d.href;
                break;
            }
          }else{ r += d.href; }
          e.find('.rs_' + t.share[f].class).attr('href', r);
        }
        e.find('a').click(function(event){if(!d.mobile){
          event.preventDefault();
          window.open(t.share[$(this).index()].href + d.href, "_blank", "height=600,width=500");
        }});;
        return e;
      }
    });

    $(function(){
      e.createElement().createHref().css();
    });

  };
})(jQuery);
