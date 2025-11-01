let ftTerms = {
    parObj: {
        typ: 'p',
        textContent: 'Terms',
        style: {
            margin: '10px',
        },
    },

    render() {
		const divMain = document.createElement('div');
        const priv = azul.addElement(this.parObj);
        divMain.appendChild(priv);
		return divMain;
    },

    ftfun() {
        console.log('terms click');
        const direct = ftTerms.render();
        azul.rplSect(direct);
    },
};

let ftPriv = {
    parObj: {
        typ: 'p',
        textContent: 'Privacy',
        style: {
            margin: '10px',
        },
    },

    render() {
		const divMain = document.createElement('div');
        const terms = azul.addElement(this.parObj);
        divMain.appendChild(terms);
		return divMain;
    },

    ftfun() {
        console.log('privacy click');
        const direct = ftPriv.render();
        azul.rplSect(direct);
    },

};

let ftDir = {
    blogDivObj: {
        style: {
            width: '100%',
            margin: '10px',
            minHeight: '100px',
            marginInline: 'auto',
            border: '1px dashed yellow',
        },
        id: 'footerTerm',
        typ: 'div',
    },

    parObj: {
        typ: 'p',
        textContent: 'Directions',
        style: {
            margin: '10px',
        },
    },


    mapObj: {
        typ: 'iframe',
//      src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.9050691933726!2d-0.37813978784285146!3d39.47147327148869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa3b6f08f5d6fd4cb%3A0xb0879c53f0afe8b5!2sSpacesCabo%20Real%20Estate!5e0!3m2!1sen!2ses!4v1752580671081!5m2!1sen!2ses',
        src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.905069193372!2d-0.37813978726809205!3d39.4714732714887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa3b6f08f5d6fd4cb%3A0xb0879c53f0afe8b5!2sSpacesCabo%20Real%20Estate!5e0!3m2!1sen!2ses!4v1752602120370!5m2!1sen!2ses',
        height: '450',
        width: '600',
        style: {
            border: '0',
        },
        loading: 'lazy',
        referrerpolicy: 'no-referrer-when-downgrade',
    },

    render() {
		const divMain = document.createElement('div');
//        this.blogDiv = azul.addElement(this.blogDivObj);
        const text = azul.addElement(this.parObj);
        divMain.appendChild(text);
        const map = azul.addElement(this.mapObj);
        divMain.appendChild(map);
		return divMain
    },

    ftfun() {
        console.log('grid directions click');
        const direct = ftDir.render();
        azul.rplSect(direct);
    },
};

azul.footer.ButPriv.addEventListener('click', ftPriv.ftfun);
azul.footer.ButTerms.addEventListener('click', ftTerms.ftfun);
azul.footer.ButDir.addEventListener('click', ftDir.ftfun);


