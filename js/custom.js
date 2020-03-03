var flag = 0;
$(".jquery-selectbox-moreButton").on("click", function() {
    if(!flag) {
        $(".jquery-custom-selectboxes-replaced").addClass("selecthover");
        $(".jquery-custom-selectboxes-replaced-list").slideDown();
        flag = 1;
    } else {
        $(".jquery-custom-selectboxes-replaced-list").slideUp("fast", function() {
            $(".jquery-custom-selectboxes-replaced").removeClass("selecthover");
        });
        flag = 0;
    }
})

$(".jquery-selectbox-item").on("click", function() {
    flag = 0;
    $(".jquery-custom-selectboxes-replaced-list").slideUp("fast", function() {
        $(".jquery-custom-selectboxes-replaced").removeClass("selecthover");
    });
    $(".jquery-selectbox-currentItem").text($(this).text());
})