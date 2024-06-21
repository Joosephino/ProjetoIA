var contadorAmostras = 1;
var amostrasPositivas = 0;
var amostrasNegativas = 0;

function geraAmostras() {
    var teorArgila = parseInt(Math.random() * 4 + 1);
    var K = parseFloat(Math.random() * 200 + 20).toFixed(2);
    var P = parseFloat(Math.random() * 80 + 2).toFixed(2);
    var CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
    var numeroCultivo = parseInt(Math.random() + 1);
    var result;
    if (analisaK(K, CTC) && analisaP(P, teorArgila)) {
        result = "Positiva";
        amostrasPositivas++;
    } else {
        result = "Negativa";
        amostrasNegativas++;
    }
    //document.write(teorArgila+','+K+','+P+','+CTC+','+NumeroCultivo+' - Amostra -> '+contadorAmostras+' '+result+'<br>')
    document.write(teorArgila + "," + K + "," + P + "," + CTC + "," + numeroCultivo +  ",<br>");
    contadorAmostras++;
    }

function geraAmostraPositiva() {
      var teorArgila = parseInt(Math.random() * 4 + 1);
      var K = parseFloat(Math.random() * 200 + 20).toFixed(2);
      var P = parseFloat(Math.random() * 80 + 2).toFixed(2);
      var CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
      var numeroCultivo = parseInt(Math.random() + 1);
      var result;
      
      while (!analisaK(K, CTC)) {
            K = parseFloat(Math.random() * 200 + 20).toFixed(2);
            CTC = parseFloat(Math.random() * 30 + 5).toFixed(2);
        }
    while (!analisaP(P, teorArgila)) {
            P = parseFloat(Math.random() * 80 + 2).toFixed(2);
            teorArgila = parseInt(Math.random() * 4 + 1);
        }

  //document.write(teorArgila + ',' + K + ',' + P + ',' + CTC + ',' + NumeroCultivo + ' - Amostra -> ' + contadorAmostras + ' ' + result + '<br>');
  document.write(teorArgila + ", " + K + ", " + P + ", " + CTC + ", " + numeroCultivo + " ,<br>");
  amostrasPositivas++;
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
  }
}

var i = 0;
var amostras = 200;

function gerarResultados (){
    while (i < amostras) {
      if (amostrasPositivas < 120) {
        geraAmostraPositiva();
      } else {
        geraAmostras();
      }
    i++;
  }

  console.log("Amostras Positivas: " + amostrasPositivas + " - Amostras Negativas: " + amostrasNegativas);
}