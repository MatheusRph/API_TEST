function days() {
    const date = new Date();
    const hoje = date.getDate();
    const ultimoDiaDoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    for (let i = 1; i <= 7; i++) {
        let dia = hoje + i;
        // Se ultrapassar o último dia do mês, volta ao início do mês
        if (dia > ultimoDiaDoMes) {
            dia = dia - ultimoDiaDoMes;
        }
        const icon = document.getElementById(String(i));
        if (icon) {
            icon.src = `./img/days/${dia}.png`;
        }

        const newDate = new Date();
        newDate.setDate(newDate.getDate() + i); // Ajustando o índice para começar do 0
        const options = { weekday: 'long' };
        const diaDaSemana = newDate.toLocaleDateString('pt-BR', options);
        const diaFormatado = diaDaSemana.replace("-feira", "");
        document.getElementById(`dia${i}`).textContent = diaFormatado[0].toUpperCase() + diaFormatado.slice(1);
    }
}

days();