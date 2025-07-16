let start = 0;
const limit = 6;
let loading = false;
let postCount = 0;

function loadPosts() {
  if (loading) return;

  loading = true;
  $("#loading").show();
  $("#error").hide();

  $.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  )
    .done(function (posts) {
      if (posts.length === 0) {
        $("#loading").text("Tüm postlar yüklendi").show();
        return;
      }

      posts.forEach((post, i) => {
        //50den sonra güzel manzara resimleri var
        const imageId = start + i + 50;
        const postHtml = `
                    <div class="post">
                        <img src="https://picsum.photos/id/${imageId}/500/300" alt="görsel">
                        <div class="post-content">
                            <h3>${post.title}</h3>
                            <p>${post.body}</p>
                        </div>
                    </div>
                `;
        $("#posts").append(postHtml);
        postCount++;
      });

      start += limit;
      $("#count").text(postCount);
    })
    .fail(function () {
      $("#error").text("Postlar yüklenirken hata oluştu!").show();
    })
    .always(function () {
      loading = false;
      $("#loading").hide();
    });
}

//hata testi
function errorTest() {
  $("#loading").show();
  $("#error").show();

  $.get("https://jsonplaceholder.typicode.com/mertunal")
    .fail(function () {
      $("#error").text("Hatalı istek atıldı!").show();
    })
    .always(function () {
      $("#loading").hide();
      loading = true;
    });
}

$(document).ready(function () {
  loadPosts();

  $("#errorBtn").click(errorTest);

  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
      loadPosts();
    }
  });
});
