// botón para cambiar el tema claro/oscuro
var themeButton = document.querySelector(".theme-button");

//  input de conjunto A
var conjuntoAInput = document.getElementById("conjuntoA");

// selecciona el input de conjunto B
var conjuntoBInput = document.getElementById("conjuntoB");

// div donde se muestra la cardinalidad de A
var cardA = document.getElementById("cardA");

// div donde se muestra la cardinalidad de B
var cardB = document.getElementById("cardB");

// selector de operaciones
var operacionSelect = document.getElementById("operacion");

// botón para calcular
var calcularBtn = document.getElementById("calcularBtn");

// div donde sale el resultado
var resultDiv = document.querySelector(".result");

// cambiar a modo obscuro o claro
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

// convierte el texto del input en un arreglo de números únicos entre 1 y 100
function parsearConjunto(texto) {
  var partes = texto.split(",");
  var conjunto = [];
  for (var i = 0; i < partes.length; i++) {
    var valor = partes[i].trim();
    if (
      valor.length > 0 &&
      !isNaN(valor) &&
      Number(valor) >= 1 &&
      Number(valor) <= 100
    ) {
      if (conjunto.indexOf(valor) === -1) {
        conjunto.push(valor);
      }
    }
  }
  return conjunto;
}

// muestra la cardinalidad del conjunto en el div correspondiente
function mostrarCardinalidad(input, cardDiv) {
  var conjunto = parsearConjunto(input.value);
  cardDiv.textContent = "Cardinalidad: " + conjunto.length;
}

// al cargar la página, muestra la cardinalidad inicial de ambos conjuntos
mostrarCardinalidad(conjuntoAInput, cardA);
mostrarCardinalidad(conjuntoBInput, cardB);

// cuando se escribe en el input de A, actualiza la cardinalidad
conjuntoAInput.addEventListener("input", function () {
  mostrarCardinalidad(conjuntoAInput, cardA);
});
// cuando se escribe en el input de B, actualiza la cardinalidad
conjuntoBInput.addEventListener("input", function () {
  mostrarCardinalidad(conjuntoBInput, cardB);
});

