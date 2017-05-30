(function (window) {
	'use strict';
})(window);



$(document).ready(function() {
    //List
    $.ajax({
    url: "/api/todos",
    type:"GET"

    }).done(function(result) {
      for(index in result) {
      $('.todo-list').prepend("<li data-id="+result[index].id+"><div><input class='toggle' type='checkbox'></input><label>"+result[index].todo+"</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
        }

       });

    //Insert
    $('.new-todo').keypress(function(key) {
        if (key.keyCode == 13) {
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

                });
            });
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
            console.log("succes");
            $this.parents("li").remove();

        },
        error:function() {
            console.log("error");
        }
    });
});



$(document).on("change",".toggle",function() {
        if( $(this).is(":checked") ) {
            $(this).parents("li").addClass("completed");
        }
        else{
        $(this).parents("li").removeClass("completed");
        }

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


$(document).on("click","a[href='#/active']",function() {
    $('.toggle:checked').parents("li").hide();
    $('.toggle:not(:checked)').parents("li").show();
});

$(document).on("click","a[href='#/completed']",function() {
    $('.toggle:checked').parents("li").show();
    $('.toggle:not(:checked)').parents("li").hide();
});

$(document).on("click",".selected[href='#/']",function() {
    $('.toggle:checked').parents("li").show();
    $('.toggle:not(:checked)').parents("li").show();
});




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
