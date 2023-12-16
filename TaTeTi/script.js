const canvas = document.querySelector("canvas");
canvas.width = 300;
canvas.height = 300;
const ctx = canvas.getContext("2d");

// Base:
ctx.fillRect(100, 0, 10, canvas.width);
ctx.fillRect(200, 0, 10, canvas.width);
ctx.fillRect(0, 100, canvas.height, 10);
ctx.fillRect(0, 200, canvas.height, 10);

// Slots:
const slots = [
  {
    x1: 20,
    y1: 20,
    x2: 80,
    y2: 80,
    x3: 80,
    y3: 20,
    x4: 20,
    y4: 80,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 120,
    y1: 20,
    x2: 180,
    y2: 80,
    x3: 180,
    y3: 20,
    x4: 120,
    y4: 80,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 220,
    y1: 20,
    x2: 280,
    y2: 80,
    x3: 280,
    y3: 20,
    x4: 220,
    y4: 80,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 20,
    y1: 120,
    x2: 80,
    y2: 180,
    x3: 80,
    y3: 120,
    x4: 20,
    y4: 180,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 120,
    y1: 120,
    x2: 180,
    y2: 180,
    x3: 180,
    y3: 120,
    x4: 120,
    y4: 180,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 220,
    y1: 120,
    x2: 280,
    y2: 180,
    x3: 280,
    y3: 120,
    x4: 220,
    y4: 180,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 20,
    y1: 220,
    x2: 80,
    y2: 280,
    x3: 80,
    y3: 220,
    x4: 20,
    y4: 280,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 120,
    y1: 220,
    x2: 180,
    y2: 280,
    x3: 180,
    y3: 220,
    x4: 120,
    y4: 280,
    ocupado: false,
    ocupadopor: "",
  },
  {
    x1: 220,
    y1: 220,
    x2: 280,
    y2: 280,
    x3: 280,
    y3: 220,
    x4: 220,
    y4: 280,
    ocupado: false,
    ocupadopor: "",
  },
];

//turnos:
let turno = 1;
let gamebloqueado = false;

// Dibujar la "X"
const dibujarX = (slot) => {
  ctx.beginPath();
  var grosorLinea = 5;
  ctx.lineWidth = grosorLinea;
  ctx.moveTo(slot.x1, slot.y1);
  ctx.lineTo(slot.x2, slot.y2);
  ctx.moveTo(slot.x3, slot.y3);
  ctx.lineTo(slot.x4, slot.y4);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
};

// Dibujar la "O"
const dibujarO = (slot) => {
  var centerX = (slot.x1 + 12 + slot.x2) / 2;
  var centerY = (slot.y1 + slot.y4) / 2;
  var radio = 30;
  var grosorLinea = 5;
  if (!slot.ocupado) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radio, 0, 2 * Math.PI, false);
    ctx.lineWidth = grosorLinea;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
  } else {
    alert("casilla ocupada");
  }
};

// Función para manejar el clic en los slots
const clickEnSlots = (event) => {
  var rect = canvas.getBoundingClientRect();
  var clicX = event.clientX - rect.left;
  var clicY = event.clientY - rect.top;

  const slot = devolverSlot(clicX, clicY);
  if (slot) {
    if (gamebloqueado == true) {
      alert("juego terminado,comienze uno nuevo");
    } else {
      if (!slot.ocupado) {
        if (turno == 1) {
          dibujarX(slot);
          slot.ocupado = true;
          slot.ocupadopor = "x";
          turno++;
        } else {
          dibujarO(slot);
          slot.ocupado = true;
          slot.ocupadopor = "o";
          turno--;
        }
      } else {
        alert("casilla ocupada");
      }
      verificarGanador();
    }
  }
};

// Función para obtener el slot según las coordenadas del clic
const devolverSlot = (clicX, clicY) => {
  return slots.find(
    (slot) =>
      (clicX > slot.x1 &&
        clicX < slot.x2 &&
        clicY > slot.y1 &&
        clicY < slot.y2) ||
      (clicX > slot.x3 && clicX < slot.x4 && clicY > slot.y3 && clicY < slot.y4)
  );
};

const verificarGanador = () => {
  const ocupadoPorArray = slots.map((objeto) => objeto.ocupadopor);
  console.log(ocupadoPorArray);
  if (
    (ocupadoPorArray[0] === "x" &&
      ocupadoPorArray[1] === "x" &&
      ocupadoPorArray[2] === "x") ||
    (ocupadoPorArray[3] === "x" &&
      ocupadoPorArray[4] === "x" &&
      ocupadoPorArray[5] === "x") ||
    (ocupadoPorArray[6] === "x" &&
      ocupadoPorArray[7] === "x" &&
      ocupadoPorArray[8] === "x") ||
    (ocupadoPorArray[0] === "x" &&
      ocupadoPorArray[3] === "x" &&
      ocupadoPorArray[6] === "x") ||
    (ocupadoPorArray[1] === "x" &&
      ocupadoPorArray[4] === "x" &&
      ocupadoPorArray[7] === "x") ||
    (ocupadoPorArray[2] === "x" &&
      ocupadoPorArray[5] === "x" &&
      ocupadoPorArray[8] === "x") ||
    (ocupadoPorArray[0] === "x" &&
      ocupadoPorArray[4] === "x" &&
      ocupadoPorArray[8] === "x") ||
    (ocupadoPorArray[2] === "x" &&
      ocupadoPorArray[4] === "x" &&
      ocupadoPorArray[6] === "x")
  ) {
    alert("X gana");
    gamebloqueado = true;
  }
  if (
    (ocupadoPorArray[0] === "o" &&
      ocupadoPorArray[1] === "o" &&
      ocupadoPorArray[2] === "o") ||
    (ocupadoPorArray[3] === "o" &&
      ocupadoPorArray[4] === "o" &&
      ocupadoPorArray[5] === "o") ||
    (ocupadoPorArray[6] === "o" &&
      ocupadoPorArray[7] === "o" &&
      ocupadoPorArray[8] === "o") ||
    (ocupadoPorArray[0] === "o" &&
      ocupadoPorArray[3] === "o" &&
      ocupadoPorArray[6] === "o") ||
    (ocupadoPorArray[1] === "o" &&
      ocupadoPorArray[4] === "o" &&
      ocupadoPorArray[7] === "o") ||
    (ocupadoPorArray[2] === "o" &&
      ocupadoPorArray[5] === "o" &&
      ocupadoPorArray[8] === "o") ||
    (ocupadoPorArray[0] === "o" &&
      ocupadoPorArray[4] === "o" &&
      ocupadoPorArray[8] === "o") ||
    (ocupadoPorArray[2] === "o" &&
      ocupadoPorArray[4] === "o" &&
      ocupadoPorArray[6] === "o")
  ) {
    alert("O gana");
    gamebloqueado = true;
  }
};

const reset = () => {
  window.location.reload();
};

canvas.addEventListener("click", clickEnSlots);
