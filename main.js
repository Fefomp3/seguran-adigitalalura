const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?*&';
const forcaSenha = document.querySelector('.forca');


console.log(botoes)
campoSenha.ariaReadOnly = true;

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho(){
    if (tamanhoSenha > 6){
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho(){
    if (tamanhoSenha < 20){
       tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
for (i=0; i < checkbox.length;i++){
    checkbox[i].onclick = geraSenha;
}
campoSenha.value = letrasMaiusculas;



function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    console.log(entropia)
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
}



function geraSenha(){
    const tiposSelecionados = [
        { nome: 'maiusculo', caracteres: letrasMaiusculas },
        { nome: 'minusculo', caracteres: letrasMinusculas },
        { nome: 'numero', caracteres: numeros },
        { nome: 'simbolo', caracteres: simbolos }
    ].filter((tipo) => {
        const checkboxIndex = {
            maiusculo: 0,
            minusculo: 1,
            numero: 2,
            simbolo: 3
        }[tipo.nome];

        return checkbox[checkboxIndex].checked;
    });

    if (tiposSelecionados.length === 0) {
        campoSenha.value = '';
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        forcaSenha.classList.add('fraca');
        document.querySelector('.entropia').textContent = 'Selecione pelo menos um tipo de caractere.';
        return;
    }

    const alfabeto = tiposSelecionados.map((tipo) => tipo.caracteres).join('');
    const comprimentoMinimo = Math.max(tamanhoSenha, tiposSelecionados.length);

    let senha = tiposSelecionados.map((tipo) => {
        const indiceAleatorio = Math.floor(Math.random() * tipo.caracteres.length);
        return tipo.caracteres[indiceAleatorio];
    }).join('');

    while (senha.length < comprimentoMinimo) {
        const indiceAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[indiceAleatorio];
    }

    senha = senha.split('').sort(() => Math.random() - 0.5).join('');
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}
geraSenha();

botoes[2].onclick = geraSenha;

