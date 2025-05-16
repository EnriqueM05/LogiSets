// selecciona los elementos del dom necesarios para la calculadora
var themeButton = document.querySelector(".theme-button");
var conjuntoAInput = document.getElementById("conjuntoA");
var conjuntoBInput = document.getElementById("conjuntoB");
var cardA = document.getElementById("cardA");
var cardB = document.getElementById("cardB");
var operacionSelect = document.getElementById("operacion");
var calcularBtn = document.getElementById("calcularBtn");
var resultDiv = document.querySelector(".result");

// cambia entre modo claro y oscuro
var isLight = true;
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  isLight = !isLight;
  if (isLight) {
    themeButton.textContent = "☀️";
  } else {
    themeButton.textContent = "🌙";
  }
});

// convierte el texto ingresado en un array de números únicos válidos (1-100)
function parsearConjunto(texto) {
  var limpio = texto.replace(/[{}]/g, "");
  var partes = limpio.split(/,|\s+/);
  var numeros = [];
  for (var i = 0; i < partes.length; i++) {
    var n = Number(partes[i].trim());
    if (!isNaN(n) && n >= 1 && n <= 100 && numeros.indexOf(n) === -1) {
      numeros.push(n);
    }
  }
  return numeros;
}

// devuelve la intersección de dos conjuntos
function interseccion(A, B) {
  var resultado = [];
  for (var i = 0; i < A.length; i++) {
    if (B.indexOf(A[i]) !== -1) {
      resultado.push(A[i]);
    }
  }
  return resultado;
}

// muestra la cardinalidad del conjunto en la interfaz
function mostrarCardinalidad(input, cardDiv) {
  var conjunto = parsearConjunto(input.value);
  cardDiv.textContent = "Cardinalidad: " + conjunto.length;
}

// actualiza la cardinalidad en tiempo real
conjuntoAInput.addEventListener("input", function () {
  mostrarCardinalidad(conjuntoAInput, cardA);
});
conjuntoBInput.addEventListener("input", function () {
  mostrarCardinalidad(conjuntoBInput, cardB);
});

// calcula el conjunto potencia de un conjunto
function potencia(conjunto) {
  var res = [[]];
  for (var i = 0; i < conjunto.length; i++) {
    var len = res.length;
    for (var j = 0; j < len; j++) {
      res.push(res[j].concat(conjunto[i]));
    }
  }
  return res;
}

// calcula el producto cartesiano de dos conjuntos
function productoCartesiano(A, B) {
  var res = [];
  for (var i = 0; i < A.length; i++) {
    for (var j = 0; j < B.length; j++) {
      res.push([A[i], B[j]]);
    }
  }
  return res;
}

// devuelve la diferencia de dos conjuntos
function diferencia(A, B) {
  var resultado = [];
  for (var i = 0; i < A.length; i++) {
    if (B.indexOf(A[i]) === -1) {
      resultado.push(A[i]);
    }
  }
  return resultado;
}

// devuelve la unión de dos conjuntos
function union(A, B) {
  var resultado = A.slice();
  for (var i = 0; i < B.length; i++) {
    if (resultado.indexOf(B[i]) === -1) {
      resultado.push(B[i]);
    }
  }
  return resultado;
}

// devuelve la diferencia simétrica de dos conjuntos
function diferenciaSimetrica(A, B) {
  return union(diferencia(A, B), diferencia(B, A));
}

// devuelve el complemento de un conjunto respecto al universal (1-100)
function complemento(A) {
  var universal = [];
  for (var i = 1; i <= 100; i++) {
    if (A.indexOf(i) === -1) {
      universal.push(i);
    }
  }
  return universal;
}

