$(function(){
    $('.btn').click(function(){
        $('.btn').removeClass('active');
        $(this).addClass('active')
        // var value = this.value;
        // $('.moduleTab').css('display','none');
        // $('#'+value).css('display','block')
        var index = $(this).index();
        console.log(index)
        $('.moduleTab').hide();
        $('.moduleTab').eq(index).show()
    })
})