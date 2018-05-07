
var allButtons = $('#sildeButtions > button')
buttonlistener()

//自动轮播
//1 计时器 3000 2 到时间点一个 jq点击是 $().trigger('click')
var indexButton = 0
var buttonLength = allButtons.length
$(allButtons[indexButton]).trigger('click')
var timerId = setTimer()

//修复鼠标放在上面停止滑动的bug
//简单鼠标进入和出去的事件 mouseenter mouseleave
$('#slideWindow').on('mouseenter',()=>{
    console.log('mouseenter')
    window.clearInterval(timerId)
})

$('#slideWindow').on('mouseleave',()=>{
    timerId = setTimer()
})

function setTimer(){
    return setInterval(()=>{
        indexButton++
        $(allButtons[indexButton%buttonLength]).trigger('click')
    },3000)
}

function activeButton($button){
    $button.addClass('red')
        .siblings('.red').removeClass('red')
}

function buttonlistener(){

    for (let i = 0; i < allButtons.length; i++) {
        $(allButtons[i]).on('click',function(event){
            var index = $(event.currentTarget).index()
            var distance = index * -300
            $('#slideImgs').css({
                transform:'translate('+ distance + 'px)'
            })
            // $(event.currentTarget).addClass('red')
            // .siblings('.red').removeClass('red')
            activeButton($(event.currentTarget))
            indexButton = index
        })
        
    }
}