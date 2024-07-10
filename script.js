//Menú

function toggleMenu() {
    var menu = document.getElementById("navbarMenu");
    menu.classList.toggle("active");
}


//Formato porcentaje de licencia

function formatPercentage(input) {
    let value = input.value.replace(/[^0-9.]/g, ''); // Elimina todo lo que no sea un número o un punto decimal
    if (value) {
        input.value = value + '%';
    } else {
        input.value = '';
    }
}

//Formato tiempo para horario de clase

function formatTime(input) {
    let value = input.value.replace(/\D/g, ''); // Elimina todo lo que no sea un número
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue += value.substr(0, 2); // Los primeros dos caracteres son horas
        if (value.length > 2) {
            formattedValue += ':' + value.substr(2, 2); // Los siguientes dos caracteres son minutos
            if (value.length > 4) {
                formattedValue += '-' + value.substr(4, 2); // Los siguientes dos caracteres son horas
                if (value.length > 6) {
                    formattedValue += ':' + value.substr(6, 2); // Los últimos dos caracteres son minutos
                }
            }
        }
    }

    input.value = formattedValue;
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const about = document.getElementById('about');

    document.getElementById('inicio').addEventListener('click', () => {
        form.style.display = 'block';
        about.style.display = 'none';
    });

    document.getElementById('imprimir').addEventListener('click', () => {
        // Asegurarse de que el formulario esté visible antes de imprimir
        form.style.display = 'block';
        about.style.display = 'none';

        // Create a temporary element to hold the form content
        const printContent = document.createElement('div');
        printContent.appendChild(form.cloneNode(true)); // Clone the form

        // Hide other content and append the temporary element (as before)
        const otherContent = document.querySelectorAll('body > *:not(#form)');
        otherContent.forEach(element => element.style.display = 'none');
        document.body.appendChild(printContent);

        // Use a timeout to ensure content is settled before printing
        setTimeout(() => {
            window.print(); // Print the temporary element with the form
            document.body.removeChild(printContent); // Remove the temporary element
            otherContent.forEach(element => element.style.display = ''); // Restore visibility
        }, 100); // Adjust timeout if necessary
    });

    document.getElementById('acerca').addEventListener('click', () => {
        form.style.display = 'none';
        about.style.display = 'block';
    });

    document.getElementById('guardar').addEventListener('click', () => {
        const formData = gatherFormData();
        localStorage.setItem('formData', JSON.stringify(formData));
        alert('Los datos se guardaron en tu navegador únicamente');
    });

    document.getElementById('limpiar').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que querés limpiar todos los datos del formulario?')) {
            form.reset();
            localStorage.removeItem('formData');
            alert('Los datos del formulario han sido borrados');
        }
    });

    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        populateFormData(savedData);
    }
});



