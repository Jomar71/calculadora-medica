// Datos de los medicamentos 
const medicamentos = {
    conjunto1:  {
        midazolam: { nombre: "Midazolam", dosisMin: 0.05, dosisMax: 0.2, unidad: 'mg/kg/h', k: 1 },
        propofol: { nombre: "Propofol", dosisMin: 1, dosisMax: 4, unidad: 'mg/kg/h', k: 10 },
        dexmedetomidina: { nombre: "Dexmedetomidina", dosisMin: 0.2, dosisMax: 1.4, unidad: 'mcg/kg/min', k: 4 },
        fentanil: { nombre: "Fentanil", dosisMin: 1, dosisMax: 3, unidad: 'mcg/kg/min', k: 10 },
        rocuronio: { nombre: "Rocuronio", dosisMin: 0.3, dosisMax: 0.7, unidad: 'mcg/kg/min', k: 1 },
    },
    conjunto2: {
        remifentanil: { nombre: "Remifentanil", dosisMin: 0.05, dosisMax: 0.2, unidad: 'mcg/kg/min', k: 20 },
        norepinefrina: { nombre: "Norepinefrina", dosisMin: 0.1, dosisMax: 0.4, unidad: 'mg/kg/h', k: 64 },
        nitroprusiato: { nombre: "Nitroprusiato", dosisMin: 0.3, dosisMax: 2, unidad: 'mg/kg/h', k: 400 },
        milrinone: { nombre: "Milrinone", dosisMin: 0.375, dosisMax: 0.75, unidad: 'mcg/kg/min', k: 100 },
        levosimendan: { nombre: "Levosimendan", dosisMin: 0.05, dosisMax: 0.2, unidad: 'mcg/kg/min', k: 100 },
    },
    conjunto3: {
        ketamina: { nombre: "Ketamina", dosisMin: 5, dosisMax: 15, unidad: 'mcg/kg/min', k: 5 },
        cisatracurio: { nombre: "Cisatracurio", dosisMin: 1, dosisMax: 4, unidad: 'mcg/kg/min', k: 1 },
        adrenalina: { nombre: "Adrenalina", dosisMin: 0.05, dosisMax: 0.2, unidad: 'mcg/kg/min', k: 1 },
        dobutamina: { nombre: "Dobutamina", dosisMin: 2.5, dosisMax: 5, unidad: 'mcg/kg/min', k: 2 },
    },
    conjunto4: {
        nitroglicerina: { nombre: "Nitroglicerina", dosisMin: 5, dosisMax: 200, unidad: 'mcg/kg/min', k: 400 },
    },

    conjunto5: {
        vasopresina: { nombre: "Vasopresina", dosisMin: 0.01, dosisMax: 0.04, unidad: 'mcg/kg/min', k: 0.2 },
        labetalol: { nombre: "Labetalol", dosisMin: 1, dosisMax: 2, unidad: 'mcg/kg/min', k: 1 },
    },
};

// Crea una tarjeta para cada medicamento
function crearTarjetas() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
  
    // Itera sobre cada conjunto y medicamento
    for (const conjuntoKey in medicamentos) {
        const conjunto = medicamentos[conjuntoKey];
        
        for (const medKey in conjunto) {
            const med = conjunto[medKey];
            
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>${med.nombre}</h2>
                <div class="result">
                    <p><strong>Rata Mínima:</strong> <span id="rataMin-${conjuntoKey}-${medKey}">-</span> ${med.unidad}</p>
                    <p><strong>Rata Máxima:</strong> <span id="rataMax-${conjuntoKey}-${medKey}">-</span> ${med.unidad}</p>
                    <p><strong>Rata Actual:</strong> <span id="rataActual-${conjuntoKey}-${medKey}">-</span> ${med.unidad}</p>
                </div>
            `;
  
            cardContainer.appendChild(card);
        }
    }
}

// Calcula las tasas para todos los medicamentos
function calcularParaTodos() {
    const pesoPte = parseFloat(document.getElementById('pesoPaciente').value);
    if (!pesoPte || pesoPte <= 0) {
        alert("Por favor, ingrese un peso de paciente válido.");
        return;
    }

    // Itera sobre cada conjunto y medicamento
    for (const conjuntoKey in medicamentos) {
        const conjunto = medicamentos[conjuntoKey];

        for (const medKey in conjunto) {
            const med = conjunto[medKey];

            let rataMin, rataMax, rataActual;

            // Determina el cálculo basado en el conjunto
            switch (conjuntoKey) {
                case 'conjunto1':
                    // Primer conjunto de cálculos
                    rataMin = (med.dosisMin * pesoPte) / med.k;
                    rataMax = (med.dosisMax * pesoPte) / med.k;
                    break;
                case 'conjunto2':
                    // Segundo conjunto de cálculos (con valores diferentes)
                    rataMin = ((med.dosisMin * pesoPte) * 60) / med.k;
                    rataMax = ((med.dosisMax * pesoPte) * 60) / med.k;
                    break;
                case 'conjunto3':
                    // Tercer conjunto de cálculos (con valores diferentes)
                    rataMin = (((med.dosisMin * pesoPte) / 1000) * 60) / med.k;
                    rataMax = (((med.dosisMax * pesoPte) / 1000) * 60) / med.k;
                    break;
                case 'conjunto4':
                    // Cuarto conjunto de cálculos (con valores diferentes)
                    rataMin = (med.dosisMin / med.k) * 60;
                    rataMax = (med.dosisMax / med.k) * 60;
                    break;
                    case 'conjunto5':
                        // Quinto conjunto de cálculos (con valores diferentes)
                        rataMin = (med.dosisMin * 60) / med.k;
                        rataMax = (med.dosisMax * 60) / med.k;
                        break;
                default:
                    continue; // Si no se reconoce el conjunto, se salta
            }

            // Calcula la rata actual como promedio de las tasas mínima y máxima
            rataActual = (rataMin + rataMax) / 2;

            // Actualiza el DOM con los valores calculados
            document.getElementById(`rataMin-${conjuntoKey}-${medKey}`).innerText = rataMin.toFixed(1);
            document.getElementById(`rataMax-${conjuntoKey}-${medKey}`).innerText = rataMax.toFixed(1);
            document.getElementById(`rataActual-${conjuntoKey}-${medKey}`).innerText = rataActual.toFixed(1);
        }
    }
}

// Inicializa la aplicación
document.addEventListener('DOMContentLoaded', crearTarjetas);