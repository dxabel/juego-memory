
const grupoTarjetas = ["🦄", "🍦", "🌈", "👽", "👾", "🤖", "👹", "👺"]
const totalTarjetas = [...grupoTarjetas, ...grupoTarjetas]

let primeraSeleccion = null
let bloquearClick = false

const barajaTarjetas = () => {
    return totalTarjetas.sort(() => Math.random() - 0.5)
};

const reparteTarjetas = () => {
    const mesa = document.querySelector("#mesa")
    mesa.innerHTML = ""

    const tarjetasBarajadas = barajaTarjetas()

    tarjetasBarajadas.forEach(emoji => {
        const tarjeta = document.createElement("div")
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `<div class="tarjeta__contenido">${emoji}</div>`

        tarjeta.addEventListener("click", () => {

            if (bloquearClick || tarjeta.classList.contains("descubierta")) return
            tarjeta.classList.add("descubierta")

            if (!primeraSeleccion) {
                primeraSeleccion = tarjeta
            } else {

                const segundaSeleccion = tarjeta
                const emoji1 = primeraSeleccion.querySelector(".tarjeta__contenido").innerText
                const emoji2 = segundaSeleccion.querySelector(".tarjeta__contenido").innerText

                if (emoji1 === emoji2) {

                    primeraSeleccion = null
                } else {

                    bloquearClick = true
                    setTimeout(() => {
                        primeraSeleccion.classList.remove("descubierta")
                        segundaSeleccion.classList.remove("descubierta")
                        primeraSeleccion = null
                        bloquearClick = false
                    }, 1000)
                }
            }
        })

        mesa.appendChild(tarjeta)
    })
}

reparteTarjetas()