function gatherFormData() {
    const formData = {
        caratulaTramite: {
            tipoTramite: document.getElementById('tipoTramite').value,
            tipo: document.getElementById('tipo').value,
            dtoTipoTram: document.getElementById('dto').value,
            cueTipTram: document.getElementById('cueTipTram').value,
            numero: document.getElementById('numero').value,
            anio: document.getElementById('anio').value
        },
        datosSolicitante: {
            apellidos: document.getElementById('apellidos').value,
            nombres: document.getElementById('nombres').value,
            numeroDocumento: document.getElementById('numeroDocumento').value,
            tipoDoc: document.querySelector('input[name="tipoDoc"]:checked') ? document.querySelector('input[name="tipoDoc"]:checked').value : null,
            sexo: document.querySelector('input[name="sexo"]:checked') ? document.querySelector('input[name="sexo"]:checked').value : null,
            fechaSolicitante: document.getElementById('fechaSolicitante').value
        },
        establecimientoIniciador: {
            nombreEstablecimientoInic: document.getElementById('nombreEstablecimientoInic').value,
            cueEstablecimientoInic: document.getElementById('cueEstablecimientoInic').value
        },
        datosTramite: {
            fechaInicio: document.getElementById('fechaInicio').value,
            fechaFinalizacion: document.getElementById('fechaFinalizacion').value
        },
        designaciones: {
            fechaTomaPosesion: document.getElementById('fechaTomaPosesion').value,
            apellidoNombreAgenteReemplazado: document.getElementById('apellidoNombreAgenteReemplazado').value,
            numeroDocumentoReemplazado: document.getElementById('numeroDocumentoReemplazado').value,
            numActaAdj: document.getElementById('numActaAdj').value,
            puntajeAdj: document.getElementById('puntajeAdj').value
        },
        licencias: {
            licRemunerada: document.getElementById('licRemunerada').value,
            porcentaje: document.getElementById('porcentaje').value,
            cantDiasSolicitados: document.getElementById('cantDiasSolicitados').value,
            obligaciones: document.getElementById('obligaciones').value,
            normaLegal: document.getElementById('normaLegal').value,
            articulo: document.getElementById('articulo').value,
            inciso: document.getElementById('inciso').value
        },
        traslados: {
            causaTraslado: document.getElementById('causaTraslado').value,
            destinoTraslado: document.getElementById('destinoTraslado').value
        },
        permutas: {
            apellidoNombrePermutante: document.getElementById('apellidoNombrePermutante').value,
            numeroDocumentoPermutante: document.getElementById('numeroDocumentoPermutante').value
        },
        bajaCese: {
            motivoBaja: document.getElementById('motivoBaja').value
        },
        fechas: {
            fechaSolicitante: document.getElementById('fechaSolicitante').value,
            fechaDirector: document.getElementById('fechaDirector').value,
            fechaResponsable: document.getElementById('fechaResponsable').value
        },
        establecimientos: []
    };

    // Iterar sobre los 4 establecimientos
    for (let establ = 1; establ <= 4; establ++) {
        let establecimiento = {
            numero: establ,
            nombre: document.getElementById(`nombreEstablecimiento${establ}`).value, // Nuevo campo para el nombre del establecimiento
            cue: document.getElementById(`cueEstablecimiento${establ}`).value,
            nivel: document.getElementById(`nivelEstablecimiento${establ}`).value,
            filas: []
        };

        // Iterar sobre las 7 filas de cada establecimiento
        for (let fila = 1; fila <= 7; fila++) {
            let filaDatos = {
                cargo: document.getElementById(`cargo${fila}_${establ}`).value,
                turno: document.getElementById(`turno${fila}_${establ}`).value,
                curso: document.getElementById(`curso${fila}_${establ}`).value,
                division: document.getElementById(`division${fila}_${establ}`).value,
                horas_catedras: document.getElementById(`horas${fila}_${establ}`).value,
                situacion_revista: document.getElementById(`revista${fila}_${establ}`).value,
                antiguedad: document.getElementById(`ant${fila}_${establ}`).value,
                frente_alumno: document.getElementById(`alumnoSiNo${fila}_${establ}`).value,
                dia: document.getElementById(`dia${fila}_${establ}`).value,
                horario: document.getElementById(`horario${fila}_${establ}`).value
            };


            // Agregar fila de datos al establecimiento actual
            establecimiento.filas.push(filaDatos);

        }

        // Agregar establecimiento al array de establecimientos
        formData.establecimientos.push(establecimiento);
    };

    return formData;
}


