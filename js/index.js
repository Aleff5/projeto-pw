const diaSemana = document.getElementById("dia");
const dataAtual = document.getElementById("data");
const horaAtual = document.getElementById("hora");

// Seleciona os elementos para o diálogo e o botão de bater ponto
const pontoDialog = document.getElementById("pontoDialog");
const baterPontoButton = document.querySelector(".Bater-ponto");
const fecharDialogButton = document.getElementById("fecharDialog");
const pontoAcao = document.getElementById("pontoAcao");
const confirmarAcao = document.getElementById("confirmarAcao");

// Elementos para a confirmação visual
const confirmacaoPonto = document.getElementById("confirmacaoPonto");
const mensagemConfirmacao = document.getElementById("mensagemConfirmacao");

let dialogInterval;

// Atualiza o dia da semana
const diasDaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
function getDayOfWeek() {
    const date = new Date();
    return diasDaSemana[date.getDay()];
}

diaSemana.textContent = getDayOfWeek();
dataAtual.textContent = getCurrentDate(false);  // false para formato padrão dd/mm/yyyy
horaAtual.textContent = getCurrentTime();

// Função para gerar um ID aleatório
function generateId() {
    return Math.floor(Math.random() * 100000);
}

// Função para obter a localização atual (fake ou API real)
function getLocation() {
    return "Latitude: -23.5505, Longitude: -46.6333"; // Exemplo fixo de localização (São Paulo)
}

// Função para criar um objeto de ponto
function criarObjetoPonto(acao) {
    const pontoInfo = {
        id: generateId(),
        tipo: acao, // Entrada, Intervalo, Volta Intervalo, Saída
        data: getCurrentDate(false),
        hora: getCurrentTime(),
        localizacao: getLocation(),
    };
    
    // Salva o ponto no localStorage
    salvarPontoNoLocalStorage(pontoInfo);
    
    return pontoInfo;
}

// Função para salvar o ponto no localStorage
function salvarPontoNoLocalStorage(pontoInfo) {
    // Recupera os pontos existentes do localStorage ou inicializa um array vazio se não houver nenhum
    let pontos = JSON.parse(localStorage.getItem('pontos')) || [];

    // Adiciona o novo ponto à lista
    pontos.push(pontoInfo);

    // Salva a lista atualizada de pontos no localStorage
    localStorage.setItem('pontos', JSON.stringify(pontos));
}

// Função para exibir a confirmação visual ao usuário
function exibirConfirmacao(pontoInfo) {
    mensagemConfirmacao.textContent = `Ponto registrado com sucesso! 
    ID: ${pontoInfo.id}, 
    Tipo: ${pontoInfo.tipo}, 
    Data: ${pontoInfo.data}, 
    Hora: ${pontoInfo.hora}, 
    Localização: ${pontoInfo.localizacao}`;
    
    confirmacaoPonto.classList.remove("oculto");
    confirmacaoPonto.classList.add("visivel");

    // Remove a mensagem de confirmação após 5 segundos
    setTimeout(() => {
        confirmacaoPonto.classList.remove("visivel");
        confirmacaoPonto.classList.add("oculto");
    }, 5000);
}

// Abre o diálogo e começa a atualizar dinamicamente a data e a hora
baterPontoButton.addEventListener('click', () => {
    // Atualiza a data e hora dentro do diálogo
    dialogData.textContent = "Data: " + getCurrentDate(false);
    dialogHora.textContent = "Hora: " + getCurrentTime();

    pontoDialog.showModal(); // Abre o diálogo como modal

    // Atualiza dinamicamente a data e a hora a cada segundo dentro do diálogo
    dialogInterval = setInterval(() => {
        dialogData.textContent = "Data: " + getCurrentDate(false);
        dialogHora.textContent = "Hora: " + getCurrentTime();
    }, 1000);
});

// Fecha o diálogo e para de atualizar a data e hora
fecharDialogButton.addEventListener('click', () => {
    pontoDialog.close(); // Fecha o diálogo
    clearInterval(dialogInterval); // Para a atualização dinâmica
});

// Ao clicar no botão confirmar, realiza a ação selecionada
confirmarAcao.addEventListener('click', () => {
    const acaoSelecionada = pontoAcao.value;

    // Cria o objeto de ponto
    const pontoInfo = criarObjetoPonto(acaoSelecionada);

    // Loga o objeto de ponto no console
    console.log("Ponto registrado:", pontoInfo);

    // Exibe a confirmação visual
    exibirConfirmacao(pontoInfo);

    // Fecha o diálogo após confirmar a ação
    pontoDialog.close();
    clearInterval(dialogInterval);
});

// Atualiza a hora em tempo real na página principal
setInterval(() => {
    horaAtual.textContent = getCurrentTime();
}, 1000);

let usTime = false;

function arrumaMes() {
    const date = new Date();
    let mesMaisUm = date.getMonth() + 1;
    return mesMaisUm < 10 ? "0" + mesMaisUm : mesMaisUm;
}

function arrumaDataParaUs() {
    const date = new Date();
    return arrumaMes() + "/" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "/" + date.getFullYear();
}

function getCurrentDate(ustime) {
    const date = new Date();
    let dia = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    if (ustime) {
        return arrumaDataParaUs();
    }
    return dia + "/" + arrumaMes() + "/" + date.getFullYear();
}

function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

// Recupera os pontos do localStorage e exibe no console
function exibirPontosSalvos() {
    const pontos = JSON.parse(localStorage.getItem('pontos')) || [];
    console.log("Pontos salvos:", pontos);
}

// Chame esta função para exibir os pontos salvos
exibirPontosSalvos();

// Função para exibir a confirmação visual ao usuário
function exibirConfirmacao(pontoInfo) {
    mensagemConfirmacao.textContent = "Ponto batido com sucesso"; // Mensagem simplificada
    
    confirmacaoPonto.classList.remove("oculto");
    confirmacaoPonto.classList.add("visivel");

    // Remove a mensagem de confirmação após 5 segundos
    setTimeout(() => {
        confirmacaoPonto.classList.remove("visivel");
        confirmacaoPonto.classList.add("oculto");
    }, 5000);
}

