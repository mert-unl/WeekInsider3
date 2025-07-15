var studentData = [
  { name: "Mert Ünal", class: "12-D" },
  { name: "Adnan Özdemir", class: "11-A" },
  { name: "İrfan Subaşı", class: "12-A" },
  { name: "Çağan Hatapçı", class: "12-F" },
  { name: "Rick Morty", class: "10-B" },
  { name: "Arda Güler", class: "9-C" },
  { name: "Muslera Kazım", class: "10-D" },
  { name: "Jason Kodoğulları", class: "10-J" },
  { name: "Zeynep Zehra", class: "10-E" },
  { name: "Ali Veli", class: "11-C" },
  { name: "Ayşe Fatma Hayriye", class: "10-B" },
  { name: "Muhammed Talha", class: "9-A" },
];

//oluştur
function renderTable() {
  var tbody = $("#studentTable tbody");
  tbody.empty();

  studentData.forEach(function (student, index) {
    var row = $("<tr></tr>");

    row.append("<td>" + student.name + "</td>");
    row.append("<td>" + student.class + "</td>");
    row.append(
      "<td><span class='delete' data-index='" +
        index +
        "'>Okuldan at!</span></td>"
    );

    row.click(function () {
      $(this).toggleClass("clicked");
    });

    row.on("mouseenter", function () {
      $(this).css({
        transform: "scale(1.025)",
      });
    });

    row.on("mouseleave", function () {
      $(this).css({
        transform: "scale(1)",
      });
    });
    tbody.append(row);
  });
}

$(document).ready(function () {
  renderTable();

  $("#addStudentForm").submit(function (e) {
    e.preventDefault();

    var name = $("#nameInput").val().trim();
    var className = $("#classInput").val().trim();

    if (name && className) {
      studentData.push({ name: name, class: className });
      $("#nameInput").val("");
      $("#classInput").val("");
      renderTable();
    }
  });

  $("#studentTable").on("click", ".delete", function (e) {
    e.stopPropagation();
    var index = $(this).data("index");
    studentData.splice(index, 1);
    renderTable();
  });
});
