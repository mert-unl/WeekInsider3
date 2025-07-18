let start = 0;
const limit = 6;
let loading = false;

//Day2 de yaptığım kodu değiştirdim.
function loadPersons() {
  if (loading) return;

  loading = true;
  $("#loading").fadeIn();
  $("#error").hide();

  $.get(`https://randomuser.me/api/?results=${limit}`)
    .done(function (data) {
      const persons = data.results;

      persons.forEach((user) => {
        const username = `${user.name.first} ${user.name.last}`;
        const age = user.dob.age;
        const country = user.location.country;
        const reward = user.location.street.number;
        const profileImg = user.picture.large;

        //caption için ekstra bilgiler
        const c1 = user.gender;
        const c2 = user.location.city;
        const c3 = user.location.state;
        const c4 = user.email;
        const c5 = user.phone;

        const caption = `
            <div style='text-align:left;    
             font-family: Georgia;
             background-color: #0000004d;
             border-radius: 8px;
             border: 1px solid #ffffff30;
             padding: 1rem;
             '>

             <h3 style='margin-bottom:5px;'>${username} (${age})</h3>
             <p><strong>Gender:</strong> ${c1}</p>
             <p><strong>City:</strong> ${c2}, ${c3}</p>
             <p><strong>Country:</strong> ${country}</p>
             <p><strong>Email:</strong> ${c4}</p>
             <p><strong>Phone:</strong> ${c5}</p>
            </div>`;

        const personCard = $(`
          <div class="person" style="display:none;">
            <a href="${profileImg}" data-fancybox="gallery" data-caption="${caption}">
            <img src="${profileImg}">
            </a>
            <div class="info">
              <p><strong>Name:</strong> ${username}</p>
              <p><strong>Age:</strong> ${age}</p>
              <p><strong>Country:</strong> ${country}</p>
              <p><strong>Reward:</strong> ${reward} $</p>
            </div>
          </div>
        `);

        $("#persons").append(personCard);
        personCard.slideDown(700).fadeTo(0, 1);

        //slider
        const sliderCard = $(`
          <div class="slide-card">
           <img src="${profileImg}" style="width: 100%; max-width: 300px; border-radius:12px;display: block; margin: 0 auto;">
            <p>${username}</p>
            <p>Country: ${country}</p>
            <p>Reward: ${reward}</p>
          </div>
        `);
        $(".slider").slick("slickAdd", sliderCard);
      });

      //Slider hover
      $(document).on("mouseenter", ".slide-card", function () {
        $(this).css({
          transform: "scale(1.02)",
          boxShadow: "0 0 15px #f51d0eff",
          cursor: "pointer",
          zIndex: 4,
        });
      });
      $(document).on("mouseleave", ".slide-card", function () {
        $(this).css({
          transform: "scale(1)",
          boxShadow: "0 2px 10px #92020281",
          zIndex: 1,
        });
      });

      start += limit;
    })
    .fail(function () {
      $("#error").text("Hatalı istek oluştu.").show();
    })
    .always(function () {
      $("#loading").fadeOut();
      loading = false;
    });
}

$(document).ready(function () {
  //slider
  $(".slider").slick({
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    infinite: true,
    prevArrow: $(".custom-prev"),
    nextArrow: $(".custom-next"),
  });

  //kişiler
  loadPersons();

  $(document).on("mouseenter", ".person", function () {
    $(this).css({
      transform: "scale(1.1)",
      boxShadow: "0 0 24px #cf0b0bff",
      backgroundColor: "#000000ff",
      cursor: "pointer",
      zIndex: 4,
    });
  });

  $(document).on("mouseleave", ".person", function () {
    $(this).css({
      transform: "scale(1)",
      boxShadow: "0 0 10px #9b0000",
      backgroundColor: "#1e1e2e",
      zIndex: 1,
    });
  });

  //hazır buldum stackoverlow'dan
  $(document).on("click", ".person img", function (e) {
    e.preventDefault();
    const $img = $(this);
    $img
      .stop()
      .animate({ marginLeft: "-10px" }, 50)
      .animate({ marginLeft: "10px" }, 50)
      .animate({ marginLeft: "-6px" }, 50)
      .animate({ marginLeft: "6px" }, 50)
      .animate({ marginLeft: "0px" }, 50);
  });

  //main window scroll
  $(window).on("scroll", function () {
    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 20
    ) {
      loadPersons();
    }
  });
});
