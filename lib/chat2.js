$(function(){
    // 获取数据
    function getData(x){
        var screenH = $('.scroll_chat').height();
        var bodyH = $('.aaa').height();
        var footerH = $('#home_footer').height();
        // return (bodyH - screenH - footerH - x)
        return (bodyH - screenH - footerH - x)
    }

    var isLoding = true;  // 默认为 true   请求数据时定为false 请求加载完成 设为 true  防止请求中重复加载

    console.log($('.aaa').height())
    var a = $('.scroll_chat').height();
    // var b = $('.scroll_chat').scrollTop()
    var c = $('.aaa').height()
    var d = 0
    d = c - a
    $('.scroll_chat').animate({ scrollTop: "+="+d }, 100);
    console.log($('.object_message').offset().top)
    
    
    // $('.scroll_chat').scrollTop()+$('.scroll_chat').height() = $('.aaa').height() 
})