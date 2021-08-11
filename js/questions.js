const imgPath = 'img/questions/';

const informatica = [
    {
        text : 'A quanti bit corrisponde un byte?' ,
        answers : [
            '1' ,
            '2' ,
            '4' ,
            '8' ,
        ] ,
        correct : 3 ,
        topic : 'informatica',
    } ,

    {
        text : 'Quale fra questi NON è un linguaggio di programmazione?' ,
        answers : [
            'Python',
            'Java' ,
            'HTML' ,
            'C++' ,
        ] ,
        correct : 2 ,
        topic : 'informatica' ,
    } ,

    {
        text : 'Quale fra questi software è un browser?' ,
        answers : [
            'eMule',
            'Opera' ,
            'Access' ,
            'GIMP' ,
        ] ,
        correct : 1 ,
        topic : 'informatica' ,
    } ,

    {
        text : 'Chi è considerato il \'papà\' del Web?' ,
        answers : [
            'Tim Berners-Lee',
            'Evan You' ,
            'Bill Gates' ,
            'Taylor Otwell ' ,
        ] ,
        correct : 0 ,
        topic : 'informatica' ,
    } ,

    {
        text : 'Quale linguaggio viene impiegato per gestire il layout delle pagine Web?' ,
        answers : [
            'JavaScript',
            'PHP' ,
            'HTML' ,
            'CSS ' ,
        ] ,
        correct : 3 ,
        topic : 'informatica' ,
    } 
];

const geografia = [
    {
        text : 'Nella cartina fisica dell\'Europa qui sotto, in quale Paese ricade il segnaposto?' ,
        imgName: 'img-001.jpg',
        answers : [
            'Romania' ,
            'Bulgaria' ,
            'Serbia' ,
            'Moldavia'
        ] ,
        correct : 1 ,
        topic : 'geografia' ,
    } ,
    {
        text : 'In quale Paese europeo è stata scattata questa immagine?' ,
        imgName: 'img-002.jpg',
        answers : [
            'Albania' ,
            'Moldavia' ,
            'Macedonia del Nord' ,
            'Kosovo'
        ] ,
        correct : 0 ,
        topic : 'geografia' ,
    } ,

    {
        text : 'Quale fra questi Paesi ha la popolazione maggiore?' ,
        answers : [
            'Spagna' ,
            'Italia' ,
            'Germania' ,
            'Regno Unito'
        ] ,
        correct : 2 ,
        topic : 'geografia' ,
    } ,

    {
        text : 'Quale di queste isole ha l\'estensione maggiore?' ,
        answers : [
            'Sardegna' ,
            'Sicilia' ,
            'Maiorca' ,
            'Cipro'
        ] ,
        correct : 1 ,
        topic : 'geografia' ,
    } ,

    {
        text : 'Con quale di questi Paesi NON confina la Polonia?' ,
        answers : [
            'Russia',
            'Ungheria' ,
            'Slovacchia' ,
            'Ucraina' ,
        ] ,
        correct : 1 ,
        topic : 'geografia' ,
    } ,

    {
        text : 'Quale di queste città si trova più a nord?' ,
        answers : [
            'Londra',
            'Berlino' ,
            'Amsterdam' ,
            'Varsavia ' ,
        ] ,
        correct : 1 ,
        topic : 'geografia' ,
    } ,
    {
        text : 'Osserva l\'immagine qui sotto. Di quale Paese rappresenta la Sagoma?' ,
        imgName: 'img-003.jpg',
        answers : [
            'Ungheria' ,
            'Repubblica Ceca' ,
            'Svizzera' ,
            'Austria'
        ] ,
        correct : 3 ,
        topic : 'geografia' ,
    } ,

    {
        text : 'Quale fra questi Paesi NON si trova nello stesso emisfero degli altri tre?' ,
        answers : [
            'Papua Nuova Guinea' ,
            'Filippine',
            'Malesia',
            'Sri Lanka' ,
        ] ,
        correct : 0 ,
        topic : 'geografia' ,
    }
];

