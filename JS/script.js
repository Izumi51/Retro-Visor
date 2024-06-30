// Função para verificar se a resposta de uma pergunta está correta
function verificar(questionId, questionName, idParagraphHidden)
{
    var correctAnswers = {
        pergunta1: 'a',
        pergunta2: 'c',
        pergunta3: 'a',
        pergunta4: 'b',
        pergunta5: 'b'
    };

    var radios = document.getElementsByName(questionName);
    var isCorrect = false;

    // Verificar se a resposta selecionada está correta
    for (var i = 0; i < radios.length; i++) 
    {
        if (radios[i].checked) 
        {
            if (radios[i].value === correctAnswers[questionName]) 
            {
                isCorrect = true;
                break;
            }
        }
    }

    var questionContainer = document.getElementById(questionId);
    var paragraphHidden = document.getElementById(idParagraphHidden);
    if (isCorrect) 
    {
        questionContainer.style.backgroundColor = 'lightgreen'; // Cor de fundo verde para resposta correta
        questionContainer.style.color = '#141a22'; // Cor de fundo verde para resposta correta
        
    } 
    else 
    {
        questionContainer.style.backgroundColor = 'lightcoral'; // Cor de fundo vermelha para resposta incorreta
        questionContainer.style.color = '#000000'; // Cor de fundo vermelha para resposta incorreta
        paragraphHidden.innerHTML = 'Resposta correta: ' + correctAnswers[questionName];
        //questionContainer.innerHTML += "<p>RESPOSTA: " + correctAnswers[questionName] + "<p>"; 
    }
}

// Função para verificar todas as perguntas
function verificarTodas() {
    verificar('question1', 'pergunta1', 'pHidden1');
    verificar('question2', 'pergunta2', 'pHidden2');
    verificar('question3', 'pergunta3', 'pHidden3');
    verificar('question4', 'pergunta4', 'pHidden4');
    verificar('question5', 'pergunta5', 'pHidden5');
}

function resestFormChanges(){
    // Reset do formulário para remover as cores de fundo das perguntas
    var questionContainers = document.getElementsByClassName('question-container');
    var pHidden = document.getElementsByClassName('rest-resposta');
    for (var i = 0; i < questionContainers.length; i++) 
    {
        pHidden[i].innerHTML = '';
        questionContainers[i].style.backgroundColor = '';
        questionContainers[i].style.color = '#ffffff';
    }
}