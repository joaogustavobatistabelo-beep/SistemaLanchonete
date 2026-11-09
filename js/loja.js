// ============================================================
// SISTEMA DE LANCHONETE - Caixa simplificado
// Interação somente com prompt(), confirm() e alert()
// ============================================================

// ---------- Arrays obrigatórios ----------
var nomesProdutos = [];  // nomes dos produtos cadastrados
var precosProdutos = []; // preços (mesmo índice de nomesProdutos)
var totaisVendas = [];   // valor final de cada venda concluída

// ---------- Funções auxiliares ----------

// Converte o texto digitado em número, aceitando vírgula como separador decimal.
// Retorna NaN se o texto não for um número válido.
function converterParaNumero(texto) {
    return parseFloat(texto.replace(",", "."));
}

// Formata um valor monetário com duas casas decimais (ex.: "R$ 12.50").
function formatarMoeda(valor) {
    return "R$ " + valor.toFixed(2);
}

// Verifica se já existe um produto com o nome informado (ignora maiúsculas/minúsculas).
// Retorna true se existir e false caso contrário.
function produtoJaExiste(nome) {
    for (var i = 0; i < nomesProdutos.length; i++) {
        if (nomesProdutos[i].toLowerCase() === nome.toLowerCase()) {
            return true;
        }
    }
    return false;
}

// Monta o texto com a lista de produtos (código, nome e preço).
function montarListaProdutos() {
    var texto = "";
    for (var i = 0; i < nomesProdutos.length; i++) {
        // O código do produto é a posição no array + 1
        texto += (i + 1) + " - " + nomesProdutos[i] + " - " + formatarMoeda(precosProdutos[i]) + "\n";
    }
    return texto;
}

// ---------- Funções obrigatórias ----------

// Tipo 3: sem parâmetros e COM retorno... (ver obterTotalVendasDia)
// Tipo 1: sem parâmetros e SEM retorno
// Solicita nome e preço e armazena nos arrays, validando as regras.
function cadastrarProduto() {
    var nome = prompt("Digite o nome do produto:");

    // Usuário cancelou a caixa de diálogo
    if (nome === null) {
        alert("Cadastro cancelado.");
        return;
    }

    nome = nome.trim(); // remove espaços do início e do fim

    if (nome === "") {
        alert("O nome do produto não pode estar vazio.");
        return;
    }

    if (produtoJaExiste(nome)) {
        alert("Já existe um produto cadastrado com esse nome.");
        return;
    }

    var textoPreco = prompt("Digite o preço do produto (ex.: 7.50):");

    if (textoPreco === null) {
        alert("Cadastro cancelado.");
        return;
    }

    var preco = converterParaNumero(textoPreco);

    // isNaN cobre texto inválido; a segunda condição cobre zero e negativos
    if (isNaN(preco) || preco <= 0) {
        alert("Preço inválido. O preço deve ser um número maior que zero.");
        return;
    }

    // Os dois arrays recebem os dados na mesma posição (correspondência por índice)
    nomesProdutos.push(nome);
    precosProdutos.push(preco);

    alert("Produto cadastrado com sucesso!\n" + nome + " - " + formatarMoeda(preco));
}

// Tipo 1: sem parâmetros e sem retorno
// Exibe os produtos cadastrados.
function listarProdutos() {
    if (nomesProdutos.length === 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    alert("PRODUTOS CADASTRADOS\n\n" + montarListaProdutos());
}

// Tipo 4: com parâmetros e COM retorno
// Calcula e retorna o subtotal da venda.
function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}

// Tipo 4: com parâmetros e com retorno
// Recebe o subtotal e retorna o valor do desconto (10% se for maior que R$ 50,00).
function calcularDesconto(total) {
    if (total > 50) {
        return total * 0.10;
    }
    return 0;
}

// Tipo 2: com parâmetros e SEM retorno
// Apresenta o resumo da venda em uma caixa de diálogo.
function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    var valorFinal = subtotal - desconto;

    var resumo = "RESUMO DA VENDA\n\n" +
        "Produto: " + nome + "\n" +
        "Preço unitário: " + formatarMoeda(preco) + "\n" +
        "Quantidade: " + quantidade + "\n" +
        "Subtotal: " + formatarMoeda(subtotal) + "\n" +
        "Desconto: " + formatarMoeda(desconto) + "\n" +
        "Valor final a pagar: " + formatarMoeda(valorFinal);

    alert(resumo);
}