const scienze = [
    {
        text : 'Qual è il numero primo immediatamente superiore a 100?' ,
        answers : [
            '101',
            '102' ,
            '103' ,
            '104' ,
        ] ,
        correct : 0 ,
        topic : 'scienze' ,
    } ,

    {
        text : 'A quanti metri di profondità si trova il punto più profondo degli oceani oggi conosciuto?',
        answers : [
            'Circa 3.000' ,
            'circa 6.000' ,
            'circa 11.000' ,
            'circa 16.000'
        ] ,
        correct : 2 ,
        topic : 'scienze' ,
    } ,

    {
        text : 'Quale fra queste affermazioni sul Sistema Solare è errata?' ,
        answers : [
            'Venere è più distante dal Sole rispetto alla Terra',
            'Il pianeta più vicino al sole è Mercurio' ,
            'Il più grande dei pianeti che ruotano intorno al Sole è Giove' ,
            'La Terra è più grande di Marte' ,
        ] ,
        correct : 0 ,
        topic : 'scienze' ,
    } ,

    {
        text : 'Qual è il simbolo chimico dell\'oro?' ,
        answers : [
            'Au',
            'Go' ,
            'Or' ,
            'Ur ' ,
        ] ,
        correct : 0 ,
        topic : 'scienze' ,
    } ,

    {
        text : 'Se lancio una monetina 5 volte, quante possibilità ci sono che esca sempre \'croce\'?' ,
        answers : [
            '1 su 64',
            '2 su 10' ,
            '1 su 5',
            '1 su 32' ,
        ] ,
        correct : 3 ,
        topic : 'scienze' ,
    },
];

const storia = [

    {
        text : 'Quale di questi personaggi è nato per primo?' ,
        answers : [
            'Charles Darwin',
            'Alessandro Volta' ,
            'Ludwig van Beethoven ' ,
            'Camillo Benso, conte di Cavour' ,
        ] ,
        correct : 1 ,
        topic : 'storia' ,
    } ,

    {
        text : 'In che anno fu portata a termine la prima circumnavigazione completa della Terra?' ,
        answers : [
            '1492',
            '1501' ,
            '1601' ,
            '1522 ' ,
        ] ,
        correct : 3 ,
        topic : 'storia' ,
    } ,

    {
        text : 'In che anno ha avuto luogo la rivoluzione francese?' ,
        answers : [
            '1679' ,
            '1897' ,
            '1789' ,
            '1767'
        ] ,
        correct : 2 ,
        topic : 'storia' ,
    } ,

    {
        text : 'In quale anno il Titanic affondò?' ,
        answers : [
            '1901',
            '1920' ,
            '1921' ,
            '1912' ,
        ] ,
        correct : 3 ,
        topic : 'storia' ,
    } ,

    {
        text : 'Quale papa fu eletto lo stesso anno della scoperta dell\'America?' ,
        answers : [
            'Alessandro VI',
            'Sisto IV' ,
            'Callisto III' ,
            'Giulio II ' ,
        ] ,
        correct : 0 ,
        topic : 'storia' ,
    },

    {
        text : 'Quale di questi personaggi nacque e morì nel corso dello stesso secolo?' ,
        answers : [
            'Leonardo da Vinci',
            'Napoleone Bonaparte' ,
            'Lorenzo de\' Medici' ,
            'Dante Alighieri' ,
        ] ,
        correct : 2 ,
        topic : 'storia' ,
    }
];

const topics =   [
    {
        label : 'tutto' ,
        questions : [...storia , ...informatica , ...geografia , ...scienze]
    } ,
    {
        label     : 'storia' ,
        questions :  storia
    } ,
    {
        label     : 'informatica' ,
        questions :  informatica
    } ,
    {
        label     : 'geografia' ,
        questions :  geografia
    } ,
    {
        label     : 'scienze' ,
        questions :  scienze
    } ,    
];

