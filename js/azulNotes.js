const dbNotes = {

	noteObj: {
		typ: 'div',
		style: {
			border: '1px dashed blue',
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
		const notes = dbNotes.addNotes();
		root.appendChild(notes);
		azul.rplDiv(dbMain.dbDat, root);
	},

	addNotes() {
		const nroot = azul.addElement(this.noteObj);
		const datper = document.createElement('p');
		datper.textContent = 'Date: ';
		nroot.appendChild(datper);
		const br = document.createElement('br');
		nroot.appendChild(br);
		const dattxt = document.createElement('p');
		dattxt.textContent = 'a pargraph of text.\n';
		nroot.appendChild(dattxt);
		const dattxt2 = document.createElement('p');
		dattxt2.textContent = 'more text.\n';
		nroot.appendChild(dattxt2);
		return nroot;
	},

	rendAddNote() {
		console.log('add note')

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
        this.navBut2.addEventListener('click', dbNotes.renFun);

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

	renfun() {
		console.log("show notes");
		dbNotes.renCmd();
		dbNotes.render();
		console.log("pers: " + dbDisp.Pers.First);
	},

};





//dbDisp.navBut3.addEventListener('click', dbNotes.renfun);
//if (dbDisp === null) 
//setTimeout(dbDisp.navBut3.addEventListener('click', dbNotes.renfun), 200);
