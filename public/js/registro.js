document.querySelector("#register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.querySelector("#fullName").value;
    const userName = document.querySelector("#userName").value;
    const password = document.querySelector("#password").value;
    const imageId = document.querySelector("#imageId").value;

    const usuario = {
        fullName,
        userName,
        password,
        imagenId: imageId
    };


    try {
        const response = await fetch('http://localhost:3000/api/usuario/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error('Error en el registro');
        }
        document.location.href = "login.html";

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error(error);
        alert('Hubo un error al registrar el usuario');
    }
});
document.querySelector("#imageUploader").addEventListener("change", async () => {
    const input = document.querySelector("#imageUploader");
    const data = new FormData();
    data.append('file', input.files[0]);

    try {
        const response = await fetch('http://localhost:3000/api/image', {
            method: 'POST',
            body: data
        });

        const imageId = await response.json();
        document.getElementById("imageId").value = imageId;
        document.getElementById("miniatura").src = "http://localhost:3000/api/image/" + imageId;
    } catch (error) {
        console.error('Error al subir la imagen:', error);
    }
});