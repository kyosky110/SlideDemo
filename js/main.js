

let indexPage = 1
let pageLength = $('#slideImgs > img').length
let allButtons = $('#sildeButtions > button')
if(pageLength !== allButtons.length){
    alert('按钮和图片数量不一致哦')
}

init()
buttonlistener()
let timerId = setTimer()

//下面是方法

function init() {
    setCurrentPage(getCurrentImg())
        .siblings().addClass('enterPage')
    activeButton($(allButtons[getCurrentIndex() - 1]))
}

/**
 * 设置定时器
 */
function setTimer() {
    return setInterval(() => {
        console.log(getButtonCurrentIndex())
        changePage(getCurrentIndex(),$(allButtons[getButtonCurrentIndex()]))
        //退出
        // setLeavePage(getCurrentImg()).one('transitionend', event => {
        //     setEnterPage($(event.currentTarget))
        // })
        // indexPage++
        // //进入
        // activeButton($(allButtons[getCurrentIndex() - 1]))
        // setCurrentPage(getCurrentImg())
    }, 3000)
}

function getCurrentIndex() {
    return indexPage > pageLength ? (indexPage = 1) : indexPage
}

function getButtonCurrentIndex(){
    return getCurrentIndex() >= pageLength ? 0 : getCurrentIndex()
}

function getCurrentImg() {
    return $(`#slideImgs > img:nth-child(${getCurrentIndex()})`)
}

function setLeavePage($img) {
    return $img.removeClass('currentPage').addClass('leavePage')
}

function setEnterPage($img) {
    if($img.hasClass('currentPage')){
        return
    }
    return $img.removeClass('leavePage').addClass('enterPage')
}

function setCurrentPage($img) {
    return $img.removeClass('enterPage').removeClass('leavePage').addClass('currentPage')
}

function activeButton($button) {
    $button.addClass('buttonActive')
        .siblings('.buttonActive').removeClass('buttonActive')
}

function changePage(lastIndex, $button) {
    activeButton($button)
    //退出
    setLeavePage(getCurrentImg()).one('transitionend', event => {
        setEnterPage($(event.currentTarget))
    })
    indexPage = lastIndex + 1
    //进入
    setCurrentPage(getCurrentImg())
}

function buttonlistener() {

    for (let i = 0; i < allButtons.length; i++) {
        $(allButtons[i]).on('click', function (event) {
            window.clearInterval(timerId)
            changePage($(event.currentTarget).index(),$(event.currentTarget))
            timerId = setTimer()
            // var index = $(event.currentTarget).index()
            // activeButton($(event.currentTarget))
            // setLeavePage(getCurrentImg()).one('transitionend', event => {
            //     setEnterPage($(event.currentTarget))
            // })
            // indexPage = index + 1
            // setCurrentPage(getCurrentImg())
        })
    }
}

//修复鼠标放在上面停止滑动的bug
//简单鼠标进入和出去的事件 mouseenter mouseleave
$('#slideWindow').on('mouseenter',()=>{
    console.log('mouseenter')
    window.clearInterval(timerId)
})

$('#slideWindow').on('mouseleave',()=>{
    timerId = setTimer()
})