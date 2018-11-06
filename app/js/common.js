'use strict';

$(function(){
    //分类的隐藏与显示
     $(".header_classifi_item").mouseover(function(){
        $(".header_category").hide();  //隐藏
    });
    $(".header_classifi_item").mouseout(function(){
        $(".header_category").show();  //显示
    });

    //个人中心的隐藏与显示
    $(".login_success_img").mouseover(function(){
        $(".order_info").hide();  //隐藏
    });
    $(".login_success_img").mouseout(function(){
        $(".order_info").show();  //显示
    });

    


})