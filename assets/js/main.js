jQuery(document).ready(function ($) {
  let sectionIds = [];
  let sectionTopMargins = [];

  // Animations
  let timer = 0;
  let intersectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setTimeout(function () {
          e.target.classList.add("up");
        }, timer);
        timer += 50;
        intersectionObs.unobserve(e.target);
      }
    });
  });

  document.querySelectorAll(".start-sooth").forEach((obj) => {
    intersectionObs.observe(obj);
  });

  $(
    "#work-section, #skills-section, #experience-section, #banner, #education-section"
  ).each(function () {
    sectionIds.push($(this).attr("id"));
    sectionTopMargins.push($(this).offset().top);
  });

  var mastheadheight = $(".ds-header").outerHeight();
  $(".ds-about-section").css("margin-top", mastheadheight);

  $(window)
    .scroll(function () {
      let scrollVal = $(window).scrollTop();
      sectionTopMargins.forEach((tm, i) => {
        if (
          scrollVal >= tm &&
          (i + 1 == sectionIds.length || scrollVal < sectionTopMargins[i + 1])
        ) {
          $(".nav a").removeClass("auto-underline");
          $(".nav a[href='#" + sectionIds[i] + "']").addClass("auto-underline");
        }
      });

      if (scrollVal >= 80) {
        $(".ds-header").addClass("ds-fixed-header");
      } else {
        $(".ds-header").removeClass("ds-fixed-header");
      }
    })
    .scroll();

  $("#color-mode-toggle").on("click", function () {
    document.body.classList.toggle("dark-theme");
  });

  $("ul.nav li a").on("click", function () {
    if ($(".hamburger-lines").css("display") != "none") {
      $("div.nav > input[type='checkbox']").click();
    }
  });
});
