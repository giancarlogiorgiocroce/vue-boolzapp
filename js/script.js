/*
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto.

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/


const app = new Vue({
    el: "#app",

    data: {
        user:{
            name: "Anna dall'Anna",
            avatar: "_io"
        },

        dataArray: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],

        currentContactIndex: 0,

        inputMessage: null,

        searching: "",

        isChevronActive: false,

        now: dayjs().format("DD/MM/YYYY HH:mm:ss")
    },
    
    methods:{
        changeChat(i){
            this.currentContactIndex = i;
        },
        isLastMessage(){
            this.lastMessage = 1;
        },
        getLastMessage(user){
            const lastMsg = user.messages[user.messages.length-1];
            return lastMsg;
        },
        sendNewMessage(){
            const newMessage = this.inputMessage;
            const newMessageArray = {
                date: this.now,
                message: newMessage,
                status: 'sent',
            };
            this.dataArray[this.currentContactIndex].messages.push(newMessageArray);
            this.inputMessage = "";
            // this.getResponse();
        },
        extendDate(date){
            if(date < 10) return "0"+date;
            else return date;
        },
        getResponse(){
            setTimeout(()=>{
                const possibleResponses = [
                    {
                        date: this.now,
                        message: "Da grandi poteri, derivano grandi responsabilità",
                        status: "received",
                    },
                    {
                        date: this.now,
                        message: "La vita è come una scatola di cioccolatini, non sai mai quello che ti capita.",
                        status: "received",
                    },
                    {
                        date: this.now,
                        message: "Il mondo è un biscotto, ma se piove si scioglie.",
                        status: "received",
                    },
                    {
                        date: this.now,
                        message: "Va bene gli aforismi di Osho, ma ricordiamoci che era un terrorista...",
                        status: "received",
                    },
                    {
                        date: this.now,
                        message: "I canederli, alla fin fine, sono solo palle di pane in brodo.",
                        status: "received",
                    },
                    {
                        date: this.now,
                        message: "Quando sento parlare Orsini mi prudono solo le mani",
                        status: "received",
                    },
                    
                ];

                this.dataArray[this.currentContactIndex].messages.push(possibleResponses[this.getRandomNumber(possibleResponses)]);

            }, 1000);
        },
        getRandomNumber(max){
            return Math.floor(Math.random() * max.length);
        },
        removeMessage(el, i){
            const emptyMsg = {
                date: "",
                message: "",
                status: "last",
            };

            if (this.dataArray[this.currentContactIndex].messages.length == 1) {
                this.dataArray[this.currentContactIndex].messages.push(emptyMsg);
                this.dataArray[this.currentContactIndex].messages.splice(i, 1);
            } else{
                this.dataArray[this.currentContactIndex].messages.splice(i, 1);
            }

        }
    }
})