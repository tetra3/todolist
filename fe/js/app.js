(function (window) {
	'use strict';
})(window);



$(document).ready(function() {
    $.ajax({
    url: "/api/todos",
    type:"GET"

    }).done(function(result) {
      for(index in result) {
      $('.todo-list').append("<li><div><input class='toggle' type='checkbox'></input><label>"+result[index].todo+"</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");

          }
       });


    $('.new-todo').keypress(function(key) {
        if (key.keyCode == 13) {
            console.log("엔터키가 눌릴때마다 DB에 데이터를 삽입할 예정");
            $.ajax({
                url: "/api/todos",
                type:"POST",
                data:{'todo': $('.new-todo').val()}

                }).done(function() {
                    $('.new-todo').val('');
                    $.ajax({
                url: "/api/todos",
                type:"GET",
                }).done(function(result) {
                  $('.todo-list').append("<li><div><input class='toggle' type='checkbox'></input><label>"+result[result.length-1].todo+"</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");

                });
            });
        }
    });

});

$(document).on("click",".toggle",function() {
    alert("click");
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