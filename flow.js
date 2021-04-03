
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

  alert('Flow adicionando')
  let newFlow = localStorage.getItem('flow')

  document.getElementById("flow-json").innerHTML = "<pre><code>" + JSON.stringify(JSON.parse(newFlow), undefined,2) + "</code></pre>"


}

function deleteFlow(){

  localStorage.removeItem('flow')

  document.getElementById("flow-json").innerHTML =" "

  alert("Flow deletado com sucesso")
}