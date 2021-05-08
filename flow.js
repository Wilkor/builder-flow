
function createFlow() {


  let flow = {
     respostas:[$('#my-profile').serializeJSON()]
  }
  console.log(flow)
  if(localStorage.getItem('flow')){

  let obj = JSON.parse(localStorage.getItem('flow'));
    obj.respostas.push(flow.respostas[0]);
    localStorage.setItem('flow', JSON.stringify(obj));

  } else {

    localStorage.setItem('flow',JSON.stringify(flow));
  }

  alert('Flow adicionado')
  let newFlow = localStorage.getItem('flow')

  document.getElementById("flow-json").innerHTML = "<pre><code>" + JSON.stringify(JSON.parse(newFlow), undefined,2) + "</code></pre>"


}

function deleteFlow(){

  localStorage.removeItem('flow')

  document.getElementById("flow-json").innerHTML =" "

  alert("Flow deletado com sucesso")
}

$(document).ready(function() {
  var max_fields = 10;
  var wrapper = $(".container1");
  var add_button = $(".add_form_field");

  var x = 1;
  $(add_button).click(function(e) {
      e.preventDefault();
      if (x < max_fields) {
          x++;
          $(wrapper).append(`

      <div id="inputs">
          <input class="form-control" type="text"  name="inputs[]" value="${x}"/>
          <a href="#" class="delete"><img  class="add_form_field"  src="img/dash-circle-fill.svg" width="25px" style="cursor: pointer;"/>
          </a>
      </div>
         `); //add input box
      } else {
          alert('chegou ao limite')
      }
  });

  $(wrapper).on("click", ".delete", function(e) {
      e.preventDefault();
      $(this).parent('div').remove();
      x--;
  })
});

$(document).ready(function() {
  var max_fields = 10;
  var wrapper = $(".container2");
  var add_button = $(".add_form_field_2");

  var x = 1;
  $(add_button).click(function(e) {
      e.preventDefault();
      if (x < max_fields) {
          x++;
          $(wrapper).append(`<div id="inputs"><input class="form-control" type="text" name="inputText[]" placeholder="inputText" /><a href="#" class="delete"><img  class="add_form_field"  src="img/dash-circle-fill.svg" width="25px" style="cursor: pointer;"/></a></div>`); //add input box
      } else {
          alert('chegou ao limite')
      }
  });

  $(wrapper).on("click", ".delete", function(e) {
      e.preventDefault();
      $(this).parent('div div div').remove();
      x--;
  })
});


$(document).ready(function() {

  
  var max_fields = 10;
  var wrapper = $(".container3");
  var add_button = $(".add_form_field_3");

  var x = 1;
  carregarRecursos(x)

  $(add_button).click(function(e) {
      
      e.preventDefault();
      if (x < max_fields) {
        x++;
        $(wrapper).append(`<div ><br>
        <input class="form-control" type="text" name="resposta[][id]" value="${x}"/>
        <input class="form-control" type="text" name="resposta[][resposta]" value="" placeholder="resposta" />
        <input class="form-control" type="text" name="resposta[][tracking]" value="" placeholder="tracking" />
        <input class="form-control" type="text" name="resposta[][time]" value=""  placeholder="time"/>
        <select class="form-control" name="resposta[][tipo]">
        <option value="application/vnd.lime.select+json">Menu</option>
        <option value="text/plain" selected>Texto</option>
        </select>
        <input class="form-control" type="text" name="resposta[][cabecalho]" value=""  placeholder="cabecalho"/>
        <select class="form-control" name="resposta[][opcoesDeMenu]" id="opcoesDeMenu-${x}">
        <option value="{{resource.pergunta_algo_mais_menu}}">{{resource.pergunta_algo_mais_menu}}
        </option>
        </select>
        <select class="form-control" name="resposta[][estadoDestino]" id="selEstadoDestino-${x}">
        <option value="nps">nps</option>
        <option value="pergunta_algo_mais_menu">pergunta_algo_mais_menu</option>
        <option value="verifica_horario">verifica_horario</option>
        </select>
        <a href="#" class="delete"><img  class="add_form_field"  src="img/dash-circle-fill.svg" width="25px" style="cursor: pointer;"/></a></div>`);
        carregarRecursos('button', x)
      } else {
          alert('chegou ao limite')
      }

      
      
  });


  $(wrapper).on("click", ".delete", function(e) {
      e.preventDefault();
      $(this).parent('div').remove();
      x--;
  })
});

function carregarRecursos(origin, x) {

  let key = document.getElementById('key').value;

  if(origin != 'button'){
    x = 1
  }

  let payload = {

    "id":'123',
    "method": "get",
    "uri": "/resources?$take=100000"
    }

  $.ajax({
    type: "POST",
    dataType: 'json',
    url: 'https://http.msging.net/commands',
    crossDomain: true,
    async: false,
    contentType: "application/json; charset=utf-8",
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', key);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);

    },
    success: function (result) {

    var data = result.resource.items;

    var list = [];

      data.forEach((e, index) => {

       var idx = index + 1;

       $(`#selEstado option[value=${e}]`).remove();
       $(`#selEstadoDestino-${x} option[value=${e}]`).remove();
       $(`#selEstadoDestino2 option[value=${e}]`).remove();

        list.push({id: idx, name: e})

      })

      
      list.forEach((e) => {
      
        $('#selEstado').append(`<option value="${e.name}">${e.name}</option>`);
        $(`#selEstadoDestino-${x}`).append(`<option value="${e.name}">${e.name}</option>`);
        $(`#selEstadoDestino2`).append(`<option value="${e.name}">${e.name}</option>`);
        $(`#opcoesDeMenu2`).append(`<option value="{{resource.${e.name}}}">{{resource.${e.name}}}</option>`);
        $(`#selCabecalho2`).append(`<option value="{{resource.${e.name}}}">{{resource.${e.name}}}</option>`);
        $(`#opcoesDeMenu-${x}`).append(`<option value="{{resource.${e.name}}}">{{resource.${e.name}}}</option>`);
      })
    
    },
    data: JSON.stringify(payload)
});


}