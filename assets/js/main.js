$(".slider .owl-carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  rewind: true,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 10000,
  smartSpeed: 735,
  dots: false,
  maxHeight: 80,
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
});
