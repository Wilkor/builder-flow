
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
  $(add_button).click(function(e) {
      e.preventDefault();
      if (x < max_fields) {
          x++;
          $(wrapper).append(`<div ><br>
          <input class="form-control" type="text" name="resposta[][id]" value="${x}"/>
          <input class="form-control" type="text" name="resposta[][resposta]" value="" placeholder="resposta" />
          <input class="form-control" type="text" name="resposta[][tracking]" value="" placeholder="tracking" />
          <input class="form-control" type="text" name="resposta[][time]" value=""  placeholder="time"/>
          <input class="form-control" type="text" name="resposta[][tipo]" value=""  placeholder="tipo"/>
          <input class="form-control" type="text" name="resposta[][cabecalho]" value=""  placeholder="cabecalho"/>
          <input class="form-control" type="text" name="resposta[][cabecalhoInvalido]" value="" placeholder="cabecalhoInvalido" />
          <input class="form-control" type="text" name="resposta[][opcoesDeMenu]" value=""  placeholder="opcoesDeMenu"/>
          <input class="form-control" type="text" name="resposta[][estadoDestino]" value="" placeholder="estadoDestino" />
          <a href="#" class="delete"><img  class="add_form_field"  src="img/dash-circle-fill.svg" width="25px" style="cursor: pointer;"/></a></div>`);
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
