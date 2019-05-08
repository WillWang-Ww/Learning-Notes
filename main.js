setTimeout(function(){
  $('.images>img:nth-child(1)').css({
    transform:'translateX(-100%)'
  })
  $('.images>img:nth-child(2)').css({
    transform:'translateX(-100%)'
  })
  $('.images>img:nth-child(1)').one('transitionend',function(e){
    $(e.currentTarget).addClass('right').css({transform:'none'})
  })
}, 3000); 