function populateFormData(formData) {
    document.getElementById('tipoTramite').value = formData.caratulaTramite.tipoTramite || '';
    document.getElementById('tipo').value = formData.caratulaTramite.tipo || '';
    document.getElementById('dto').value = formData.caratulaTramite.dtoTipoTram || '';
    document.getElementById('cueTipTram').value = formData.caratulaTramite.cueTipTram || '';
    document.getElementById('numero').value = formData.caratulaTramite.numero || '';
    document.getElementById('anio').value = formData.caratulaTramite.anio || '';

    document.getElementById('apellidos').value = formData.datosSolicitante.apellidos || '';
    document.getElementById('nombres').value = formData.datosSolicitante.nombres || '';
    document.getElementById('numeroDocumento').value = formData.datosSolicitante.numeroDocumento || '';
    if (formData.datosSolicitante.tipoDoc) {
        document.querySelector(`input[name="tipoDoc"][value="${formData.datosSolicitante.tipoDoc}"]`).checked = true;
    }
    if (formData.datosSolicitante.sexo) {
        document.querySelector(`input[name="sexo"][value="${formData.datosSolicitante.sexo}"]`).checked = true;
    }
    document.getElementById('fechaSolicitante').value = formData.datosSolicitante.fechaSolicitante || '';

    document.getElementById('nombreEstablecimientoInic').value = formData.establecimientoIniciador.nombreEstablecimientoInic || '';
    document.getElementById('cueEstablecimientoInic').value = formData.establecimientoIniciador.cueEstablecimientoInic || '';

    document.getElementById('fechaInicio').value = formData.datosTramite.fechaInicio || '';
    document.getElementById('fechaFinalizacion').value = formData.datosTramite.fechaFinalizacion || '';

    document.getElementById('fechaTomaPosesion').value = formData.designaciones.fechaTomaPosesion || '';
    document.getElementById('apellidoNombreAgenteReemplazado').value = formData.designaciones.apellidoNombreAgenteReemplazado || '';
    document.getElementById('numeroDocumentoReemplazado').value = formData.designaciones.numeroDocumentoReemplazado || '';
    document.getElementById('numActaAdj').value = formData.designaciones.numActaAdj || '';
    document.getElementById('puntajeAdj').value = formData.designaciones.puntajeAdj || '';

    document.getElementById('licRemunerada').value = formData.licencias.licRemunerada || '';
    document.getElementById('porcentaje').value = formData.licencias.porcentaje || '';
    document.getElementById('cantDiasSolicitados').value = formData.licencias.cantDiasSolicitados || '';
    document.getElementById('obligaciones').value = formData.licencias.obligaciones || '';
    document.getElementById('normaLegal').value = formData.licencias.normaLegal || '';
    document.getElementById('articulo').value = formData.licencias.articulo || '';
    document.getElementById('inciso').value = formData.licencias.inciso || '';

    document.getElementById('causaTraslado').value = formData.traslados.causaTraslado || '';
    document.getElementById('destinoTraslado').value = formData.traslados.destinoTraslado || '';

    document.getElementById('apellidoNombrePermutante').value = formData.permutas.apellidoNombrePermutante || '';
    document.getElementById('numeroDocumentoPermutante').value = formData.permutas.numeroDocumentoPermutante || '';

    document.getElementById('motivoBaja').value = formData.bajaCese.motivoBaja || '';

    document.getElementById('fechaSolicitante').value = formData.fechas.fechaSolicitante || '';
    document.getElementById('fechaDirector').value = formData.fechas.fechaDirector || '';
    document.getElementById('fechaResponsable').value = formData.fechas.fechaResponsable || '';

    // Rellenar datos de establecimientos
    formData.establecimientos.forEach((establecimiento, index) => {
        document.getElementById(`nombreEstablecimiento${index + 1}`).value = establecimiento.nombre || ''; // Nuevo campo para el nombre del establecimiento
        document.getElementById(`cueEstablecimiento${index + 1}`).value = establecimiento.cue || ''; // Campo para el cue del establecimiento
        document.getElementById(`nivelEstablecimiento${index + 1}`).value = establecimiento.nivel || ''; // Campo para el nivel del establecimiento
        establecimiento.filas.forEach((filaDatos, filaIndex) => {
            document.getElementById(`cargo${filaIndex + 1}_${index + 1}`).value = filaDatos.cargo || '';
            document.getElementById(`turno${filaIndex + 1}_${index + 1}`).value = filaDatos.turno || '';
            document.getElementById(`curso${filaIndex + 1}_${index + 1}`).value = filaDatos.curso || '';
            document.getElementById(`division${filaIndex + 1}_${index + 1}`).value = filaDatos.division || '';
            document.getElementById(`horas${filaIndex + 1}_${index + 1}`).value = filaDatos.horas_catedras || '';
            document.getElementById(`revista${filaIndex + 1}_${index + 1}`).value = filaDatos.situacion_revista || '';
            document.getElementById(`ant${filaIndex + 1}_${index + 1}`).value = filaDatos.antiguedad || '';
            document.getElementById(`alumnoSiNo${filaIndex + 1}_${index + 1}`).value = filaDatos.frente_alumno || '';
            document.getElementById(`dia${filaIndex + 1}_${index + 1}`).value = filaDatos.dia || '';
            document.getElementById(`horario${filaIndex + 1}_${index + 1}`).value = filaDatos.horario || '';
        });
    });
}

// Función para desplazar la página al campo activo
function scrollIntoViewIfNeeded(target) {
    const rect = target.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Escuchar el evento focus en todos los elementos del formulario
const formElements = document.querySelectorAll('input, textarea');
formElements.forEach(element => {
    element.addEventListener('focus', function () {
        scrollIntoViewIfNeeded(this);
    });
});

// Agregar tooltips a las opciones del datalist
const options = document.querySelectorAll('#itemTurnos option');
options.forEach(option => {
    option.addEventListener('mouseover', function () {
        this.setAttribute('title', this.getAttribute('title'));
    });
});
