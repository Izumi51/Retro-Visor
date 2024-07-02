// Função para verificar todas as perguntas
function verificarTodas() {
    verificar('question1', 'pergunta1', 'pHidden1');
    verificar('question2', 'pergunta2', 'pHidden2');
    verificar('question3', 'pergunta3', 'pHidden3');
    verificar('question4', 'pergunta4', 'pHidden4');
    verificar('question5', 'pergunta5', 'pHidden5');
}

// Função para verificar se a resposta de uma pergunta está correta
function verificar(perguntaId, perguntaName, idParagraphHidden)
{
    var respotasCertas = {
        pergunta1: 'a',
        pergunta2: 'c',
        pergunta3: 'a',
        pergunta4: 'b',
        pergunta5: 'b'
    };

    var radios = document.getElementsByName(perguntaName);
    var certo = false;

    // Verificar se a resposta selecionada está correta
    for (var i = 0; i < radios.length; i++) 
    {
        if (radios[i].checked) 
        {
            if (radios[i].value === respotasCertas[perguntaName]) 
            {
                certo = true;
                break;
            }
        }
    }

    var perguntaContainer = document.getElementById(perguntaId);
    var paragraphHidden = document.getElementById(idParagraphHidden);
    if (certo) 
    {
        perguntaContainer.style.backgroundColor = 'lightgreen'; // Cor de fundo verde para resposta correta
        perguntaContainer.style.color = '#141a22'; // Cor de fundo verde para resposta correta
        
    } 
    else 
    {
        perguntaContainer.style.backgroundColor = 'lightcoral'; // Cor de fundo vermelha para resposta incorreta
        perguntaContainer.style.color = '#000000'; // Cor de fundo vermelha para resposta incorreta
        paragraphHidden.innerHTML = 'Resposta correta: ' + respotasCertas[perguntaName];
        //perguntaContainer.innerHTML += "<p>RESPOSTA: " + respotasCertas[perguntaName] + "<p>"; 
    }
}

function resestFormChanges(){
    // Reset do formulário para remover as cores de fundo das perguntas
    var perguntaContainers = document.getElementsByClassName('question-container');
    var pHidden = document.getElementsByClassName('rest-resposta');
    for (var i = 0; i < perguntaContainers.length; i++) 
    {
        pHidden[i].innerHTML = '';
        perguntaContainers[i].style.backgroundColor = '';
        perguntaContainers[i].style.color = '#ffffff';
    }
}