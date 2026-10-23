console.log("Products frontend javascript file");
// bu mantiq Dish dagi DRINK tanlansa Volume litrda korsat boshqa payt normal, large korsat deyish uchun yozildi
$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-collection").hide();
      $("#product-volume").show();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  // bu yerda yangi maxsulot qoshish jadvali doimiy yo'q bo'lishi qachonki < New Product > tugmasi bosilgandagina ochilishi uchun yozildi
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(400);
    $("#process-btn").css("display", "none");
  });

  // bu yerda maxsulot hosil qilish jadvalini yopuvchi CANCEL tugmasi bosilganda jadval yopilish mantig'i yozildi
  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  // bu yerda product ni statusini ya'ni PROCESS , DELETE, ga aslida doimiy PAUSE da bo'ladi
  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id,
      productStatus = $(`#${id}.new-product-status`).val();

    try {
      const response = await axios.post(`/admin/product/${id}`, {
        productStatus: productStatus,
      });
      console.log("response:", response);
      const result = response.data;
      if (result.data) {
        console.log("Product updated!");
        $(".new-product-status").blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });
});

// bu yerda validate qilinyapti yangi maxsulot hosil qilyatganda qaysidir qism yozilmasa error berishi kerak hamma qismga ma'lumot yozilishi kerak
function validateForm() {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val(),
    productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please insert all details!");
    return false;
  } else return true;
}

// bu yerda yangi maxsulot jadvalda maxsulot rasmini qoshganda o'sha qo'shilgan maxsulotni rasmini korsatish uchun yozildi
function previewFileHandler(input, order) {
  const imgClassName = input.className;
  console.log("input:", input);

  const file = $(`.${imgClassName}`).get(0).files[0],
    fileType = file["type"],
    validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg and png!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}