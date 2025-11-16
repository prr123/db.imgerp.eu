const dbNotes = {

	noteObj: {
		typ: 'div',
		style: {
			border: '1px dashed blue',
		},
	},

	noteTxtObj: {
		typ: 'textarea',
		rows: 5,
		style: {
			width: '98%',
			margin: '10px 1% 10px 1%',
//			padding: '5px',
			border: '1px dashed red',
		},
	},

	flexObj: {
		typ: 'div',
		style: {
			display: 'flex',
			flexDirection: 'row',
			border: '1px dashed orange',
		},
	},

	namList: [{Field: 'First', Length: '150px', idx: 1, Req: true},{Field: 'Middle', Length: '200px', idx: 2},{Field: 'Last', Length: '200px', idx: 3, Req: true},
	{Field: 'Email', Length: '350px', idx: 4, Req: true}],

	render() {
		const root = document.createElement('div');
        const txtel = azul.addElement(dbData.parObj);
		txtel.textCntent = 'Notes';
        root.appendChild(txtel);
		const nam = azul.addElement(this.flexObj);
		nam.inpEls = [];
		for (let c=0; c< this.namList.length; c++) {
			const inpEl = new azulInp(this.namList[c]);
			nam.inpEls.push(inpEl);
			nam.appendChild(inpEl.inpDiv);
		}

		const pers = dbData.pers;
		nam.inpEls[0].inpDiv.inp.value = pers.First;
		nam.inpEls[0].inpDiv.lab.style.visibility = 'visible';
		nam.inpEls[1].inpDiv.inp.value = pers.Middle;
		nam.inpEls[1].inpDiv.lab.style.visibility = 'visible';
		nam.inpEls[2].inpDiv.inp.value = pers.Last;
		nam.inpEls[2].inpDiv.lab.style.visibility = 'visible';
		nam.inpEls[3].inpDiv.inp.value = pers.Email;
		nam.inpEls[3].inpDiv.lab.style.visibility = 'visible';


		root.appendChild(nam);
        const divPN = dbDispPers.rendPrevNxt()
        root.appendChild(divPN);
		this.notesRoot = document.createElement('div');
		root.appendChild(this.notesRoot);
//		const notes = dbNotes.showNotes();
//		root.appendChild(notes);
		azul.rplDiv(dbMain.dbDat, root);
	},

	showNotes() {
		const nroot = azul.addElement(this.noteObj);
		const datper = document.createElement('p');
		datper.textContent = 'Date: ';
		nroot.appendChild(datper);

		const txtAr = azul.addElement(this.noteTxtObj);
		nroot.appendChild(txtAr);
/*
		const br = document.createElement('br');
		nroot.appendChild(br);
		const dattxt = document.createElement('p');
		dattxt.textContent = 'a pargraph of text.\n';
		nroot.appendChild(dattxt);
		const dattxt2 = document.createElement('p');
		dattxt2.textContent = 'more text.\n';
		nroot.appendChild(dattxt2);
*/
		azul.rplDiv(this.notesRoot, nroot);

		return nroot;
	},

	dispNotes(nlist) {
		console.log('note list: ' + nlist.length);
		const liDiv = document.createElement('div');

		return liDiv;
	},

    async getNotes() {
        const url = '/db/person.json';
 		const pers = dbData.pers;
		const pidstr = pers.Id.toString();
		const cmd = '{"cmd":"liN","pid":"' + pidstr + '"}';
		console.log('dbg -- cmd: ' + cmd);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: cmd,
            });

            if (response.ok) {
                console.log('Post Reply Success');
                const nlist = await response.json();
                const ldiv = dbNotes.dispNotes(nlist);
//              azul.rplDiv(azulSPA.db, ldiv);
                azul.rplDiv(dbMain.dbDat, ldiv);
                return;
            } else {
                console.error('Error: ' + response.status + ', ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ' + error.message);
        }

    },

	rendAddNote() {
		console.log('add note')
		const nroot = azul.addElement(dbNotes.noteObj);
		const datper = document.createElement('p');
		datper.textContent = 'Date: ';
		nroot.appendChild(datper);
		const txtDiv = document.createElement('div');
		txtDiv.style.border = '1px solid black';
		const txtAr = azul.addElement(dbNotes.noteTxtObj);
		dbNotes.newNote = txtAr;
		txtDiv.appendChild(txtAr);
		nroot.appendChild(txtDiv);
		const subDiv = document.createElement('div');
        const subBut = new azulButton(dbData.subButRObj);
        this.subButEl = subBut.el;
        subBut.el.textContent = 'submit Note';
        subBut.el.addEventListener('click', function() {dbNotes.addNote();},false);
        subDiv.appendChild(subBut.el);
		nroot.appendChild(subDiv);

		azul.rplDiv(dbNotes.notesRoot, nroot);
	},

    async addNote() {
		console.log('addNote: submitted new note');
		console.log('new text: \n' + dbNotes.newNote.value + '\n');
        const url = '/db/person.json';
 		const pers = dbData.pers;
		const pidstr = pers.Id.toString();

		const cmd = '{"cmd":"addN","pid":"' + pidstr + '","txt":"' + dbNotes.newNote.value + '"}';
		console.log('dbg -- cmd: ' + cmd);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: cmd,
            });

            if (response.ok) {
                console.log('Post Reply Success');
//                const nlist = await response.json();
//                const ldiv = dbNotes.dispNotes(nlist);
//              azul.rplDiv(azulSPA.db, ldiv);
//                azul.rplDiv(dbMain.dbDat, ldiv);
                return;
            } else {
                console.error('Error: ' + response.status + ', ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ' + error.message);
        }
    },

	rendUpdNote() {
		console.log('upd note')
	},


	renCmd() {

       const root = dbMain.dbCmd;
        while (root.hasChildNodes()) {
            root.removeChild(root.firstChild);
        };

//        dbData.cmdButObj.textContent = 'list';
        this.navBut1 = azul.addElement(dbData.cmdButObj);
		this.navBut1.textContent = 'list';
        const item1 = azul.addElement(dbData.itemObj);
        item1.appendChild(this.navBut1);
        root.appendChild(item1);
        this.navBut1.addEventListener('click', dbList.renFun);

//        dbMain.butNavObj.textContent = 'show Notes';
        this.navBut2 = azul.addElement(dbData.cmdButObj);
		this.navBut2.textContent = 'show Notes';
        const item2 = azul.addElement(dbData.itemObj);
        item2.appendChild(this.navBut2);
        root.appendChild(item2);
        this.navBut2.addEventListener('click', dbNotes.getNotes);

//        dbMain.butNavObj.textContent = 'edit Note';
        this.navBut3 = azul.addElement(dbData.cmdButObj);
		this.navBut3.textContent = 'edit Note';
        const item3 = azul.addElement(dbData.itemObj);
        item3.appendChild(this.navBut3);
        root.appendChild(item3);
        this.navBut3.addEventListener('click', dbNotes.rendUpdNote);

//        dbMain.butNavObj.textContent = 'add Note';
        this.navBut4 = azul.addElement(dbData.cmdButObj);
		this.navBut4.textContent = 'add Note';
        const item4 = azul.addElement(dbData.itemObj);
        item4.appendChild(this.navBut4);
        root.appendChild(item4);
        this.navBut4.addEventListener('click', dbNotes.rendAddNote);
	},

	renFun() {
		console.log("show notes");
		dbNotes.renCmd();
		dbNotes.render();
		dbData.state = 'dispNotes';
		console.log("pers: " + dbDisp.Pers.First);
	},

};


