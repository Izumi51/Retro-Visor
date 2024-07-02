window.onload = iniciar; // Registra os eventos quando a página é carregada

var linhas, colunas, bombas, matriz, tabela;

// Função para gerar a matriz inicial preenchida com zeros
function gerarMatriz(l, c) {
    matriz = []; // Inicializa a matriz como um array vazio
    for (var i = 0; i < l; i++) {
        matriz[i] = new Array(c).fill(0); // Preenche cada linha da matriz com zeros
    }
}

// Função para gerar a tabela HTML baseada na matriz
function gerarTabela(l, c) {
    gerarMatriz(l, c); // Chama a função para gerar a matriz
    var str = ""; // Inicializa a string que vai armazenar o HTML da tabela
    for (var i = 0; i < l; i++) {
        str += "<tr>"; // Abre uma nova linha da tabela
        for (var j = 0; j < c; j++) {
            str += "<td class='blocked'></td>"; // Adiciona uma célula bloqueada
        }
        str += "</tr>"; // Fecha a linha da tabela
    }
    tabela.innerHTML = str; // Define o HTML da tabela
}

// Função para mostrar a matriz no HTML
function mostrarMatriz() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) {
                tabela.rows[i].cells[j].innerHTML = "&#128163;"; // Emoji de bomba
            } else {
                tabela.rows[i].cells[j].innerHTML = matriz[i][j]; // Número de bombas ao redor
            }
        }
    }
}

// Função para gerar bombas na matriz
function gerarBombas() {
    for (var i = 0; i < bombas;) {
        var linha = Math.floor((Math.random() * linhas)); // Gera uma linha aleatória
        var coluna = Math.floor((Math.random() * colunas)); // Gera uma coluna aleatória
        if (matriz[linha][coluna] === 0) { // Verifica se a célula está vazia
            matriz[linha][coluna] = -1; // Define a célula como uma bomba
            i++; // Incrementa o contador de bombas
        }
    }
}

// Função para calcular o número de bombas ao redor de uma célula
function gerarNumero(l, c) {
    var count = 0; // Inicializa o contador de bombas
    for (var i = l - 1; i <= l + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) { // Verifica se a célula está dentro dos limites
                if (matriz[i][j] === -1) { // Verifica se a célula é uma bomba
                    count++; // Incrementa o contador de bombas
                }
            }
        }
    }
    matriz[l][c] = count; // Define o número de bombas ao redor na célula
}

// Função para gerar os números na matriz
function gerarNumeros() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] !== -1) { // Verifica se a célula não é uma bomba
                gerarNumero(i, j); // Calcula o número de bombas ao redor
            }
        }
    }
}

// Função para marcar/desmarcar uma bandeira em uma célula
function bandeira(event) {
    var cell = event.target; // Obtém a célula clicada
    if (cell.className === "blocked") {
        cell.className = "flag"; // Marca a célula como bandeira
        cell.innerHTML = "&#128681;"; // Emoji de bandeira
    } else
    {
        if (cell.className === "flag") {
            cell.className = "blocked"; // Desmarca a célula como bandeira
            cell.innerHTML = ""; // Remove o emoji de bandeira
        }
    }
        return false; // Prevenir o menu de contexto padrão
}

// Função de inicialização do jogo
function iniciar() {
    tabela = document.getElementById("tabela"); // Obtém a tabela do HTML
    tabela.onclick = verificar; // Define a função de clique esquerdo
    tabela.oncontextmenu = bandeira; // Define a função de clique direito
    
    linhas = 12;
    colunas = 12;
    bombas = 22;
    
    gerarTabela(linhas, colunas); // Gera a tabela
    gerarBombas(); // Gera as bombas
    gerarNumeros(); // Gera os números
}

// Função para limpar células ao redor de uma célula clicada
function limparCelulas(l, c) {
    for (var i = l - 1; i <= l + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) { // Verifica se a célula está dentro dos limites
                var cell = tabela.rows[i].cells[j]; // Obtém a célula do HTML
                if (cell.className !== "blank") {
                    switch (matriz[i][j]) {
                        case -1:
                            break;
                        case 0:
                            cell.innerHTML = "";
                            cell.className = "blank";
                            limparCelulas(i, j); // Limpa células ao redor
                            break;
                        default:
                            cell.innerHTML = matriz[i][j];
                            cell.className = "n" + matriz[i][j]; // Define a classe baseada no número
                    }
                }
            }
        }
    }
}

// Função para mostrar todas as bombas na tabela
function mostrarBombas() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) { // Verifica se a célula é uma bomba
                var cell = tabela.rows[i].cells[j]; // Obtém a célula do HTML
                cell.innerHTML = "&#128163;"; // Emoji de bomba
                cell.className = "blank";
            }
        }
    }
}

// Função para verificar o clique do usuário em uma célula
function verificar(event) {
    var cell = event.target; // Obtém a célula clicada
    if (cell.className !== "flag") { // Verifica se a célula não está marcada com bandeira
        var linha = cell.parentNode.rowIndex;
        var coluna = cell.cellIndex;
        switch (matriz[linha][coluna]) {
            case -1:
                mostrarBombas(); // Mostra todas as bombas
                cell.style.backgroundColor = "red"; // Destaca a célula clicada
                tabela.onclick = undefined; // Desativa os eventos de clique
                tabela.oncontextmenu = undefined; // Desativa os eventos de clique direito
                alert("Você perdeu!"); // Exibe uma mensagem de derrota
                break;
            case 0:
                limparCelulas(linha, coluna); // Limpa as células ao redor
                break;
            default:
                cell.innerHTML = matriz[linha][coluna]; // Exibe o número de bombas ao redor
                cell.className = "n" + matriz[linha][coluna]; // Define a classe baseada no número
        }
        fimDeJogo(); // Verifica se o jogo terminou
    }
}

// Função para verificar se o jogo terminou
function fimDeJogo() {
    var cells = document.querySelectorAll(".blocked, .flag"); // Obtém todas as células bloqueadas ou marcadas com bandeira
    if (cells.length === bombas) { // Verifica se todas as bombas foram encontradas
        mostrarBombas(); // Mostra todas as bombas
        tabela.onclick = undefined; // Desativa os eventos de clique
        tabela.oncontextmenu = undefined; // Desativa os eventos de clique direito
    }
}