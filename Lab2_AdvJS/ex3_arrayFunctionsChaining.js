const poniedzialek = [
    {
        'nazwa': 'Przygotowania do zajęć z AI',
        'czas': 180
    },
    {
        'nazwa': 'Realizacja projektu z AI',
        'czas': 120
    }
]

const wtorek = [
    {
        'nazwa': 'Rozbudowa swojego bloga',
        'czas': 240
    },
    {
        'nazwa': 'Administrowanie serwisem szkoly',
        'czas': 180
    },
    {
        'nazwa': 'Sluchanie koncertu online',
        'czas': 240
    }
]

console.log(
poniedzialek.reduce((acc,el) => {
    acc.push(el)
    return acc
},    //This line is stupid, I know
wtorek)
.map(el => {
    el.czas /= 60
    return el
})
.filter(el => el.czas <= 2)
.map(el => {
    el.czas *= 35
    return el
})
.reduce((acc,el) => [acc[0] + el.czas]
,[0])
.map(el => `${el}.00PLN`)
.reduce((_,el) => el
,'')
)