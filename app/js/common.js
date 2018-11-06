'use strict';

$(function(){
    //分类的隐藏与显示
     $(".header_classifi_item").mouseover(function(){
        $(".header_category").show();  //隐藏
    });
    $(".header_classifi_item").mouseout(function(){
        $(".header_category").hide();  //显示
    });

    //个人中心的隐藏与显示
    $(".login_success_img").mouseover(function(){
        $(".order_info").show();  //隐藏
    });
    $(".login_success_img").mouseout(function(){
        $(".order_info").hide();  //显示
    });

    //楼层导航的显示隐藏
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
        $('.floors_nav').fadeIn(800);
        } else {
        $('.floors_nav').fadeOut(800);
        }
        });
   
})
