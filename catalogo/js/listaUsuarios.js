/*var arreglo=[];
arreglo[0]=3;
arreglo[5]="Hola";
arreglo.push("Mundo");
var usuario={nombre:"Uriel Perez",
            correo:"uriel@gmail.com",
            telefono:'1234567890'};
usuario.password="123";
var usuario2={};
usuario2.nombre="Karina";
arreglo.push(usuario);
arreglo.push(usuario2);
console.log(arreglo);
*/
//JSON (JavaScript Object Notation)
//{atributo1:valor,atributo2:valor}
/*sessionStorage (tiempo de vida limitado al cierre del navegador)
localStorage (tiempo de vida dependiente de que el usuario borre)*/

document.addEventListener("DOMContentLoaded", () => {
    inicializarDatos();
    cargarTabla();
    document.getElementById("txtNombre").onkeyup = e => revisarControl(e, 2, 60);
    document.getElementById("txtTelefono").onkeyup = e => {
        if (e.target.value.trim().length > 0)
            revisarControl(e, 10, 10);
        else if(e.target.value.trim().length==0)
            revisarControl(e, 0, 0);
    }
    document.getElementById("txtPassword").onkeyup = e => {
        revisarControl(e, 6, 20);
    }
    document.getElementById("txtConfirmarPassword").onkeyup = e => {
        let checar = document.getElementById("txtPassword");
        let checar2 = document.getElementById("txtConfirmarPassword");
        txt = e.target;
        txt.setCustomValidity("");
        txt.classList.remove("valido");
        txt.classList.remove("novalido");
        if(checar.value!=checar2.value)
        {
            txt.classList.add("novalido");
        }
        else
        {
            txt.classList.add("valido");
        }
    }
    document.getElementById("txtAntiguaPassword").onkeyup = e => {
        revisarControl(e, 6, 20);
    }
    document.getElementById("txtNuevaPassword").onkeyup = e => {
        revisarControl(e, 6, 20);
    }
    document.getElementById("txtConfirmarPasswordRes").onkeyup = e => {
        let checar = document.getElementById("txtNuevaPassword");
        let checar2 = document.getElementById("txtConfirmarPasswordRes");
        txt = e.target;
        txt.setCustomValidity("");
        txt.classList.remove("valido");
        txt.classList.remove("novalido");
        if(checar.value!=checar2.value)
        {
            txt.classList.add("novalido");
        }
        else
        {
            txt.classList.add("valido");
        }
    }

    document.getElementById("btnLimpiar").addEventListener("click", e => {
        e.target.form.classList.remove("validado");
        //Iterar todos los controles del form
        //debugger;
        let controles = e.target.form.querySelectorAll("input,select");
        controles.forEach(control => {
            control.classList.remove("valido");
            control.classList.remove("novalido");
        });
        //console.log(controles);
    });
    document.getElementById("btnLimpiarRestablecer").addEventListener("click", e => {
        e.target.form.classList.remove("validado");
        //Iterar todos los controles del form
        //debugger;
        let controles = e.target.form.querySelectorAll("input,select");
        controles.forEach(control => {
            control.classList.remove("valido");
            control.classList.remove("novalido");
        });
        //console.log(controles);
    });
    document.getElementById("btnAceptar").addEventListener("click", e => {
        //document.getElementById("msgDuplicado").classList.remove("show");
        let alert = e.target.parentElement.querySelector(".alert");
        if (alert) {
            alert.remove();
        }

        e.target.form.classList.add("validado");
        let txtNombre = document.getElementById("txtNombre");
        let txtContrasenia = document.getElementById("txtPassword");
        let txtContrasenia2 = document.getElementById("txtConfirmarPassword");
        let txtEmail = document.getElementById("txtEmail");
        let txtTel = document.getElementById("txtTelefono");
        txtNombre.setCustomValidity("");
        txtContrasenia.setCustomValidity("");
        txtContrasenia2.setCustomValidity("");
        txtEmail.setCustomValidity("");
        txtTel.setCustomValidity("");

        if (txtNombre.value.trim().length < 2 ||
            txtNombre.value.trim().length > 60) {
            txtNombre.setCustomValidity("El nombre es obligatorio (entre 2 y 60 caracteres)");
        }
        if (txtContrasenia.value.trim().length < 6 ||
            txtContrasenia.value.trim().length > 20) {
            txtContrasenia.setCustomValidity("La contraseña es obligatoria (entre 6 y 20 caracteres)");
        }

        if (txtTel.value.trim().length > 0 && txtTel.value.trim().length != 10) {
            txtTel.setCustomValidity("El teléfono debe tener 10 dígitos");
        }

        if(txtContrasenia.value != txtContrasenia2.value)
        {
            txtContrasenia2.setCustomValidity("La contraseña es obligatoria y deben coincidir");
        }


        if (e.target.form.checkValidity()) {
            //Crear el objeto usuario y guardarlo en el storage
            let correo=document.getElementById("txtCorreoOriginal").value.trim();
            let usuario = {
                nombre: txtNombre.value.trim(),
                correo: txtEmail.value.trim(),
                password: txtContrasenia.value.trim(),
                telefono: txtTelefono.value.trim()
            };
            
            let usuarios = JSON.parse(localStorage.getItem("usuarios"));
            // Para cuando quieres agregar
            if(document.querySelector("#mdlRegistro .modal-title").innerText=='Agregar'){
                let usuarioEncontrado = usuarios.find((element) => usuario.correo == element.correo);
                if (usuarioEncontrado) {
                    
                    let alerta = document.createElement('div');
                    alerta.innerHTML = 'Este correo ya se encuentra registrado, favor de usar otro <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
                    alerta.className = "alert alert-warning alert-dismissible fade show";
                    
                    e.target.parentElement.insertBefore(alerta, e.target);
                    //e.target.parentElement.innerHTML=alerta+e.target.parentElement.innerHTML;
                    //debugger;
                    //document.getElementById("msgDuplicado").classList.add("show");
                    setTimeout(() => {
                        //Destruir la alerta
                        alerta.remove();
                    }, 3000);

                    e.preventDefault();
                    return;
                }
                usuarios.push(usuario);
            // para cuando vas a editar
            }else{
                if(usuario.correo!=correo){
                    let usuarioEncontrado = usuarios.find((element) => usuario.correo == element.correo);
                    let usuarioEncontrado2 = usuarios.find((element) => correo == element.correo);
                    let posicion = usuarios.indexOf(usuarioEncontrado2);
                    if (usuarioEncontrado) {
                        let alerta = document.createElement('div');
                        alerta.innerHTML = 'Este correo ya se encuentra registrado, favor de usar otro <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
                        alerta.className = "alert alert-warning alert-dismissible fade show";
                        
                        e.target.parentElement.insertBefore(alerta, e.target);
                    
                        setTimeout(() => {
                            alerta.remove();
                        }, 3000);
    
                        e.preventDefault();
                        return;
                    }
                    usuarios[posicion]=usuario;
                }
                else
                {
                    let usuarioEncontrado = usuarios.find((element) => usuario.correo == element.correo);
                    let posicion = usuarios.indexOf(usuarioEncontrado);
                    usuarios[posicion]=usuario;
                }
                
            }
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            /*const mdlRegistro = bootstrap.Modal.getInstance('#mdlRegistro');
            mdlRegistro.hide();*/
        } else {
            e.preventDefault();
        }
    });

    document.getElementById("btnSuccess").addEventListener("click", e => {
        let alert = e.target.parentElement.querySelector(".alert");
        if (alert) {
            alert.remove();
        }

        e.target.form.classList.add("validado");

        let txtAntiguaContrasenia = document.getElementById("txtAntiguaPassword");
        let txtNuevaContrasenia = document.getElementById("txtNuevaPassword");
        let txtConfirmarContrasenia = document.getElementById("txtConfirmarPasswordRes");
        let boton = document.getElementById("btnSuccess");
        txtAntiguaContrasenia.setCustomValidity("");
        txtNuevaContrasenia.setCustomValidity("");
        txtConfirmarContrasenia.setCustomValidity("");

        if (txtAntiguaContrasenia.value.trim().length < 6 ||
            txtAntiguaContrasenia.value.trim().length > 20) {
            txtAntiguaContrasenia.setCustomValidity("La antigua contraseña es obligatoria (entre 6 y 60 caracteres)");
        }
        if (txtNuevaContrasenia.value.trim().length < 6 ||
            txtNuevaContrasenia.value.trim().length > 20) {
            txtNuevaContrasenia.setCustomValidity("La nueva contraseña es obligatoria (entre 6 y 60 caracteres)");
        }
        if(txtNuevaContrasenia.value!=txtConfirmarContrasenia.value)
        {
            txtConfirmarContrasenia.setCustomValidity("La contraseña es obligatoria y deben coincidir");
        }
        if (e.target.form.checkValidity()) {
            let usuarios = JSON.parse(localStorage.getItem("usuarios"));
            let usuarioEncontrado = usuarios.find((element) => boton.value == element.correo);
            let posicion = usuarios.indexOf(usuarioEncontrado);
            //console.log(usuarios[posicion].password);
            if(usuarios[posicion].password!=txtAntiguaContrasenia.value)
            {
                let alerta = document.createElement('div');
                alerta.innerHTML = 'La contraseña no coincide, intentelo de nuevo<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
                alerta.className = "alert alert-warning alert-dismissible fade show";
                    
                e.target.parentElement.insertBefore(alerta, e.target);
                setTimeout(() => {
                    //Destruir la alerta
                    alerta.remove();
                }, 3000);

                e.preventDefault();
            }
            else
            {
                usuarios[posicion].password = txtNuevaContrasenia.value;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                location.reload();
            }
        } else {
            e.preventDefault();
        }
    });

    document.getElementById("mdlRegistro").addEventListener('shown.bs.modal', (e) => {
        document.getElementById("btnLimpiar").click();
        let operacion=e.relatedTarget.innerText;
        
        e.target.querySelector(".modal-title").innerText=operacion;

        //Identificar si vamos editar para cargar los datos
        if(operacion=='Editar'){
            let correo=e.relatedTarget.value;
            let usuarios=JSON.parse(localStorage.getItem('usuarios'));
            let usuario=usuarios.find((element=>element.correo==correo));
            document.getElementById("txtNombre").value=usuario.nombre;
            document.getElementById("txtEmail").value=usuario.correo;
            document.getElementById("txtCorreoOriginal").value=usuario.correo;
            document.getElementById("txtTelefono").value=usuario.telefono;
            document.getElementById("generalPassword").hidden=true;
            document.getElementById("generalConfirmarPassword").hidden=true;
            document.getElementById("txtPassword").value=usuario.password;
            document.getElementById("txtConfirmarPassword").value=usuario.password;
        }
        else
        {
            document.getElementById("generalPassword").hidden=false;
            document.getElementById("generalConfirmarPassword").hidden=false;
        }
        document.getElementById("txtNombre").focus();
        
    });
    document.getElementById("mdlBorrar").addEventListener('shown.bs.modal', (e) => {
        let contenido=document.getElementById("contenido-borrar");
        contenido.textContent="¿Realmente quieres borrar el usuario con correo: "+e.relatedTarget.value+"?";
        let boton=document.getElementById("btnBorrar");
        boton.value=e.relatedTarget.value;
    });
    document.getElementById("btnBorrar").addEventListener("click", e => {
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        let boton=document.getElementById("btnBorrar");
        let usuarioEncontrado = usuarios.find((element) => boton.value == element.correo);
        let posicion = usuarios.indexOf(usuarioEncontrado);
        usuarios.splice(posicion, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        const mdlBorrar = bootstrap.Modal.getInstance('#mdlBorrar');
        mdlBorrar.hide();
        location.reload();
    });
    document.getElementById("mdlRestablecerPassword").addEventListener('shown.bs.modal', (e) => {
        document.getElementById("btnLimpiarRestablecer").click();
        let boton = document.getElementById("btnSuccess");
        boton.value = e.relatedTarget.value;
        document.getElementById("txtAntiguaPassword").focus();
    });
});

function revisarControl(e, min, max) {
    txt = e.target;
    txt.setCustomValidity("");
    txt.classList.remove("valido");
    txt.classList.remove("novalido");
    if (txt.value.trim().length < min ||
        txt.value.trim().length > max) {
        txt.setCustomValidity("Campo no válido");
        txt.classList.add("novalido");
    } else {
        txt.classList.add("valido");
    }
    /*console.log(txt.value);
    console.log(txt.validity);*/
}

function cargarTabla() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    let tbody = document.querySelector("#tblUsuarios tbody");
    for (var i = 0; i < usuarios.length; i++) {
        usuario = usuarios[i];
        let fila = document.createElement("tr");
        let celda = document.createElement("td");
        celda.innerText = usuario.nombre;
        fila.appendChild(celda);

        celda = document.createElement("td");
        celda.innerText = usuario.correo;
        fila.appendChild(celda);

        celda = document.createElement("td");
        celda.innerText = usuario.telefono;
        fila.appendChild(celda);

        celda = document.createElement("td");
        celda.innerHTML = '<button type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#mdlRegistro" value="'+usuario.correo+'" onclick="editar(' + i + ')">Editar</button>'+
        '<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#mdlBorrar" value="'+usuario.correo+'">Borrar</button>'+
        '<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#mdlRestablecerPassword" value="'+usuario.correo+'">Restablecer contraseña</button>';
        fila.appendChild(celda);
        tbody.appendChild(fila);
    }

}

function inicializarDatos() {
    let usuarios = localStorage.getItem('usuarios');
    if (!usuarios) {
        usuarios = [
            {
                nombre: 'Uriel Perez Gomez',
                correo: 'uriel@gmail.com',
                password: '123456',
                telefono: ''
            },
            {
                nombre: 'Lorena Garcia Hernandez',
                correo: 'lorena@gmail.com',
                password: '567890',
                telefono: '4454577468'
            }
        ];

        //let usuarios=[];
        usuarios.push(
            {
                nombre: 'Uriel Perez Gomez',
                correo: 'uriel1@gmail.com',
                password: '123456',
                telefono: ''
            });
        usuarios.push(
            {
                nombre: 'Lorena Garcia Hernandez',
                correo: 'lorena1@gmail.com',
                password: '567890',
                telefono: '4454577468'
            });

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

    }
}
