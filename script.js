var contadorAmostras = 1;
var amostrasPositivas = 0;
var amostrasNegativas = 0;
var amostras = 200;
var valorAtribuido=[];
function geraAmostraNegativa() {
    var teorArgila = parseInt(Math.random() * 4 + 1);
    var K = parseFloat(Math.random() * 200 + 20).toFixed(2);
    var P = parseFloat(Math.random() * 80 + 2).toFixed(2);
    var CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
    var numeroCultivo = parseInt(Math.random() + 1);
    var result;
    /*if (analisaK(K, CTC) && analisaP(P, teorArgila)) {
        result = "Positiva";
        amostrasPositivas++;
    } else {
        result = "Negativa";
        amostrasNegativas++;
    }*/
   //enquanto se a amostra for valida gere outra amostra até que saia algo invalido... 
    while (analisaK(K, CTC) && analisaP(P, teorArgila)) {
        K = parseFloat(Math.random() * 200 + 20).toFixed(2);
        CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
        P = parseFloat(Math.random() * 80 + 2).toFixed(2);
        teorArgila = parseInt(Math.random() * 4 + 1);
    }
    amostrasNegativas++;
    //Retornará a informação montada para a function geraAmostras()
    return teorArgila + "," + K + "," + P + "," + CTC + "," + numeroCultivo +  ",\n";
}

function geraAmostraPositiva() {
    var teorArgila = parseInt(Math.random() * 4 + 1);
    var K = parseFloat(Math.random() * 200 + 20).toFixed(2);
    var P = parseFloat(Math.random() * 80 + 2).toFixed(2);
    var CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
    var numeroCultivo = parseInt(Math.random() + 1);
    
    while (!analisaK(K, CTC)) {
        K = parseFloat(Math.random() * 200 + 20).toFixed(2);
        CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
    }
    while (!analisaP(P, teorArgila)) {
        P = parseFloat(Math.random() * 80 + 2).toFixed(2);
        teorArgila = parseInt(Math.random() * 4 + 1);
    }

    amostrasPositivas++;
    //Retornará a informação montada para a function geraAmostraPositiva()
    return teorArgila + "," + K + "," + P + "," + CTC + "," + numeroCultivo +  ",\n";
}

function analisaK(K, CTC) {
    if (CTC <= 7.5 && K > 120) {
        return 1;
    } else if (CTC >= 7.6 && CTC < 15.0 && K > 180) {
        return 1;
    } else if (CTC >= 15.1 && CTC <= 30.0 && K > 240) {
        return 1;
    } else if (CTC > 30 && K > 270) {
        return 1;
    } else {
        return 0;
    }
}

function analisaP(P, TA) {
    if (TA == 1 && P > 18.0) {
        return 1;
    } else if (TA == 2 && P > 24.0) {
        return 1;
    } else if (TA == 3 && P > 36.0) {
        return 1;
    } else if (TA == 4 && P > 60.0) {
        return 1;
    } else {
        return 0;
    }
}

//Sessão para geração dos resultados, utilizando as functions geraAmostraPositiva e geraAmostra
function gerarResultados() {
    var i = 0;
    var resultado = '';

    while (i < amostras) {
        if (amostrasPositivas < 120) {
            resultado += geraAmostraPositiva();
            valorAtribuido[i]=1;
        } else {
            resultado += geraAmostraNegativa();
            valorAtribuido[i]=0;
        }
        i++;
    }

    resultado += "Amostras Positivas: " + amostrasPositivas + " - Amostras Negativas: " + amostrasNegativas + "\n";

    //console.log("Amostras Positivas: " + amostrasPositivas + " - Amostras Negativas: " + amostrasNegativas);
    return resultado;
}

//Sessão para geração do arquivo .TXT.
document.getElementById('downloadButton').addEventListener('click', function () {
    // Conteúdo do arquivo de texto
    const textContent = gerarResultados();
    
    // Cria um Blob com o conteúdo do arquivo
    const blob = new Blob([textContent], { type: 'text/plain' });
    
    // Cria um URL para o Blob
    const url = URL.createObjectURL(blob);
    
    // Cria um elemento de link
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados_gerados.txt'; // Nome do arquivo a ser baixado
    
    // Adiciona o link ao corpo do documento e clica nele programaticamente
    document.body.appendChild(a);
    a.click();
    
    // Remove o link do corpo do documento
    document.body.removeChild(a);
    
    // Revoga o URL do Blob
    URL.revokeObjectURL(url);
});