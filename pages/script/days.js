function days() {
    const date = new Date();
    const hoje = date.getDate();
    const mes = date.getMonth();
    const ultimoDiaDoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    document.getElementById("dia0").textContent = mes;
    for (let i = 0; i <= 7; i++) {
        
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
        let diaFormatado = diaDaSemana;
        document.getElementById(`dia${i}`).textContent = diaFormatado[0].toUpperCase() + diaFormatado.slice(1);

        
        if (i !== 0) { // Se não for o dia atual, remove "-feira"
            diaFormatado = diaDaSemana.replace("-feira", "");
        }
        
        document.getElementById(`dia${i}`).textContent = diaFormatado[0].toUpperCase() + diaFormatado.slice(1);

        if (i == 0) {
            document.getElementById("dia0").textContent = diaFormatado[0].toUpperCase()+diaFormatado.slice(1) + " de " + meses[mes]
        }
        
    }
}

days();