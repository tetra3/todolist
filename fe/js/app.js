(function (window) {
	'use strict';
var count = 0;
$(document).ready(function() {

    //List
    $.ajax({
    url: "/api/todos",
    type:"GET"

    }).done(function(result) {

        for(var index in result) {
            if(result[index].completed === 1) {
                $('.todo-list').prepend("<li data-id="+result[index].id+" class='completed'><div><input class='toggle' type='checkbox' checked></input><label>"+result[index].todo+"</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
            }
            else{
                $('.todo-list').prepend("<li data-id="+result[index].id+"><div><input class='toggle' type='checkbox'></input><label>"+result[index].todo+"</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
                count = count + 1;
            }
            $('.todo-count>strong').text(count);
        }

       });

    //Insert
    $('.new-todo').keypress(function(key) {


        if (key.keyCode == 13) {
            if( $('.new-todo').val() === ""){
                  alert("문자열을 입력해주세요");
            }
            else{
                $.ajax({
                    url: "/api/todos",
                    type:"POST",
                    data:{'todo':$('.new-todo').val()}

                    }).done(function() {
                        $('.new-todo').val('');
                        $.ajax({
                            url: "/api/todos",
                            type:"GET",
                        }).done(function(result) {
                             $('.todo-list').prepend("<li data-id="+result[result.length-1].id+"><div><input class='toggle' type='checkbox'></input><label>"+result[result.length-1].todo+"</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
                             count = count + 1;
                             $('.todo-count>strong').text(count);
                          });
                    });
            }
        }
    });




});


//Delete
$(document).on("click",".destroy",function() {
    var $this = $(this);
    $.ajax({
        url: "/api/todos",
        type:"DELETE",
        data: JSON.stringify({'id':$(this).parents("li").attr("data-id") }),
        contentType : "application/json; charset=utf-8",

        success:function(){

            $this.parents("li").remove();
            count = count - 1;
            $('.todo-count>strong').text(count);
        },
        error:function() {
            console.log("error");
        }
    });
});

$(document).on("click",".clear-completed",function() {
    $.ajax({
        url: "/api/todos/all",
        type:"DELETE",

        success:function(){

            $(".todo-list").children("li.completed").remove();



        },
        error:function() {
            console.log("error");
        }
    });
})



$(document).on("change",".toggle",function() {
        var here = $(this);


        if( $(this).is(":checked") ) {

            $.ajax({
                url:"/api/todos",
                type:"PUT",
                data: JSON.stringify({'id':$(this).parents("li").attr("data-id"),'completed':'1'}),
                contentType : "application/json; charset=utf-8",

                success:function() {
                    here.parents("li").addClass("completed");
                    count = count - 1;
                    $('.todo-count>strong').text(count);
                }

            });
        }
        else{

             $.ajax({
                url:"/api/todos",
                type:"PUT",
                data: JSON.stringify({'id':$(this).parents("li").attr("data-id"),'completed':'0'}),
                contentType : "application/json; charset=utf-8",

                success:function() {
                     here.parents("li").removeClass("completed");
                     count = count + 1;
                     $('.todo-count>strong').text(count);
                }

             });
        }

        // var h = $(document.body).find('.toggle:checked');
        // console.log(h);
        // $('.todo-count>strong').append(h);


        // select ALL 구성
        // var toggleCheckObjs = $(".toggle[type='checkbox']");
        // console.log(toggleCheckObjs.length);
        // console.log($(".toggle[type='checkbox']:checked").length);
        // if( toggleCheckObjs.length === $(".toggle[type='checkbox']:checked").length ) {
        //     console.log("hi");
        //     $('.toggle-all').attr("checked",true);
        // }
        // else if ( $(".toggle[type='checkbox']:checked").length < 4 )
        // {
        //     $('.toggle-all').attr("checked",false);
        // }



});


$(document).on("click",".toggle-all",function() {
    if( $('.toggle-all').prop("checked") ) {
        $('.toggle:not(:checked)').click()
    }
    else{
        $('.toggle').click();
    }
});


$(document).on("click","a[href='#/active']",function(evt) {
    evt.preventDefault();
    $("a[href='#/completed']").removeClass("selected");
    $("a[href='#/active']").addClass("selected");
    $("a[href='#/']").removeClass("selected");

    $('.toggle:checked').parents("li").hide();
    $('.toggle:not(:checked)').parents("li").show();
});

$(document).on("click","a[href='#/completed']",function(evt) {
    evt.preventDefault();
    $("a[href='#/completed']").addClass("selected");
    $("a[href='#/active']").removeClass("selected");
    $("a[href='#/']").removeClass("selected");

    $('.toggle:checked').parents("li").show();
    $('.toggle:not(:checked)').parents("li").hide();
});

$(document).on("click","a[href='#/']",function(evt) {
    evt.preventDefault();
    $("a[href='#/completed']").removeClass("selected");
    $("a[href='#/active']").removeClass("selected");
    $("a[href='#/']").addClass("selected");

    $('.toggle:checked').parents("li").show();
    $('.toggle:not(:checked)').parents("li").show();
});


// var x = document.getElementsByClassName("toggle");
// var count = 0;
// console.log(x);

// var h = $('.toggle');
// console.log(h);



// var toggleCheckObjs = $(".toggle[type='checkbox']");
// console.log(toggleCheckObjs.length);
// console.log($(".toggle[type='checkbox']:checked").length);
// if( toggleCheckObjs.length === $(".toggle[type='checkbox']:checked").length ) {
//     console.log("hi");
//     $('.toggle-all').attr("checked",true);
// }
// else if ( $(".toggle[type='checkbox']:checked").length < 4 )
// {
//     $('.toggle-all').attr("checked",false);
// }



})(window);