// Tipo 3: sem parâmetros e COM retorno
// Soma todos os valores registrados em totaisVendas.
function obterTotalVendasDia() {
    var soma = 0;
    for (var i = 0; i < totaisVendas.length; i++) {
        soma += totaisVendas[i];
    }
    return soma;
}

// Tipo 1: sem parâmetros e sem retorno
// Mostra a quantidade de vendas e o total vendido no dia.
function exibirTotalVendasDia() {
    if (totaisVendas.length === 0) {
        alert("Não existem vendas registradas.");
        return;
    }

    var total = obterTotalVendasDia();

    alert("TOTAL DE VENDAS DO DIA\n\n" +
        "Vendas concluídas: " + totaisVendas.length + "\n" +
        "Valor total vendido: " + formatarMoeda(total));
}

// Tipo 1: sem parâmetros e sem retorno
// Executa o processo completo de uma venda (um tipo de produto por venda).
function realizarVenda() {
    if (nomesProdutos.length === 0) {
        alert("Não há produtos cadastrados. Cadastre um produto antes de vender.");
        return;
    }

    // 1) Apresenta os produtos e solicita o código
    var textoCodigo = prompt("PRODUTOS DISPONÍVEIS\n\n" + montarListaProdutos() +
        "\nDigite o código do produto:");

    if (textoCodigo === null) {
        alert("Venda cancelada.");
        return;
    }

    var codigo = parseInt(textoCodigo);

    // Código precisa ser número e estar entre 1 e a quantidade de produtos
    if (isNaN(codigo) || codigo < 1 || codigo > nomesProdutos.length) {
        alert("Produto inexistente. Venda cancelada.");
        return;
    }

    var indice = codigo - 1; // converte o código para a posição no array
    var nome = nomesProdutos[indice];
    var preco = precosProdutos[indice];

    // 2) Solicita a quantidade
    var textoQuantidade = prompt("Produto: " + nome + " (" + formatarMoeda(preco) + ")\n" +
        "Digite a quantidade desejada:");

    if (textoQuantidade === null) {
        alert("Venda cancelada.");
        return;
    }

    var quantidade = parseInt(textoQuantidade);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Quantidade inválida. Informe um número maior que zero. Venda cancelada.");
        return;
    }

    // 3) Calcula subtotal, desconto e valor final
    var subtotal = calcularTotalVenda(preco, quantidade);
    var desconto = calcularDesconto(subtotal);
    var valorFinal = subtotal - desconto;

    // 4) Mostra o resumo
    exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);

    // 5) Só registra o valor após a confirmação (venda concluída)
    if (confirm("Confirmar a venda?")) {
        totaisVendas.push(valorFinal);
        alert("Venda concluída com sucesso!");
    } else {
        alert("Venda cancelada. Nada foi registrado.");
    }
}

// Tipo 3: sem parâmetros e com retorno
// Exibe o menu e retorna o texto digitado pelo usuário (ou null se cancelar).
function exibirMenu() {
    return prompt("===== LANCHONETE =====\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Realizar venda\n" +
        "4 - Consultar total de vendas do dia\n" +
        "5 - Encerrar o sistema\n\n" +
        "Escolha uma opção:");
}

// Controla a execução do menu: repete até o usuário escolher encerrar.
function iniciarSistema() {
    var opcao;

    do {
        opcao = exibirMenu();

        // Cancelar no menu equivale a pedir para encerrar
        if (opcao === null) {
            opcao = "5";
        }

        opcao = opcao.trim();

        if (opcao === "1") {
            cadastrarProduto();
        } else if (opcao === "2") {
            listarProdutos();
        } else if (opcao === "3") {
            realizarVenda();
        } else if (opcao === "4") {
            exibirTotalVendasDia();
        } else if (opcao === "5") {
            // Pede confirmação; se o usuário recusar, volta ao menu
            if (!confirm("Deseja realmente encerrar o sistema?")) {
                opcao = "";
            }
        } else {
            alert("Opção inválida. Escolha um número de 1 a 5.");
        }
    } while (opcao !== "5");

    alert("Sistema encerrado. Até logo!");
}

// Inicia o sistema ao carregar a página
iniciarSistema();