alert("Seja bem vindo ao jogo da memória");

const carta = document.querySelectorAll('.carta');

var virouCarta = false, primeiraCarta, segundaCarta, bloqueio = false;

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => start();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input > 10 ? input : `0${input}`;
}

function virarCarta(){
	if (bloqueio) return;
  
	this.classList.add('flip');
	if (!virouCarta){
	virouCarta = true;
	primeiraCarta = this;
	return;
	
  }
	segundaCarta = this;
  virouCarta = false;
  
  if (primeiraCarta === segundaCarta){
    virouCarta = true;
    return;
  }

  checarIguais();
}

function checarIguais() {
  if (primeiraCarta.dataset.framework === segundaCarta.dataset.framework){
    disabilitarCarta();
    alert("Parabéns! Você encontrou um par.");
    return;
  }
  voltarCartas();
  alert("Não foi dessa vez! Tente novamente.");
}

function disabilitarCarta() {
  primeiraCarta.removeEventListener('click', virarCarta);
  segundaCarta.removeEventListener('click', virarCarta);
}

function voltarCartas() {
  bloqueio = true;
  setTimeout(() => {
    primeiraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');

    bloqueio = false;
  }, 1000);
}

(function shuffle() {
   carta.forEach(carta => {
     let ramdomPos = Math.floor(Math.random() * 12);
     carta.style.order = ramdomPos;
   });
 	 })();

carta.forEach(carta => carta.addEventListener('click', virarCarta));