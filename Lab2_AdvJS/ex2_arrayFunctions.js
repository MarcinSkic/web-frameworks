const tasks = [
    {
        id: 1,
        tekst: "Zrobienie zakupów",
        zrealizowano: true
    },
    {
        id: 2,
        tekst: "Przegląd techniczny samochodu",
        zrealizowano: false
    },
    {
        id: 3,
        tekst: "Wizyta u dentysty",
        zrealizowano: false
    },
]

tasks.forEach(element => {
    console.log(element.tekst)
});

tasksTexts = tasks.map(t => t.tekst);
console.log("Nowa lista stworzona map: ",tasksTexts);

finishedTasksTexts = tasks.filter(t => t.zrealizowano).map(t => t.tekst);
console.log("Lista z zakończonymi zadaniami: ",finishedTasksTexts);