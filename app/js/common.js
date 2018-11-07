'use strict';

$(function(){
    //头部分类的隐藏与显示
     $(".header_classifi_item").hover(function(){
        $(".header_category").show();  
    });
    $(".header_classifi_item").mouseout(function(){
        $(".header_category").hide();  
    });

    //首页二级分类的隐藏与显示


    $(".main_catalog_item").hover(function(){
        $(".main_header_category").show();  
    });
    // $(".main_catalog_item").mouseout(function(){
    //     $(".main_header_category").hide();  
    // });


    $(".main_catalog_item").hover(function(){
        $(".main_category_item").show();  
    });
    // $(".main_catalog_item").mouseout(function(){
    //     $(".main_category_item").hide();  
    // });


     //首页三级分类的隐藏与显示
     $(".main_category_item_inner").mouseover(function(){
        $(".category_inner_list").show(); 
    });
    $(".main_category_item_inner").mouseout(function(){
        $(".category_inner_list").hide();  
    });

    //个人中心的隐藏与显示
    $(".login_success_img").mouseover(function(){
        $(".order_info").show();  
    });
    $(".login_success_img").mouseout(function(){
        $(".order_info").hide(); 
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
