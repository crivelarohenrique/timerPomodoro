//variaveis
const html = document.querySelector('html')

//botões 
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
//interface paginas
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
//interface startPause
const startPauseBotao = document.querySelector('#start-pause')
const textoComeçarPausar = document.querySelector('#start-pause span')
const imagemComeçarPausar = document.querySelector('.app__card-primary-butto-icon')
//audios
//musica
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/let-it-happen.mp3')
musica.loop = true
//audioTemporizador
const beepTemporizadorZero = new Audio('./sons/beep.mp3')
const beepTemporizadorPause = new Audio('./sons/pause.mp3')
const beepTemporizadorPlay = new Audio('./sons/play.wav')
//variaveis temporizador 
let tempoDeccoridoEmSegundos = 1500
let intervaloId = null
const tempoNaTela = document.querySelector('#timer')
//imagens
const pauseImagem = './imagens/pause.png'
const playImagem = './imagens/play_arrow.png'

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
    musica.play()
} else { musica.pause()
}})

//funções botões
focoBotao.addEventListener('click', () => {
    tempoDeccoridoEmSegundos = 1500
   alterarContexto('foco')
   focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
    tempoDeccoridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
    
})

longoBotao.addEventListener('click', () => {
    tempoDeccoridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})

//função alteração da interface

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        mostrarTempo()
        zerarSemSom()
        imagemComeçarPausar.src = playImagem
        contexto.classList.remove('active')
        })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        
        case 'descanso-curto':
            
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDeccoridoEmSegundos <= 0){
        //beepTemporizadorZero.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDeccoridoEmSegundos -= 1
    mostrarTempo()
}

function iniciarPause() {
    if(intervaloId){
        zerar()
        textoComeçarPausar.textContent = "Começar"
        return
    }
    intervaloId =  setInterval(contagemRegressiva, 1000)
    beepTemporizadorPlay.play()
    textoComeçarPausar.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    beepTemporizadorPause.play()
}

function zerarSemSom() {
    clearInterval(intervaloId)
    intervaloId = null
}

startPauseBotao.addEventListener('click', iniciarPause)
startPauseBotao.addEventListener('click', trocarImagemPause)

function trocarImagemPause(){
    if(intervaloId == null){
        imagemComeçarPausar.src = playImagem; 
    } else {
        imagemComeçarPausar.src = pauseImagem;
    }
}

function mostrarTempo() {
    const tempo = new Date(tempoDeccoridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML  = `${tempoFormatado}`
}

mostrarTempo()
