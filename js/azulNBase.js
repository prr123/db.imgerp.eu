// v2: move code into functions
// v3: move header into obj
// v4 move section into obj
// V5: add section code for blog
// v6:
// V7: add footer4
// V8: add google map

function loadsection(url) {

    const ldscript = document.createElement('script');

    ldscript.src = url;
    ldscript.type = "application/javascript";
	ldscript.defer = true;

    ldscript.onload = () => {console.log('Script loaded successfully: ' + url);};

    ldscript.onerror = () => {
        console.log('Error occurred while loading script: ' + url);
    };

// inserting it will execute the script
//    document.body.appendChild(script);
}


let azulSPA = {
	hdStyl: {
	        color: 'MediumPurple',
		    margin: 'auto',
	        textAlign: 'center',
			fontSize: '2rem',
			padding: '0.5em',
	},

	mainDiv: {
		style: {
			width: '100%',
			border: '1px solid blue',
			minHeight: '300px',
        },
		id: 'divMain',
	},
	header: {
            style: {
                minHeight: '100px',
                margin: '10px',
                border: '1px solid DeepPink',
                position: 'relative',
            },
            id: 'header',
            className: 'pagSections',
	},
	section: {
            style: {
                minHeight: '500px',
                margin: '10px',
                border: '1px solid Tomato',
                position: 'relative',
            },
            id: 'docmain',
            className: 'pagSections',
	},
	footer: {
            style: {
                minHeight: '100px',
                margin: '10px',
                border: '1px solid green',
                position: 'relative',
            },
            id: 'footer',
            className: 'pagSections',
	},
};

azulSPA.getCont = function (e, url) {
	console.log('event:' + e.type + ' url:' + url);
};

let tstMain = {

    tstDivObj: {
        style: {
			width: '100%',
			margin: '10px',
            minHeight: '100px',
            marginInline: 'auto',
            border: '1px solid red',
        },
        id: 'blogDivH',
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
        id: 'blogTitle',
        textContent: 'Azul Testing',
        typ: 'h3',
	},

	render() {
		let divMain = document.createElement('div');
		const titEl = azul.addElement(this.tstTitle);
		const divSub = azul.addElement(this.tstDivObj);
		divMain.appendChild(titEl);
		divMain.appendChild(divSub);
//		azul.rplSect(divMain);
		return divMain;
	},

	navfun() {
        const home = tstMain.render();
        azul.rplSect(home);
	}
};


const tstHeader = {

    hdObj: {
        style: {
	        color: 'MediumPurple',
    	    margin: 'auto',
	        textAlign: 'center',
			fontSize: '2rem',
	       	padding: '0.5em',
		},
        id: 'header',
        className: 'doch3',
        textContent: 'Azul Test',
        typ: 'h2',
    },

	menuIconObj: {
		size: '32',
		svgStyl: {
			position: 'absolute',
			top: '10px',
			right: '15px',
		},
		pStyl: {
			strokeWidth:'10',
        	strokeLinecap: 'round',
        	stroke: 'black',
        	fill : 'none',
		},
		pathstr: azul.icons.menu,
	},


    butNavObj: {
        style: {
	        background: 'none',
			border: 'none',
    	    padding: '0',
        	cursor: 'pointer',
		},
        typ: 'button',
    },

    menuInlineObj: {
        style: {
			display: 'flex',
			justifyContent: 'flex-end',
			border: '1px dashed green',
			width: '100%',
			minHeight: '30px',
			},
        id: 'inlineMenu',
        typ: 'div',
    },


	itemObj: {
		style: {
			border: '1px dashed orange',
			margin: '5px',
			minWidth: '100px',
			textAlign: 'center',
			},
		typ: 'div',
	},


	render() {
		const hdel = azul.addElement(this.hdObj);
		azul.header.appendChild(hdel);
		const mic = azul.addIcon(this.menuIconObj);
		azul.header.appendChild(mic);

		const butNavObj1 = {textContent: 'About Us'};
		Object.assign(butNavObj1, this.butNavObj);
	    const navBut1 = azul.addElement(butNavObj1);
		azul.header.navBut1 = navBut1;
//		navBut1.addEventListener('click', blogA.navf1);

		const butNavObj2 = {textContent: 'Services'};
		Object.assign(butNavObj2, this.butNavObj);
	    const navBut2 = azul.addElement(butNavObj2);
		azul.header.navBut2 = navBut2;
//		navBut2.addEventListener('click', blogB.navf2);

		const butHomeObj = {textContent: 'Home'};
		Object.assign(butHomeObj, this.butNavObj);
	    let navButHome = azul.addElement(butHomeObj);
		azul.header.navButHome = navButHome;
//		navButHome.addEventListener('click', blogSection.navfH);

		let milObj = azul.addElement(this.menuInlineObj);
    	let item1 = azul.addElement(this.itemObj);
		item1.appendChild(navBut1);
		milObj.appendChild(item1);

    	let item2 = azul.addElement(this.itemObj);
		item2.appendChild(navBut2);
		milObj.appendChild(item2);

    	let item3 = azul.addElement(this.itemObj);
		item3.appendChild(navButHome);
		milObj.appendChild(item3);

		azul.header.appendChild(milObj);
	},

};


const tstFooter = {

    nfObj: {
        style: {
            height: '150px',
            margin: '10px',
            border: '1px dashed red',
            position: 'relative',
        },
        id: 'nfooter',
        typ: 'div',
    },

    gridObj: {
        rows: 3,
        cols: 4,
        style: {
            display: 'grid',
            border: '1px solid blue',
            margin: '10px',
            minHeight: '100px',
        },
        elStyle: {
            border: '1px solid green',
        }
    },

    butObj: {
        style: {
	        background: 'none',
    	    border: 'none',
        	padding: '0 0 0 10px',
			cursor: 'pointer',
       	},
		typ: 'button',
	},

	render() {
//	    const nfooter = azul.addElement(this.nfObj);
		const fgrid = azul.addGrid(this.gridObj);

		const fbut1 = azul.addElement(this.butObj);
		fbut1.textContent = 'Privacy';
		azul.footer.ButPriv = fbut1;
//		fbut1.addEventListener('click', footerPriv.fbut);
   		fgrid.els[0][0].appendChild(fbut1);

		const fbut2 = azul.addElement(this.butObj);
		fbut2.textContent = 'Terms';
		azul.footer.ButTerms = fbut2;
//		fbut2.addEventListener('click', footerTerms.fbut);
   		fgrid.els[1][0].appendChild(fbut2);

		const fbut3 = azul.addElement(this.butObj);
		fbut3.textContent = 'Directions';
		azul.footer.ButDir = fbut3;
//		fbut3.addEventListener('click', footerDir.fbut);
   		fgrid.els[0][3].appendChild(fbut3);
		azul.footer.appendChild(fgrid);
	},

};

azulSPA.render = function() {

    azul.loadPage(azulSPA);

	tstHeader.render();

	const home = tstMain.render();
	azul.rplSect(home);

	tstFooter.render();

    document.body.appendChild(azul.divMain);
};

azulSPA.upd = function(upd) {

			azul.rplSect(upd);
};

const docObj = {
	title: 'Azul tst Test',
    metaObj: {
        metaNames: [
            {name: 'description', content: 'testing base'},
            {name: 'author', content: 'prr'},
            {name: 'date', content: '1/6/2025'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
            ],
    	},
	bodyStyl: {
		fontSize: '16px',
		},
};

azul.init(docObj);

azulSPA.render();