// calcula el conjunto potencia de un conjunto
function potencia(conjunto) {
  var res = [[]];
  for (var i = 0; i < conjunto.length; i++) {
    var elem = conjunto[i];
    var len = res.length;
    for (var j = 0; j < len; j++) {
      res.push(res[j].concat(elem));
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

// calcula la diferencia de conjuntos (A - B)
function diferencia(A, B) {
  var res = [];
  for (var i = 0; i < A.length; i++) {
    if (B.indexOf(A[i]) === -1) {
      res.push(A[i]);
    }
  }
  return res;
}

// calcula la unión de dos conjuntos
function union(A, B) {
  var res = [];
  for (var i = 0; i < A.length; i++) {
    if (res.indexOf(A[i]) === -1) {
      res.push(A[i]);
    }
  }
  for (var j = 0; j < B.length; j++) {
    if (res.indexOf(B[j]) === -1) {
      res.push(B[j]);
    }
  }
  return res;
}

// calcula la intersección de dos conjuntos
function interseccion(A, B) {
  var res = [];
  for (var i = 0; i < A.length; i++) {
    if (B.indexOf(A[i]) !== -1) {
      res.push(A[i]);
    }
  }
  return res;
}

// calcula la diferencia simétrica de dos conjuntos
function diferenciaSimetrica(A, B) {
  var dif1 = diferencia(A, B);
  var dif2 = diferencia(B, A);
  return union(dif1, dif2);
}

// calcula el complemento de un conjunto respecto al universal (1 a 100)
function complemento(A) {
  var universal = [];
  for (var i = 1; i <= 100; i++) {
    universal.push(i.toString());
  }
  var res = [];
  for (var j = 0; j < universal.length; j++) {
    if (A.indexOf(universal[j]) === -1) {
      res.push(universal[j]);
    }
  }
  return res;
}

// analiza si una relación es reflexiva, simétrica y transitiva
function analizarRelacion(relacion, base) {
  var esReflexiva = true;
  for (var i = 0; i < base.length; i++) {
    var encontrado = false;
    for (var j = 0; j < relacion.length; j++) {
      if (relacion[j][0] == base[i] && relacion[j][1] == base[i]) {
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
      if (relacion[j][0] == par[1] && relacion[j][1] == par[0]) {
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
          if (relacion[k][0] == a && relacion[k][1] == c) {
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

// elige un subconjunto aleatorio de una relación (al menos un par)
function subconjuntoAleatorio(relacion) {
  var n = 1;
  if (relacion.length > 1) {
    n = Math.floor(Math.random() * relacion.length);
    if (n < 1) n = 1;
  }
  var copia = [];
  for (var i = 0; i < relacion.length; i++) {
    copia.push(relacion[i]);
  }
  for (var i = copia.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copia[i];
    copia[i] = copia[j];
    copia[j] = temp;
  }
  return copia.slice(0, n);
}

// cuando se hace click en calcular, realiza la operación seleccionada y muestra el resultado
calcularBtn.addEventListener("click", function () {
  var A = parsearConjunto(conjuntoAInput.value);
  var B = parsearConjunto(conjuntoBInput.value);
  var op = operacionSelect.value;
  var resultado = "";
  try {
    if (op === "A∩B") {
      resultado = "A ∩ B = [" + interseccion(A, B).join(", ") + "]";
    } else if (op === "A∪B") {
      resultado = "A ∪ B = [" + union(A, B).join(", ") + "]";
    } else if (op === "A-B") {
      resultado = "A - B = [" + diferencia(A, B).join(", ") + "]";
    } else if (op === "B-A") {
      resultado = "B - A = [" + diferencia(B, A).join(", ") + "]";
    } else if (op === "A∆B") {
      resultado = "A ∆ B = [" + diferenciaSimetrica(A, B).join(", ") + "]";
    } else if (op === "Ac") {
      resultado = "Ac = [" + complemento(A).join(", ") + "]";
    } else if (op === "Bc") {
      resultado = "Bc = [" + complemento(B).join(", ") + "]";
    } else if (op === "A×B") {
      var prod = productoCartesiano(A, B);
      var pares = [];
      for (var i = 0; i < prod.length; i++) {
        pares.push("[" + prod[i][0] + "," + prod[i][1] + "]");
      }
      resultado = "A × B = {" + pares.join(", ") + "}";
    } else if (op === "B×A") {
      var prod = productoCartesiano(B, A);
      var pares = [];
      for (var i = 0; i < prod.length; i++) {
        pares.push("[" + prod[i][0] + "," + prod[i][1] + "]");
      }
      resultado = "B × A = {" + pares.join(", ") + "}";
    } else if (op === "A×A") {
      var prod = productoCartesiano(A, A);
      var pares = [];
      for (var i = 0; i < prod.length; i++) {
        pares.push("[" + prod[i][0] + "," + prod[i][1] + "]");
      }
      resultado = "A × A = {" + pares.join(", ") + "}";
    } else if (op === "B×B") {
      var prod = productoCartesiano(B, B);
      var pares = [];
      for (var i = 0; i < prod.length; i++) {
        pares.push("[" + prod[i][0] + "," + prod[i][1] + "]");
      }
      resultado = "B × B = {" + pares.join(", ") + "}";
    } else if (op === "P(A)") {
      var pot = potencia(A);
      var subconjuntos = [];
      for (var i = 0; i < pot.length; i++) {
        subconjuntos.push("{" + pot[i].join(",") + "}");
      }
      resultado = "P(A) = {" + subconjuntos.join(", ") + "}";
    } else if (op === "P(B)") {
      var pot = potencia(B);
      var subconjuntos = [];
      for (var i = 0; i < pot.length; i++) {
        subconjuntos.push("{" + pot[i].join(",") + "}");
      }
      resultado = "P(B) = {" + subconjuntos.join(", ") + "}";
    } else if (op === "|A|") {
      resultado = "|A| = " + A.length;
    } else if (op === "|B|") {
      resultado = "|B| = " + B.length;
    } else if (op === "analizarA×B") {
      var rel = subconjuntoAleatorio(productoCartesiano(A, B));
      var props = analizarRelacion(rel, A);
      var pares = [];
      for (var i = 0; i < rel.length; i++) {
        pares.push("[" + rel[i][0] + "," + rel[i][1] + "]");
      }
      resultado =
        "Subconjunto aleatorio de A×B: {" +
        pares.join(", ") +
        "}\nReflexiva: " +
        (props.reflexiva ? "Sí" : "No") +
        " | Simétrica: " +
        (props.simetrica ? "Sí" : "No") +
        " | Transitiva: " +
        (props.transitiva ? "Sí" : "No");
    } else if (op === "analizarB×A") {
      var rel = subconjuntoAleatorio(productoCartesiano(B, A));
      var props = analizarRelacion(rel, B);
      var pares = [];
      for (var i = 0; i < rel.length; i++) {
        pares.push("[" + rel[i][0] + "," + rel[i][1] + "]");
      }
      resultado =
        "Subconjunto aleatorio de B×A: {" +
        pares.join(", ") +
        "}\nReflexiva: " +
        (props.reflexiva ? "Sí" : "No") +
        " | Simétrica: " +
        (props.simetrica ? "Sí" : "No") +
        " | Transitiva: " +
        (props.transitiva ? "Sí" : "No");
    } else if (op === "analizarA×A") {
      var rel = subconjuntoAleatorio(productoCartesiano(A, A));
      var props = analizarRelacion(rel, A);
      var pares = [];
      for (var i = 0; i < rel.length; i++) {
        pares.push("[" + rel[i][0] + "," + rel[i][1] + "]");
      }
      resultado =
        "Subconjunto aleatorio de A×A: {" +
        pares.join(", ") +
        "}\nReflexiva: " +
        (props.reflexiva ? "Sí" : "No") +
        " | Simétrica: " +
        (props.simetrica ? "Sí" : "No") +
        " | Transitiva: " +
        (props.transitiva ? "Sí" : "No");
    } else if (op === "analizarB×B") {
      var rel = subconjuntoAleatorio(productoCartesiano(B, B));
      var props = analizarRelacion(rel, B);
      var pares = [];
      for (var i = 0; i < rel.length; i++) {
        pares.push("[" + rel[i][0] + "," + rel[i][1] + "]");
      }
      resultado =
        "Subconjunto aleatorio de B×B: {" +
        pares.join(", ") +
        "}\nReflexiva: " +
        (props.reflexiva ? "Sí" : "No") +
        " | Simétrica: " +
        (props.simetrica ? "Sí" : "No") +
        " | Transitiva: " +
        (props.transitiva ? "Sí" : "No");
    } else {
      resultado = "Operación no soportada.";
    }
    resultDiv.textContent = resultado;
    resultDiv.style.color = "green";
  } catch (e) {
    resultDiv.textContent = "Error: " + e.message;
    resultDiv.style.color = "red";
  }
});
