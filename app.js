const codes = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
};

const reverseCodes = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
};

let someMessage = false; // Variable para saber si se ha ingresado un mensaje

const regex = /[áéíóú\d]/; // Expresión regular para encontrar caracteres acentuados o números

function messageProccesed1(status) {
    if (status) {
        $(".buttonsCopySave").removeClass("d-none"); //mostramos los botones de copiar y guardar
    } else {
        $(".buttonsCopySave").removeClass("d-none"); //mostramos los botones de copiar y guardar
    }
}

function encryptButtonPressed() {
    $("#encrypt-btn").click(function () {
        let text = $(".inputMessage").val(); //obtenemos el texto del input o textarea
        if (text.length === 0) {
            alert("Debes ingresar un mensaje"); //si el texto está vacío, muestra un alert
            return;
        }

        if (regex.test(text)) {
            alert("No se permiten acentos ni numeros"); //si el texto tiene acentos, muestra un alert
            return;
        }

        text = text.toLowerCase(); //convierte el texto a minúsculas

        let encryptedText = ""; //creamos una variable para guardar el texto encriptado
        for (let i = 0; i < text.length; i++) {
            let letter = text[i]; //obtenemos la letra en la posición i
            if (codes[letter]) {
                //verificamos si la letra está en el objeto codes
                encryptedText += codes[letter]; //si la letra está en el objeto codes, la reemplaza
            } else {
                encryptedText = encryptedText + letter; //si no está en el objeto codes, la deja igual
            }
        }

        //ahora modificamos el texto en el html del resultado
        modifyTextProccess(encryptedText);
        messageProccesed1(true); //llamamos a la función para mostrar los botones de copiar y guardar
    });
}

function decryptButtonPressed() {
    $("#decrypt-btn").click(function () {
        let text = $(".inputMessage").val(); //obtenemos el texto del input o textarea
        if (text.length === 0) {
            alert("Debes ingresar un mensaje"); //si el texto está vacío, muestra un alert
            return;
        }

        if (regex.test(text)) {
            alert("No se permiten acentos ni numeros"); //si el texto tiene acentos, muestra un alert
            return;
        }
        text = text.toLowerCase(); //convierte el texto a minúsculas

        let decryptedText = ""; //creamos una variable para guardar el texto desencriptado
        let i = 0;
        while (i < text.length) {
            //recorremos el texto
            let found = false; //creamos una variable para saber si encontramos la la secuencia
            //de letras encriptadas en el texto y en el objeto reverseCodes
            for (let key in reverseCodes) {
                //recorremos el objeto reverseCodes para buscar la secuencia de letras encriptadas
                if (text.substr(i, key.length) === key) {
                    //si encontramos la secuencia de letras encriptadas
                    decryptedText += reverseCodes[key]; //agregamos la letra desencriptada a la variable decryptedText
                    i += key.length; //aumentamos la variable i con la longitud de la secuencia de letras encriptadas
                    found = true; //cambiamos la variable found a true
                    break; //salimos del ciclo for
                }
            }
            if (!found) {
                decryptedText += text[i]; //si no encontramos la secuencia de letras encriptadas, agregamos la letra tal cual
                i++;
            }
        }
        modifyTextProccess(decryptedText); //modificamos el texto en el html del resultado
        messageProccesed1(true); //llamamos a la función para mostrar los botones de copiar y guardar
    });
}

function modifyTextProccess(encryptedDecryptedText) {
    // Función para modificar el texto en el html
    let responseHtml = "<h4>" + encryptedDecryptedText + "</h4>";
    $(".messageProcess").html(responseHtml);
}

function copyMessage() {
    // Función para copiar el mensaje
    $("#copyMessage").click(function () {
        let copyText = $(".messageProcess").text(); // Obtiene el texto del mensaje
        navigator.clipboard.writeText(copyText); // Copia el texto al portapapeles
        alert("Mensaje copiado"); // Muestra un mensaje de alerta
    });
}

function saveMessage() {
    // Función para guardar el mensaje
    $("#saveMessage").click(function () {
        let text = $(".messageProcess").text(); // Obtiene el texto del mensaje
        $("#io-section").removeClass("col-md-12 col-lg-12"); // Quita la clase col-12
        $("#io-section").addClass("col-md-8 col-lg-8"); // Agrega la clase col-6
        $("#savedMessages").removeClass("d-none"); // Muestra el div de los mensajes guardados
        $(".list-group").append(
            '<li class="list-group-item d-flex justify-content-between align-items-center">' +
                text /*+
                '<button type="button" class="btn copy">Copy</button>'*/ +
                "</li>"
        );
    });
}

encryptButtonPressed(); // Llama a la función para que se ejecute al cargar la página
decryptButtonPressed(); // Llama a la función para que se ejecute al cargar la página
copyMessage(); // Llama a la función para que se ejecute al cargar la página
saveMessage(); // Llama a la función para que se ejecute al cargar la página
