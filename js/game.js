$(function(){

    $("img:not(:first)").on("click",function()
    {
        // this.css(object);
        $(this).attr("src","images/die.png").fadeTo(2000);
        $(this).animate({top: '350px', opacity: '0.8'}, 1500).hide(1000);
    });
});