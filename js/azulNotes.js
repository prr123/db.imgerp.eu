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

	dtformat(dateStr) {
		const dateTime = dateStr.split("T");
		const date = dateTime[0].split("-");
		const timl = dateTime[1].split(".");
      return `${date[2]}.${date[1]}.${date[0]} ${timl[0]}`;
    },

	render() {
		const root = document.createElement('div');
        const txtel = azul.addElement(dbData.parObj);
		txtel.textContent = 'Notes';
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

		azul.rplDiv(this.notesRoot, nroot);

		nroot.appendChild(txtAr);
		return nroot;
	},

	dispNotes(nlist) {
		console.log('note list: ' + nlist.length);
		const liDiv = document.createElement('div');
		const par = document.createElement('p');
		par.textContent = 'note list: ' + nlist.length;
		for (let i=0; i< nlist.length; i++) {
			const ndiv = azul.addElement(dbNotes.noteObj);
			const datePar = document.createElement('p');
			const dattim = dbNotes.dtformat(nlist[i].Cre);
			datePar.textContent = 'Date: ' + dattim + '\n';
			ndiv.appendChild(datePar);
			const txtDiv = document.createElement('div');
			txtDiv.style.border = '1px solid black';
			const txtAr = azul.addElement(dbNotes.noteTxtObj);
			txtAr.value = nlist[i].Txt;
			txtAr.readOnly = true;
			txtDiv.appendChild(txtAr);
			ndiv.appendChild(txtDiv);
			liDiv.appendChild(ndiv);
		}
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
				dbNotes.nList = nlist;
                azul.rplDiv(dbNotes.notesRoot, ldiv);
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
		for (const child of dbNotes.notesRoot.children) {
			//console.log(child.tagName);
			nroot.appendChild(child);
		}
// 		while (dbNotesnotesRoot.hasChildNodes()) {nroot.appendChild();}
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
                console.log('Post addNote Success');
				dbNotes.getNotes();

                return;
            } else {
                console.error('Error: ' + response.status + ', ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ' + error.message);
        }
    },

	calcHash(string) {
    	let hash = 0;
    	if (string.length == 0) return hash;
    	for (i = 0; i < string.length; i++) {
        	char = string.charCodeAt(i);
        	hash = ((hash << 5) - hash) + char;
        	hash = hash & hash;
    	}
    	return hash;
	},


	rendUpdNote() {
		console.log('upd note')
		// check note status
//		const num = dbNotes.notesRoot.childElementCount;
//		console.log('upd -- children: ' + num);
		const nodePar = dbNotes.notesRoot.children[0];
		const num2 = nodePar.childElementCount;
		console.log('upd -- children lev 2: ' + num2);

		let hashList = [];
		for (let i=0; i<num2; i++) {
			const divEl = nodePar.children[i];
			const txtDiv = divEl.children[1];
			const txtEl = txtDiv.children[0];
			const hash = dbNotes.calcHash(txtEl.value);
			hashList.push(hash);
//			console.log(i + ': ' + hashList[i]);
			txtEl.readOnly = false;
		}
		dbNotes.orgHash = hashList;
		// add submit button
		const parDiv = dbNotes.notesRoot.parentNode;
		const subDiv = document.createElement('div');
        const subBut = new azulButton(dbData.subButRObj);
        this.subButEl = subBut.el;
        subBut.el.textContent = 'submit updates';
        subBut.el.addEventListener('click', function() {dbNotes.subNoteUpd(parDiv, subDiv);},false);
        subDiv.appendChild(subBut.el);
		parDiv.insertBefore(subDiv, dbNotes.notesRoot);
	},

	async subNoteUpd(parDiv, subDiv) {
		console.log('submitted update!');
        const url = '/db/person.json';
 		const pers = dbData.pers;
		const pidstr = pers.Id.toString();
//		const cmd = '{"cmd":"liN","pid":"' + pidstr + '"}';
		parDiv.removeChild(subDiv);
        const nodePar = dbNotes.notesRoot.children[0];
        const num2 = nodePar.childElementCount;
        console.log('updN -- children lev 2: ' + num2);

//		const cmd = '{"cmd":"addN","pid":"' + pidstr + '","txt":"' + dbNotes.newNote.value + '"}';
		let cmdStr = '{"cmd":"updN","pid":"' + pidstr + '","notes":"[';
		for (let i=0; i<num2; i++) {
            const divEl = nodePar.children[i];
            const txtDiv = divEl.children[1];
            const txtEl = txtDiv.children[0];
			const hash = dbNotes.calcHash(txtEl.value);
//        	console.log(i + ': ' + txtEl.value);
			if (hash != dbNotes.orgHash[i]) {
				idStr = dbNotes.nList[i].Id;
//				txtStr = dbNotes.nList[i].Txt;
				txtStr = txtEl.value;
				cmdStr += '{\\\"id\\\":' + idStr + ',\\\"txt\\\":\\\"' + txtStr + '\\\"},'
			}
		}
		cmdStr = cmdStr.slice(0, -1);
		cmdStr += ']"}';
		console.log("upd: " + cmdStr);
// submit command and get response
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: cmdStr,
            });

            if (response.ok) {
                console.log('Post upd Notes Success');
				dbNotes.getNotes();
                return;
            } else {
                console.error('Error: ' + response.status + ', ' + response.statusText);
            }
        } catch (error) {
            console.error('Error: ' + error.message);
        }
//		dbNotes.getNotes();
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
		dbNotes.getNotes();
		dbData.state = 'dispNotes';
		console.log("pers: " + dbDisp.Pers.First);
	},

};


