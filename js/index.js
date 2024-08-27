const diaSemana = document.getElementById("dia");
const dataAtual = document.getElementById("data");
const horaAtual = document.getElementById("hora");

diaSemana.textContent = "Terça-Feira";
dataAtual.textContent = getCurrentDate();


function arrumaMes() {
    const date = new Date();
    mesMenosUm = date.getMonth();
    mesMaisUm = mesMenosUm + 1
    if (mesMaisUm < 10){
        return "0" + mesMaisUm
    }
    return mesMaisUm

}

function getCurrentDate(){
    const date = new Date();
    return date.getDate() + "/" + arrumaMes() + "/" + date.getFullYear();
}

console.log(date.getDay());
console.log(date.getDate());
console.log(date.getMonth());
console.log(date.getFullYear());