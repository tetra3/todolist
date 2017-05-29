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

$(document).on("change",".toggle",function() {
    if( $(this).is(":checked") ) {
        $(this).parents("li").addClass("completed");
    }
    else{
    $(this).parents("li").removeClass("completed");
    }
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







// $('.todo-list').append("<li><div><input class='toggle' type='checkbox'></input><label>DB에서 불러오자</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");



// <li class="completed">
//     <div class="view">
//         <input class="toggle" type="checkbox" checked>
//         <label>이걸 바꿔야 하나</label>
//         <button class="destroy"></button>
//     </div>
//     <input class="edit" value="Create a TodoMVC template">
// </li>