// analiza si una relación es reflexiva, simétrica y transitiva
function analizarRelacion(relacion, base) {
  var esReflexiva = true;
  for (var i = 0; i < base.length; i++) {
    var encontrado = false;
    for (var j = 0; j < relacion.length; j++) {
      if (relacion[j][0] === base[i] && relacion[j][1] === base[i]) {
        encontrado = true;
        break;
      }
    }
    if (!encontrado) {
      esReflexiva = false;
      break;
    }
  }
  var esSimetrica = true;
  for (var i = 0; i < relacion.length; i++) {
    var par = relacion[i];
    var sim = false;
    for (var j = 0; j < relacion.length; j++) {
      if (relacion[j][0] === par[1] && relacion[j][1] === par[0]) {
        sim = true;
        break;
      }
    }
    if (!sim) {
      esSimetrica = false;
      break;
    }
  }
  var esTransitiva = true;
  for (var i = 0; i < relacion.length; i++) {
    for (var j = 0; j < relacion.length; j++) {
      if (relacion[i][1] === relacion[j][0]) {
        var a = relacion[i][0];
        var c = relacion[j][1];
        var existe = false;
        for (var k = 0; k < relacion.length; k++) {
          if (relacion[k][0] === a && relacion[k][1] === c) {
            existe = true;
            break;
          }
        }
        if (!existe) {
          esTransitiva = false;
          break;
        }
      }
    }
    if (!esTransitiva) break;
  }
  return {
    reflexiva: esReflexiva,
    simetrica: esSimetrica,
    transitiva: esTransitiva,
  };
}

// devuelve un subconjunto aleatorio de una relación
function subconjuntoAleatorio(relacion) {
  var copia = relacion.slice();
  for (var i = copia.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copia[i];
    copia[i] = copia[j];
    copia[j] = temp;
  }
  var n = Math.max(1, Math.floor(Math.random() * copia.length));
  return copia.slice(0, n);
}

