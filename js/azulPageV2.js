let PgService = {

    tstDivObj: {
        style: {
            width: '100%',
            margin: '10px',
            minHeight: '100px',
            marginInline: 'auto',
            border: '1px solid green',
        },
        id: 'PgSrv',
        typ: 'div',
    },

    tstTitle: {
        style: {
            color: 'blue',
            margin: 'auto',
            textAlign: 'center',
            fontSize: '1.5rem',
            padding: '0.5em',
            },
        id: 'ServTitle',
        textContent: 'Services',
        typ: 'h3',
    },

    render() {
        let divMain = document.createElement('div');
        const titEl = azul.addElement(this.tstTitle);
        const divSub = azul.addElement(this.tstDivObj);
        divMain.appendChild(titEl);
        divMain.appendChild(divSub);
//      azul.rplSect(divMain);
        return divMain;
    },

	navfun() {
//		console.log('nav fun2!');
		const serv = PgService.render();
		azul.rplSect(serv);
	},

	navfun2() {
		const serv = azul.header.serv;
		azul.rplSect(serv);
	},

};

azul.header.serv = PgService.render();
azul.header.navButHome.addEventListener('click', tstMain.navfun);
azul.header.navBut2.addEventListener('click', PgService.navfun2);

