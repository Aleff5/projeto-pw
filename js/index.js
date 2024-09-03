const diaSemana = document.getElementById("dia");
const dataAtual = document.getElementById("data");
const horaAtual = document.getElementById("hora");

// Seleciona os elementos para o diálogo e o botão de bater ponto
const pontoDialog = document.getElementById("pontoDialog");
const baterPontoButton = document.querySelector(".Bater-ponto");
const fecharDialogButton = document.getElementById("fecharDialog");

// Seleciona os elementos dentro do diálogo para exibir a data e a hora
const dialogData = document.getElementById("dialogData");
const dialogHora = document.getElementById("dialogHora");

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