// maneja el evento de click para calcular la operación seleccionada
calcularBtn.addEventListener("click", function () {
  var A = parsearConjunto(conjuntoAInput.value);
  var B = parsearConjunto(conjuntoBInput.value);
  var op = operacionSelect.value;
  var resultado = "";
  try {
    switch (op) {
      case "A∩B":
        resultado = "A ∩ B = [" + interseccion(A, B).join(", ") + "]";
        break;
      case "A∪B":
        resultado = "A ∪ B = [" + union(A, B).join(", ") + "]";
        break;
      case "A-B":
        resultado = "A - B = [" + diferencia(A, B).join(", ") + "]";
        break;
      case "B-A":
        resultado = "B - A = [" + diferencia(B, A).join(", ") + "]";
        break;
      case "A∆B":
        resultado = "A ∆ B = [" + diferenciaSimetrica(A, B).join(", ") + "]";
        break;
      case "Ac":
        resultado = "Ac = [" + complemento(A).join(", ") + "]";
        break;
      case "Bc":
        resultado = "Bc = [" + complemento(B).join(", ") + "]";
        break;
      case "A×B":
        var prodAB = productoCartesiano(A, B);
        var paresAB = [];
        for (var i = 0; i < prodAB.length; i++) {
          paresAB.push("[" + prodAB[i][0] + "," + prodAB[i][1] + "]");
        }
        resultado = "A × B = {" + paresAB.join(", ") + "}";
        break;
      case "B×A":
        var prodBA = productoCartesiano(B, A);
        var paresBA = [];
        for (var i = 0; i < prodBA.length; i++) {
          paresBA.push("[" + prodBA[i][0] + "," + prodBA[i][1] + "]");
        }
        resultado = "B × A = {" + paresBA.join(", ") + "}";
        break;
      case "A×A":
        var prodAA = productoCartesiano(A, A);
        var paresAA = [];
        for (var i = 0; i < prodAA.length; i++) {
          paresAA.push("[" + prodAA[i][0] + "," + prodAA[i][1] + "]");
        }
        resultado = "A × A = {" + paresAA.join(", ") + "}";
        break;
      case "B×B":
        var prodBB = productoCartesiano(B, B);
        var paresBB = [];
        for (var i = 0; i < prodBB.length; i++) {
          paresBB.push("[" + prodBB[i][0] + "," + prodBB[i][1] + "]");
        }
        resultado = "B × B = {" + paresBB.join(", ") + "}";
        break;
      case "P(A)":
        var potA = potencia(A);
        var strPotA = [];
        for (var i = 0; i < potA.length; i++) {
          strPotA.push("{" + potA[i].join(",") + "}");
        }
        resultado = "P(A) = {" + strPotA.join(", ") + "}";
        break;
      case "P(B)":
        var potB = potencia(B);
        var strPotB = [];
        for (var i = 0; i < potB.length; i++) {
          strPotB.push("{" + potB[i].join(",") + "}");
        }
        resultado = "P(B) = {" + strPotB.join(", ") + "}";
        break;
      case "|A|":
        resultado = "|A| = " + A.length;
        break;
      case "|B|":
        resultado = "|B| = " + B.length;
        break;
      case "analizarA×B":
        var relAB = subconjuntoAleatorio(productoCartesiano(A, B));
        var propsAB = analizarRelacion(relAB, A);
        resultado =
          "Subconjunto aleatorio de A×B: {" +
          relAB
            .map(function (p) {
              return "[" + p[0] + "," + p[1] + "]";
            })
            .join(", ") +
          "}";
        resultado += "<br>reflexiva: " + (propsAB.reflexiva ? "sí" : "no");
        resultado += " | simétrica: " + (propsAB.simetrica ? "sí" : "no");
        resultado += " | transitiva: " + (propsAB.transitiva ? "sí" : "no");
        break;
      case "analizarB×A":
        var relBA = subconjuntoAleatorio(productoCartesiano(B, A));
        var propsBA = analizarRelacion(relBA, B);
        resultado =
          "Subconjunto aleatorio de B×A: {" +
          relBA
            .map(function (p) {
              return "[" + p[0] + "," + p[1] + "]";
            })
            .join(", ") +
          "}";
        resultado += "<br>reflexiva: " + (propsBA.reflexiva ? "sí" : "no");
        resultado += " | simétrica: " + (propsBA.simetrica ? "sí" : "no");
        resultado += " | transitiva: " + (propsBA.transitiva ? "sí" : "no");
        break;
      case "analizarA×A":
        var relAA = subconjuntoAleatorio(productoCartesiano(A, A));
        var propsAA = analizarRelacion(relAA, A);
        resultado =
          "Subconjunto aleatorio de A×A: {" +
          relAA
            .map(function (p) {
              return "[" + p[0] + "," + p[1] + "]";
            })
            .join(", ") +
          "}";
        resultado += "<br>reflexiva: " + (propsAA.reflexiva ? "sí" : "no");
        resultado += " | simétrica: " + (propsAA.simetrica ? "sí" : "no");
        resultado += " | transitiva: " + (propsAA.transitiva ? "sí" : "no");
        break;
      case "analizarB×B":
        var relBB = subconjuntoAleatorio(productoCartesiano(B, B));
        var propsBB = analizarRelacion(relBB, B);
        resultado =
          "Subconjunto aleatorio de B×B: {" +
          relBB
            .map(function (p) {
              return "[" + p[0] + "," + p[1] + "]";
            })
            .join(", ") +
          "}";
        resultado += "<br>reflexiva: " + (propsBB.reflexiva ? "sí" : "no");
        resultado += " | simétrica: " + (propsBB.simetrica ? "sí" : "no");
        resultado += " | transitiva: " + (propsBB.transitiva ? "sí" : "no");
        break;
      default:
        resultado = "operación no soportada.";
    }
    resultDiv.innerHTML = resultado;
    resultDiv.style.color = "green";
  } catch (e) {
    resultDiv.textContent = "error: " + e.message;
    resultDiv.style.color = "red";
  }
});
