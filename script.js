async function ingresoHome(user_mail, password){
    let url = "http://localhost:3000/usuarios?mail=" + mail + "&clave="+ password;
    var response = await fetch (url);
    var data = await response.json();
    var string = await JSON.stringify(data);
    console.log(string);
    localStorage.setItem('usuarioLogueado', string);
    if(response.ok) {
        window.location.href = './clientes.html'
    } else {
        alert('ERROR!!')
    }
    
}