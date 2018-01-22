$.get("img/sprite.svg", function(data) {
  var div = document.createElement("div");
  div.hidden = true;
  div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
  document.body.insertBefore(div, document.body.childNodes[0]);
});


if($("#nouislider").length) {
  var slider = document.getElementById('nouislider');
  var input0 = document.getElementById('start-range');
  var input1 = document.getElementById('stop-range');
  var inputs = [input0, input1];

  noUiSlider.create(slider, {
    start: [0, 3000],
    connect: true,
    tooltips: false,
    step: 100,
    range: {
      'min': 0,
      'max': 10000
    }
  });

  slider.noUiSlider.on('update', function( values, handle ) {
    inputs[handle].value = Math.round(values[handle]);
  });

  function setSliderHandle(i, value) {
    var r = [null,null];
    r[i] = value;
    slider.noUiSlider.set(r);
  }
  // Listen to keydown events on the input field.
  inputs.forEach(function(input, handle) {
    input.addEventListener('change', function(){
      setSliderHandle(handle, this.value);
    });
    input.addEventListener('keydown', function( e ) {
      var values = slider.noUiSlider.get();
      var value = Number(values[handle]);
      var steps = slider.noUiSlider.steps();
      var step = steps[handle];
      var position;
      switch ( e.which ) {
        case 13: 
          setSliderHandle(handle, this.value);
          break;
        case 38: 
          position = step[1];
          if ( position === false ) {position = 1;}
          if ( position !== null ) {setSliderHandle(handle, value + position);}
          break;
        case 40:
          position = step[0];
          if ( position === false ) {position = 1;}
          if ( position !== null ) {setSliderHandle(handle, value - position);}
          break;
        }
      });
  });
};
$(document).ready(function() {
  
  $('[data-select]').niceSelect();

  $.each( $(".img_to_bg, .thumb img"),function(){
    var cssValues = {
      "background":"url(" + $(this).attr("src") + ") no-repeat center center scroll",
      "background-size":"cover"
    }
    $(this).parent().css(cssValues)
  });

  $('.fp--slider').owlCarousel({
    items: 1,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    loop: true,
    mouseDrag: false
  });

  $(function(){
    var sync1 = $("#actionsync-1");
    var sync2 = $("#actionsync-2");
    var syncedSecondary = false;

    sync1
      .owlCarousel({loop: true,items: 1,mouseDrag: false})
      .on('changed.owl.carousel', syncPosition);
    sync2
      .on('initialized.owl.carousel', function () {sync2.find(".owl-item").eq(0).addClass("current");})
      .owlCarousel({
        nav: true,
        navText: ['<svg><use xlink:href="#arrow-big-left"></use></svg>', '<svg><use xlink:href="#arrow-big-right"></use></svg>'],
        responsive : {
          0 : { items: 1 },
          480 : { items: 2 },
          1000 : { items: 3 },
          1200 : { items: 5 },
        },

      
      })
      .on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      if(current < 0) {current = count;}
      if(current > count) {current = 0;}

      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
      
      if (current > end) {sync2.data('owl.carousel').to(current, 100, true);}
      if (current < start) {sync2.data('owl.carousel').to(current - onscreen, 100, true);}
    }

    function syncPosition2(el) {
      if(syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
      }
    };

    sync2.on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
    });

  });


  $('.fp--products .owl-carousel').owlCarousel({
    responsive : {
        0 : { items: 1 },
        480 : { items: 1 },
        768 : { items: 2 },
        960 : { items: 4 },
    },
    loop: true,
    nav: true,
    navText: ['<svg><use xlink:href="#arrow-big-left"></use></svg>', '<svg><use xlink:href="#arrow-big-right"></use></svg>']
  });

  $('.fp--brands .owl-carousel').owlCarousel({
    responsive : {
        0 : { items: 1 },
        768 : { items: 2 },
        960 : { items: 5 },
    }
  });

  $('.item__featured .owl-carousel').owlCarousel({
    nav: true,
    navText: ['<svg><use xlink:href="#arrow-big-left"></use></svg>', '<svg><use xlink:href="#arrow-big-right"></use></svg>'],
    responsive : {
        0 : { items: 1 },
        768 : { items: 2 },
        960 : { items: 3 },
    }
  });

  $('nav.categories .level--1').on('click', function (event) {
    event.preventDefault();
    if ($(this).parent('.parent--1').hasClass('open')) {
      $(this).parent('.parent--1').removeClass('open');
    } else {
      $('nav.categories').find('.open').removeClass('open');
      $(this).parent('.parent--1').addClass('open');
    }
    return false;
  })

  $('nav.categories .level--2').on('click', function (event) {
    event.preventDefault();

    if ($(this).parent('.parent--2').hasClass('open')) {
      $(this).parent('.parent--2').removeClass('open');
    } else {
      $(this).parents('.parent--1').find('.open').removeClass('open');
      $(this).parent('.parent--2').addClass('open');
    }
    return false;
  })

  if($(".btn-minus").length) {
    $('.btn-minus').click(function () {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
  };

  if($(".btn-plus").length) {
    $('.btn-plus').click(function () {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  };

  $('.add-to-basket').on('click', function (event) {
    $(this).addClass('in');
    $(this).find('.active').show(300);
    $(this).find('.inactive').hide(300);
  });

  $('[data-link]').click(function () {
    var link = $(this).data('link');
    var current = $('[data-image="' + link + '"]')

    if ( $(this).hasClass('active') ) {
      return true;
    } else {
      $('[data-link]').removeClass('active');
      $('[data-image]').removeClass('active');
      $(this).addClass('active');
      current.addClass('active');
    }
  });

  $('[data-action]').countdowntimer({
    startDate: '2018/01/01 00:00:00',
    dateAndTime: '2018/02/15 00:00:00',
    regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
    regexpReplaceWith: "<span>$1<small>дней</small></span><span>$2<small>часов</small></span><span>$3<small>минут</small></span><span>$4<small>секунд</small></span>"
  });

  $('[data-class-toggle]').click(function () {
    var act_class = $(this).data('class-toggle');
    $(this).toggleClass(act_class);
    return false;
  });
























});