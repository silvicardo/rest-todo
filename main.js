/**********************************************/
/**********************************************/
/***** PROGETTO: rest-todolist - main.js ******/
/**********************************************/
/**********************************************/

/*****************************/
/**********PROGRAMMA**********/
/*****************************/

$(document).ready(function() {

  console.log('rest-todolist');

  var baseUrl = 'http://157.230.17.132:3016/todos';

  //programma con CRUD completo con feedback ul

  // getAllTodos(printUlFrom);

   // newTodo('nuovaAggiunta3');
  // updateTodoBy('15', 'nuovo aggiornamento');
  // deleteTodoById('15');


  /**********************************/
  /*************FUNZIONI*************/
  /**********************************/

  //READ
  function getAllTodos(successCallback) {
    ajaxCall(baseUrl, 'GET', successCallback);
  }

  //READ by Id
  function getTodoBy(id, successCallback) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'GET', successCallback);
  }

  //CREATE
  function newTodo(todoText) {
    ajaxCall(baseUrl, 'POST', printUlFrom , { text: todoText });
  }

  //UPDATE by Id

  function updateTodoBy(id, todoText) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'PUT', printUlFrom , { text: todoText });
  }
//   accumulator[index][key] = value;
  //DELETE by Id

  function deleteTodoById(id) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'DELETE', printUlFrom );
  }


  //MAIN AJAX FUNCTION
  function ajaxCall(url, method, successCallback, data) {

    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function (apiData) {
        console.log('API RETURNS');
        console.log(method + ' request OK');

        if (method !== 'GET') {
          console.log('UPDATED TODOLIST');
          ajaxCall(baseUrl, 'GET', successCallback);
         } else {
          successCallback(apiData , '#todolist', method);
         }
      },

      fail: function(error) {
        console.log(error);
      },
    });

  }

  function printUlFrom(todos, ulSelector, method) {

      var ulInnerHtml = todos.reduce(function (acc, todo) {
        return acc += '<li class="todo ' + todo.id + '"><span>' + todo.id + '</span> - ' + todo.text + '</li>';
      }, '');

      $(ulSelector).html(ulInnerHtml);


  }

});
