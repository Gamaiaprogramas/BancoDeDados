let imagensPorSala;

fetch('./imagens.json') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        imagensPorSala = data;
        console.log(imagensPorSala); 

    
        const salaSelect = document.getElementById('salaSelect');
        Object.keys(imagensPorSala).sort().forEach(sala => { 
            const option = document.createElement('option');
            option.value = sala;
            option.textContent = sala;
            salaSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Houve um problema com o fetch:', error);
    });


document.getElementById('buscarButton').addEventListener('click', () => {
    const sala = document.getElementById('salaSelect').value;
    const nome = document.getElementById('nomeInput').value.trim().toLowerCase();
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = '';
    if (imagensPorSala[sala]) {
        const imagens = imagensPorSala[sala];


        if (imagens.length === 0) {
            resultadoDiv.textContent = 'Não há imagens nesta sala.';
            return;
        }


        const imagensEncontradas = imagens.filter(imagem => imagem.toLowerCase().includes(nome));

    

        imagensEncontradas.sort();

        if (imagensEncontradas.length > 0) {
            imagensEncontradas.forEach(imagemEncontrada => {
                const alunoInfoDiv = document.createElement('div');
                alunoInfoDiv.className = 'aluno-info';

                const img = document.createElement('img');
                img.src = `./imagens/${sala}/${imagemEncontrada}`; 

                const nomeAluno = document.createElement('span');
                nomeAluno.className = 'nome';
                nomeAluno.textContent = imagemEncontrada.replace(/\.(jpg|jpeg|png|gif)$/i, ''); 

                alunoInfoDiv.appendChild(img);
                alunoInfoDiv.appendChild(nomeAluno);
                resultadoDiv.appendChild(alunoInfoDiv);
            });
        } else {
            resultadoDiv.textContent = 'Nenhuma imagem encontrada.';
        }
    } else {
        resultadoDiv.textContent = 'Sala não encontrada.';
    }
});
