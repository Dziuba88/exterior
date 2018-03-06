$.get("img/sprite.svg", function(data) {
  var div = document.createElement("div");
  div.hidden = true;
  div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
  document.body.insertBefore(div, document.body.childNodes[0]);
});

var inputs = document.querySelectorAll( 'input[type=file]' );

Array.prototype.forEach.call( inputs, function( input ) {
  var label	 = input.nextElementSibling, labelVal = label.innerHTML;
  input.addEventListener( 'change', function( e ) {
    var fileName = '';
    if( this.files && this.files.length > 1 )fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    else fileName = e.target.value.split( '\\' ).pop();
    if( fileName ) label.querySelector( 'span' ).innerHTML = fileName;
    else label.innerHTML = labelVal;
  });
});

function createSticky(sticky) {
  if (typeof sticky !== "undefined") {
    var pos = sticky.offset().top,  win = $(window);
    win.on("scroll", function() {
      win.scrollTop() >= pos ? sticky.addClass("sticky") : sticky.removeClass("sticky");
      win.scrollTop() >= pos ? sticky.addClass("in") : sticky.removeClass("in");
    });
  }
};



$(document).on('click.bs.dropdown.data-api', '.navbar--nav .dropdown--menu', function (e) { e.stopPropagation() });

$(document).ready(function() {
  AOS.init({duration: 600});

  $('.skills--counter').countimator({duration: 2000});

  if ($('#banned').length) {
      $.magnificPopup.open({
        fixedContentPos: true,
        items: {src: '#banned' },
        type: 'inline',
        callbacks: {open: function() {
          $('html, body').css('overflow', 'hidden');
        }}
      });
  }

  if ($('#outofstock').length) {
      $.magnificPopup.open({
        fixedContentPos: true,
        items: {src: '#outofstock' },
        closeMarkup: '<button title="%title%" class="mfp-close"><svg><use xlink:href="#close"></use></svg></button>',
        type: 'inline',
        callbacks: {open: function() {
          $('html, body').css('overflow', 'hidden');
        }}
      });
  }

  createSticky($(".navbar"));

  if($("[type=tel]").length) {$("[type=tel]").mask("+(373) 99-999-999", {placeholder:"+(373) __-___-___"})};

  $('[data-toggle=navbar]').click(function (event) {
    $(this).toggleClass('active');
    $('.navbar').toggleClass('show-menu');
    $('html').delay(250).toggleClass('noscroll');
  })
  $('[data-toggle=search]').click(function () {
    $(this).toggleClass('active');
    $('.navbar--search').toggleClass('show');
  })

  $('[data-toggle=basket]').click(function (event) {
    $('.basket').toggleClass('show');
  })

  $('[data-sort]').click(function (e) {
    if ( $(this).hasClass('up') ) {
      $(this).removeClass('up').addClass('down');
    } else {
      if ( $(this).hasClass('down') ) {
        $(this).removeClass('down');
      } else {
        $(this).addClass('up');
      }
    }
    return false;
  })

  $('[data-toggle=filters]').click(function (event) {
    $(this).toggleClass('active');
    $('.filter').toggleClass('show');
  })

  $('[data-select]').niceSelect();

  $.each( $("[data-progress]"), function() {
    var position = $(this).data('value');
    $(this).find('.line').width(position);
    $(this).find('.current').css( "left", position );
  });

  $.each( $(".img_to_bg, .thumb img"),function(){
    var cssValues = {
      "background":"url(" + $(this).attr("src") + ") no-repeat center center scroll",
      "background-size":"cover"
    }
    $(this).parent().css(cssValues)
  });

  $('.fp--slider').owlCarousel({
    thumbs: false,
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
    var slidesPerPage = 5;
    var syncedSecondary = true;

    sync1.owlCarousel({mouseDrag: false,thumbs: false,items : 1,autoplay: true,loop: true,}).on('changed.owl.carousel', syncPosition);
    sync2.on('initialized.owl.carousel', function () {sync2.find(".owl-item").eq(0).addClass("current");})
      .owlCarousel({mouseDrag: false,thumbs: false,items : slidesPerPage,nav: true,slideBy: slidesPerPage,
        navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>']
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
      if(syncedSecondary) {var number = el.item.index;sync1.data('owl.carousel').to(number, 100, true);}
    }
    sync2.on("click", ".owl-item", function(e){
      e.preventDefault();var number = $(this).index();sync1.data('owl.carousel').to(number, 300, true);
    });

  });

  $('.fp--products .owl-carousel').owlCarousel({
    responsive : {0 : { items: 1 },480 : { items: 1 },768 : { items: 2 },960 : { items: 4 },},
    thumbs: false, loop: true,nav: true, autoplay: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>']
  });

  $('.popup__slider').owlCarousel({
    responsive : {0 : { items: 1 },768 : { items: 2 }},
    thumbs: false, loop: true,nav: true, autoplay: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>']
  });

  $('.solutions--slider .owl-carousel').owlCarousel({
    thumbs: false,items: 1,loop: true,nav: true,animateOut: 'fadeOut',animateIn: 'fadeIn', mouseDrag: false,
    navText: ['<svg><use xlink:href="#arrow_left"></use></svg>', '<svg><use xlink:href="#arrow_right"></use></svg>']
  });

  $('.fp--brands .owl-carousel').owlCarousel({
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>'],
    autoplay: true,autoplayTimeout: 7000,autoplayHoverPause: false,thumbs: false,center:true,loop: true,nav: true,
    responsive : {
      0   : {items: 1},
      768 : {items: 2},
      960 : {items: 5}
    }
  });

  $('.partners .owl-carousel').owlCarousel({
    thumbs: false,nav: true,autoplay: true,autoplayTimeout: 1000,autoplayHoverPause: false,loop: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>'],
    responsive : {0 : { items: 2 },768 : { items: 3 },960 : { items: 5 },}
  });

  $('.item__featured .owl-carousel').owlCarousel({
    thumbs: false,nav: true,autoplay: true,autoplayTimeout: 7000,autoplayHoverPause: false,loop: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>'],
    responsive : {0 : { items: 1 },768 : { items: 2 },960 : { items: 3 },}
  });

  $('.compare--slider').owlCarousel({
    thumbs: false,nav: true,mouseDrag: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>'],
    responsive : {0 :{items:1},768:{items:2},960:{items:3},1200:{items:4},1440:{items:6}}
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
    $(this).find('.active').show(50);
    $(this).find('.inactive').hide(50);
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

  $('.slider--partners .owl-carousel').owlCarousel({
    thumbs: true,thumbImage: true,items: 1,loop: false,nav: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>']
  });

  $('.slider--clients .owl-carousel').owlCarousel({
    thumbs: true,thumbImage: true,items: 1,loop: true,nav: true,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>']
  });

  $('.slider--documents .owl-carousel').owlCarousel({
    thumbs: false, nav: true,loop:true,autoplay: true,autoplayTimeout: 2000,autoplayHoverPause: false,
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>'],
    responsive : {
        0 : { items: 1 },
        768 : { items: 5 },
        960 : { items: 8 },
    }
  });

  $('[data-mfp-src]').magnificPopup({type: 'inline',callbacks: {open: function() {$('html').css('margin-right', 0);}}});
  
  if($("form.validate--form").length) {
    $.validator.messages.required = 'Заполните правильно поле';
    $('form.validate--form').each(function() {
      $(this).validate({
        focusInvalid: false,
        errorElement: "span",
        errorPlacement: function(error, element) {{
          $( element ).parent().find('label').addClass("error");
          $( element ).addClass("error");
          error.insertAfter( element );
        }}
      });
    });
  };

  if($("[data-validate]").length) {
    //$.validator.messages.required = 'Заполните правильно поле';
    $('[data-validate]').each(function() {
      $(this).validate({
        focusInvalid: false,
        errorElement: "span",
        errorPlacement: function(error, element) {{
          //$( element ).parent().find('label').addClass("error");
          $( element ).addClass("error");
          error.insertAfter( element );
        }}
      });
    });
  };

  $('[data-gallery]').each(function() {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      closeMarkup: '<button title="%title%" class="mfp-close"><svg><use xlink:href="#close"></use></svg></button>',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><svg><use xlink:href="#arrow_left_circle"></use></svg></button>',
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: ''
      },
      callbacks: {
        open: function() {
          $('html').css('margin-right', 0);
        },
        buildControls: function() {
          this.arrowLeft.appendTo(this.contentContainer);
          this.arrowRight.appendTo(this.contentContainer);
        }
      }
    });
  });

  $('.btn--video').magnificPopup({
    //disableOn: 700,
    items: {src:"https://www.youtube.com/watch?v=Egt8jPcuytM"},
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
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

  $('#action .owl-carousel').owlCarousel({
    navText: ['<svg><use xlink:href="#arrow_left_circle"></use></svg>', '<svg><use xlink:href="#arrow_right_circle"></use></svg>'],
    loop: true,nav: true,
    thumbs: true,thumbImage: true,
    items: 1,
    loop: true,
    mouseDrag: true,
  });

  $('[data-mfp-gallery]').each(function() {
    $(this).magnificPopup({
      items: {src: $('#action')},
      closeMarkup: '<button title="%title%" class="mfp-close"><svg><use xlink:href="#close"></use></svg></button>',
      type: 'inline',
      callbacks: { 
        open: function() {
          $('html').css('margin-right', 0);
        }
      }
    });

    $(this).on('mfpOpen', function() {
      var current_slide = parseInt($(this).attr('data-mfp-gallery'));
      $('#action .owl-carousel').trigger('to.owl.carousel', current_slide);
    });

  });

  $(".btn--readmore").click(function () {
    $(this).hide();
    $(this).text(function(i, text){
      return text === "Читать далее" ? "Свернуть" : "Читать далее";
    })
  });

  $('[data-show=message').click(function () {
    $(this).hide();
    $(this).parent().find('label').hide();
    $(this).parent().find('.message').show();
  });

});


