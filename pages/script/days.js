function icos(){
    const date = new Date();
    const hoje = date.getDate();
    const ultimoDiaDoMes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    for (let i = 0; i <= 7; i++){
        let dia = hoje + i;
        // Se ultrapassar o último dia do mês, volta ao início do mês
        if (dia > ultimoDiaDoMes) {
            dia = dia - ultimoDiaDoMes;
        }
        const icon = document.getElementById(String(i));
        if (icon) {
            icon.src = `./img/days/${dia}.png`;
        }
    }
}

function days() {
    const date = new Date();

    for (let i = 1; i <= 7; i++) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + i - 1); // Adjusting index to start from 0
        const options = { weekday: 'long' };
        const diaDaSemana = newDate.toLocaleDateString('pt-BR', options);
        const dia = diaDaSemana.replace("-feira", "");
        document.getElementById(`dia${i}`).innerHTML = (dia[0].toUpperCase() + dia.slice(1));
        console.log(dia[0].toUpperCase() + dia.slice(1));
    }
}

function testeee(){
    document.getElementById('climaPng').src = "img/clima/sol.gif"
}