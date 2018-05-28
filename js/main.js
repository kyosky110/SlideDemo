
$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
meunItemListener()

let width = $("#slideImgs").width()

function meunItemListener() {
    $('#menu ul li a').on("click", function (event) {
        $('li.menuItem').removeClass('act').addClass('inact');
			$(this).parent().addClass('act');
        var index = $(this).parent().prevAll('.menuItem').length
        var distance = index * - width
        $('#slideImgs').css({
            transform: 'translate(' + distance + 'px)'
        })
        return false
    })
}

// var timerId = setTimer()

// //修复鼠标放在上面停止滑动的bug
// //简单鼠标进入和出去的事件 mouseenter mouseleave
// $('#slideWindow').on('mouseenter',()=>{
//     console.log('mouseenter')
//     window.clearInterval(timerId)
// })

// $('#slideWindow').on('mouseleave',()=>{
//     timerId = setTimer()
// })

// function setTimer() {
//     return setInterval(() => {
//         indexButton++
//         $(allButtons[indexButton % buttonLength]).trigger('click')
//     }, 3000)
// }