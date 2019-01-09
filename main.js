/**********************************************/
/**********************************************/
/***** PROGETTO: rest-todolist - main.js ******/
/**********************************************/
/**********************************************/

/*****************************/
/**********PROGRAMMA**********/
/*****************************/

$(document).ready(function () {

  console.log('rest-todolist');

  var baseUrl = 'http://157.230.17.132:3016/todos';

  //programma con CRUD completo con interazione utente

  getAllTodos(printUlFrom);

  $('#nuovoTodo').click(function () {
    var testoUtente = $('input').val();
    if (testoUtente !== '') {
      newTodo(testoUtente);
    }
  });

  $(document).on('click', '.modifica', function () {
    var id = $(this).parent().find('span').html();
    var nuovoTesto = prompt('Nuovo testo modificato');
    updateTodoBy(id, nuovoTesto);
  });

  $(document).on('click', '.elimina', function () {
    var id = $(this).parent().find('span').html();
    deleteTodoById(id);
  });

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
    ajaxCall(baseUrl, 'POST', printUlFrom, { text: todoText });
  }

  //UPDATE by Id

  function updateTodoBy(id, todoText) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'PUT', printUlFrom, { text: todoText });
  }

  //DELETE by Id

  function deleteTodoById(id) {
    var completeUrl = baseUrl + '/' + id;
    ajaxCall(completeUrl, 'DELETE', printUlFrom);
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
          successCallback(apiData, '#todolist', method);
        }
      },

      fail: function (error) {
        console.log(error);
      },
    });

  }

  function printUlFrom(todos, ulSelector, method) {

    var btnModifica = '<button class="modifica" type="button" name="button">Modifica</button>';
    var btnElimina = '<button class="elimina" type="button" name="button">Elimina</button>';

    var ulInnerHtml = todos.reduce(function (acc, todo) {
      return acc += '<li class="todo ' + todo.id + '"><span>' + todo.id + '</span> - ' + todo.text + btnModifica + btnElimina + '</li>';
    }, '');

    $(ulSelector).html(ulInnerHtml);

  }

});
