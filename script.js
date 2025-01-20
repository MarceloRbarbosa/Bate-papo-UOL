let novaMensagem;
let usuario ={ name: ""};
let mensagem = {
  from:"",
  text:"",
  time:"",
  to:"",
  type:"",
 }
let ultimaMensagem = document.querySelector("ul").lastChild;

function conectado(){
  buscarMensagem();
  listaParticipantes();
  setInterval(buscarMensagem, 3000);
  setInterval(manterConexao, 5000);
  setInterval(listaParticipantes, 10000);
}

function entrarNaSala(){
  usuario.name = prompt("Informe seu apelido");
    let receberUsuario = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants/83822512-8a47-4e89-b945-ed0cdd69fa4b", usuario);
    receberUsuario.catch((erro)=>{
        if(erro.response.status === 400){
          alert("Este apelido já esta sendo usado, escolha outro");
          entrarNaSala();
       }
      }); 
      receberUsuario.then(conectado)
  }

  function manterConexao(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status/83822512-8a47-4e89-b945-ed0cdd69fa4b", usuario);
    }

    function enviarMensagem(){
      let mensagemEnviada = document.querySelector(".botao-msg input");
        mensagem.from = usuario.name;
        mensagem.text = mensagemEnviada.value;
        mensagemEnviada.value = "";
    
        if(mensagem.to === ""){
          mensagem.to = "todos";
        }
        if(mensagem.type === "" ){
          mensagem.type = "message";
        }

        let promessaMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages/83822512-8a47-4e89-b945-ed0cdd69fa4b", mensagem); 
         promessaMensagem.then(buscarMensagem);
         promessaMensagem.catch(erro); 
        }

function buscarMensagem(){
  let dadosMensagem = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages/83822512-8a47-4e89-b945-ed0cdd69fa4b");
   dadosMensagem.then(renderizarMensagens);
   dadosMensagem.catch(erro);
   }

 function renderizarMensagens(mensagens){
        novaMensagem = mensagens.data;
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    for(let i = 0; i < novaMensagem.length; i++){
      if(novaMensagem[i].type === "status"){
        let emissor = novaMensagem[i].from;
        let texto = novaMensagem[i].text;
        let horario = novaMensagem[i].time;
  
        ul.innerHTML += `
          <li class="status" data-identificador="mensagens">
                  <p><span class="horario">${horario}</span>
                  <span class="usuario">${emissor}</span> 
                  <span class="mensagem-enviada" > ${texto}</span>
              </li></p>`
      }
  
     else if(novaMensagem[i].type === "message"){
        let emissor = novaMensagem[i].from;
        let texto = novaMensagem[i].text;
        let horario = novaMensagem[i].time;
        let receptor = novaMensagem[i].to;
  
        ul.innerHTML += `
        <li class= "message" data-identificador="mensagens">
                  <p><span class="horario">${horario}</span>
                  <span class="usuario">${emissor}</span> 
                  <span class="mensagem-enviada" > ${texto}</span>para
                  <span class="usuario">${receptor}</span></p>
        `
      }
      else if (novaMensagem[i].type === "private_message"){
        let emissor = novaMensagem[i].from;
        let texto = novaMensagem[i].text;
        let horario = novaMensagem[i].time;
        let receptor = novaMensagem[i].to;

      if(usuario.name === receptor || usuario.name === emissor || usuario.name === "todos"){
        ul.innerHTML+=`<li class= "private_message" data-identificador="mensagens">
                 <p><span class="horario">${horario}</span>
                  <span class="usuario">${emissor}</span> 
                  <span class="mensagem-enviada" > ${texto}</span> reservadamente para
                  <span class="usuario">${receptor}</span></p>
        `
      }
    } 
   } 
  }


function abrirMenuLateral(){
  let elemento = document.querySelector(".menu-lateral");
  elemento.classList.toggle("escondido");
}

function selecionado(parametro){
  let destino = document.querySelector(".destino");
  let selecionar = document.querySelector(".selecionar-selected");
  let check = parametro.querySelector(".check");
  let selecionado = parametro.querySelector("span").innerHTML;

  if(selecionar !== null){
    selecionar.classList.remove("selecionar-selected");
  }
 
  check.classList.add("selecionar-selected");
  mensagem.to = selecionado;
  destino.innerHTML = `Enviando para ${mensagem.to} (Público)`;
  if(mensagem.type === "message"){
    destino.innerHTML = `Enviando para ${mensagem.to} (Público)`;
  }
  if(mensagem.type === "private_message"){
    destino.innerHTML =`Enviando para ${mensagem.to} (reservadamente)`;
  }
}

function destinatarios(destinatarios){
  let destino = document.querySelector(".destino");
  let selecionar = document.querySelector(".pm-selected");
  let check = destinatarios.querySelector(".check");
  let selecionado = destinatarios.querySelector("span").innerHTML;

if(selecionar !== null){
  selecionar.classList.remove("pm-selected");
}
check.classList.add("pm-selected");
destino.innerHTML = `Enviando para ${mensagem.to} (${selecionado})`

if( selecionado === "Público"){
  mensagem.type = "message";
}

if(selecionado === "Reservadamente"){
  mensagem.type = "private_message";
}
}

function listaParticipantes(){
  listaUsuarios = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants/83822512-8a47-4e89-b945-ed0cdd69fa4b");
  listaUsuarios.then(novosUsuarios);
  listaUsuarios.catch(erro);
  }




function novosUsuarios(parametro){
  const novoUsuario = parametro.data;
  let membros = document.querySelector(".lista-usuarios");
  if(mensagem.to !== "Todos"){
    membros.innerHTML = `<div onclick="selecionado(this)" data-atributos="marcado" class="selecionar">
                <ion-icon name="people"></ion-icon>
                <span>Todos</span>
                <ion-icon class="check"  name="checkmark"></ion-icon>
                </div>`
  }
else {
  membros.innerHTML = `<div onclick="selecionado(this)" data-atributos="marcado" class="selecionar">
                <ion-icon name="people"></ion-icon>
                <span>Todos</span>
                <ion-icon class="check" name="checkmark selecionar-selected"></ion-icon>
                </div>`
}
 for(let i = 0; i < novoUsuario.length; i++){
  if(novoUsuario[i].name !== usuario.name){
    membros.innerHTML += `<div onclick="selecionado(this)" class="selecionar">
                <ion-icon name="person-circle"></ion-icon>
                <span>${novoUsuario[i].name}</span>
                <ion-icon class="check"  name="checkmark"></ion-icon>
                </div>`
  }
  else {
    membros.innerHTML +=`<div onclick="selecionado(this)" class="selecionar">
                <ion-icon name="person-circle"></ion-icon>
                <span>${novoUsuario[i].name}</span>
                <ion-icon class="check"  name="checkmark selecionar-selected"></ion-icon>
                </div>`
  }
 }
}

function erro(erro){
  alert("Você foi desconetado");
  window.location.reload();
}


entrarNaSala()
