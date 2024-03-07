function prev(city){
    fetch(`/prev/${city}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao buscar dados climáticos: ' + response.status);
    })
    .then(data => {
        const mediasTemp = data.mediasTemp[1];
        // const probabilidadeClima = data.probabilidadeClima;

        // // Agora você pode usar essas informações como desejar
        // console.log('Médias de temperatura:', mediasTemp);
        // console.log('Probabilidade de clima:', probabilidadeClima);

        // // hideLoading();

        for(let i = 0; i < mediasTemp.length; i++) {
            console.log(mediasTemp[i])
        }
    })
    .catch(error => {
        // hideLoading();
    });
}