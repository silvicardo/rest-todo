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

  //programma con CRUD completo con feedback tramite console log

  getAllTodos(console.log);

  // newTodo('nuovaAggiunta2');
  // updateTodoBy('3', 'nuovo aggiornamento');
  // deleteTodoById('3');


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
    ajaxCall(baseUrl, 'POST', console.log, { text: todoText });
  }

  //UPDATE by Id

  function updateTodoBy(id, todoText) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'PUT', console.log, { text: todoText });
  }

  //DELETE by Id

  function deleteTodoById(id) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'DELETE', console.log);
  }


  //MAIN AJAX FUNCTION
  function ajaxCall(url, method, successCallback, data) {

    $.ajax({
      url: url,
      method: method,
      data: data,
      success: function(apiData) {
        console.log('API RETURNS');
        console.log(method + ' request OK');
         successCallback.apply(console, apiData);

         if (method !== 'GET') {
           console.log('UPDATED TODOLIST');
           ajaxCall(baseUrl, 'GET', console.log);
         }
      },

      fail: function(error) {
        console.log(error);
      },
    });
  }


});
