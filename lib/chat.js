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

// 滚动到底部一定距离加载数据
$('.scroll_chat').scroll(function(e){ 
    var scroll_top = $(this).scrollTop();
    console.log(scroll_top)
    if (scroll_top >= getData(50) && isLoding){
        console.log('请求')
        isLoding = false; // 请求前设为 false;
        // $('.lodingBox').show(); // 开启加载中动画
        console.log('开启加载中动画')
        // 模拟请求
        setTimeout(function(){
            console.log('请求加载完成')
            isLoding = true;
            // $('.lodingBox').hide(); // 关闭加载中动画
            console.log('关闭加载中动画')
        },2000)
    }
})
})