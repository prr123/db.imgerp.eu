async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (response.ok) {
      console.log('Success');
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const dbCmd ={

	rendCmd() {
		dbMain.butNavObj.textContent = 'list';
        this.navBut1 = azul.addElement(this.butNavObj);
        const item1 = azul.addElement(this.itemObj);
        item1.appendChild(this.navBut1);
        dbMain.dbCmd.appendChild(item1);

	},
};


const dbDispPers = {

    subButRObj: {
        text: 'submit test',
        style: {
            display: 'block',
            textAlign: 'center',
            width: '200px',
            margin: '20px auto',
        },
    },

    gridObj: {
        nrow: 3,
        ncol: 1,
		cols: '1 fr',
        matrix: [[{Field: 'First', Length: '150px', idx: 1, Req: true},{Field: 'Middle', Length: '200px', idx: 2},{Field: 'Last', Length: '200px', idx: 3, Req: true}],
        [{Field: 'Email',Length: '300px', idx: 4, Req: true}, {Field: 'Phone', Length: '200px', idx: 5}],
        [{Field: 'Created',Length: '300px', idx: 6}, {Field: 'Edited', Length: '300px', idx: 7}]],
        style: {
            display: 'grid',
            border: '1px dashed blue',
            margin: '10px',
        },
        elStyle: {
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: '50px',
//          margin: '5px',
            outline: '1px dashed magenta',
//          border: '1px dashed green',
        },
    },

    butNavObj: {
        style: {
            background: 'none',
            border: '1px solid black',
            padding: '0 10px 0 10px',
            cursor: 'pointer',
        },
        typ: 'button',
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

	rendPrevNxt() {
		const pnDiv = document.createElement('div');
		pnDiv.style.display = 'flex';
		pnDiv.style.border = '1px dashed green';
		pnDiv.style.justifyContent = 'space-between';

        const butNavObj1 = {textContent: 'Prev'};
        Object.assign(butNavObj1, this.butNavObj);
        const navBut1 = azul.addElement(butNavObj1);
        this.navBut1 = navBut1;

        const butNavObj2 = {textContent: 'Next'};
		Object.assign(butNavObj2, this.butNavObj);
        const navBut2 = azul.addElement(butNavObj2);
        this.navBut2 = navBut2;

		let item1 = azul.addElement(this.itemObj);
        item1.appendChild(navBut1);
        pnDiv.appendChild(item1);

        let item2 = azul.addElement(this.itemObj);
        item2.appendChild(navBut2);
        pnDiv.appendChild(item2);

		return pnDiv;
	},

    rendGrid(pers) {

//      namegrid is a div element
		const hasDat = true;
		if (pers === null) {hasDat = false;}
        const namgrid = azul.addGrid(this.gridObj);

        namgrid.nrow = this.gridObj.matrix.length;
        namgrid.ncol = 1;

        namgrid.inpEls = [];
        for (let r=0; r< this.gridObj.matrix.length; r++) {
            for (let c=0; c< this.gridObj.matrix[r].length; c++) {
                let inpEl = new azulInp(this.gridObj.matrix[r][c]);
                namgrid.inpEls.push(inpEl);
                namgrid.els[r][0].appendChild(inpEl.inpDiv);
//                namgrid.els[r].appendChild(inpel.inpDiv);
            }
        }
        let elcnt = namgrid.inpEls.length
		if (hasDat) {
			namgrid.inpEls[0].inpDiv.inp.value = pers.First;
			namgrid.inpEls[0].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[1].inpDiv.inp.value = pers.Middle;
			namgrid.inpEls[1].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[2].inpDiv.inp.value = pers.Last;
			namgrid.inpEls[2].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[3].inpDiv.inp.value = pers.Email;
			namgrid.inpEls[3].inpDiv.lab.style.visibility = 'visible';
//			namgrid.inpEls[4].inpDiv.inp.value = pers.Phone;
//			namgrid.inpEls[4].inpDiv.lab.style.visibility = 'visible';
		}

        for (let i=0; i< elcnt; i++) {
            let inxt = i +1;
            if (inxt>elcnt-1) {inxt=0;}
            let iprv = i - 1;
            if (iprv<0) {iprv=elcnt-1;}
            InpSetNextPrev(namgrid.inpEls[i].inpDiv.inp, namgrid.inpEls[inxt].inpDiv.inp, namgrid.inpEls[iprv].inpDiv.inp);
        }

		this.gridDiv = namgrid;
        return namgrid;
    },

	dispNext() {

	},

	dispPrev() {

	}
};

const dbData = {
	state: 'new',
	
    subButRObj: {
        text: 'submit new',
        style: {
            display: 'block',
            textAlign: 'center',
            width: '200px',
            margin: '20px auto',
        },
    },

    gridObj: {
        nrow: 2,
        ncol: 1,
		cols: '1 fr',
        matrix: [[{Field: 'First', Length: '150px', idx: 1, Req: true},{Field: 'Middle', Length: '200px', idx: 2},{Field: 'Last', Length: '200px', idx: 3, Req: true}],
        [{Field: 'Email',Length: '300px', idx: 4, Req: true},{Field: 'Phone',Length: '250px', idx: 5}]],
        style: {
            display: 'grid',
            border: '1px dashed blue',
            margin: '10px',
        },
        elStyle: {
            display: 'flex',
            flexWrap: 'wrap',
            minHeight: '50px',
//          margin: '5px',
            outline: '1px dashed magenta',
//          border: '1px dashed green',
        },
    },

    rendGrid() {

//      namegrid is a div element
        const namgrid = azul.addGrid(this.gridObj);

        namgrid.nrow = this.gridObj.matrix.length;
        namgrid.ncol = 1;

        namgrid.inpEls = [];
        for (let r=0; r< this.gridObj.matrix.length; r++) {
            for (let c=0; c< this.gridObj.matrix[r].length; c++) {
                let inpEl = new azulInp(this.gridObj.matrix[r][c]);
                namgrid.inpEls.push(inpEl);
                namgrid.els[r][0].appendChild(inpEl.inpDiv);
//                namgrid.els[r].appendChild(inpel.inpDiv);
            }
        }
        let elcnt = namgrid.inpEls.length

        for (let i=0; i< elcnt; i++) {
            let inxt = i +1;
            if (inxt>elcnt-1) {inxt=0;}
            let iprv = i - 1;
            if (iprv<0) {iprv=elcnt-1;}
            InpSetNextPrev(namgrid.inpEls[i].inpDiv.inp, namgrid.inpEls[inxt].inpDiv.inp, namgrid.inpEls[iprv].inpDiv.inp);
        }

		this.gridDiv = namgrid;
        return namgrid;
    },

	rendSubmit() {
		const subDiv = document.createElement('div');
        const subBut = new azulButton(this.subButRObj);
		this.subButEl = subBut.el;
        subBut.el.addEventListener('click', function() {dbNew.subFunc(dbData.gridDiv.inpEls);},false);
		subDiv.appendChild(subBut.el);
//		this.subDiv= subDiv;
		return subDiv;
	},

    getInpValues: function(namesObj) {
        let inpVal = {
            First: namesObj.inpels[0].getInpValue(),
            Middle: namesObj.inpels[1].getInpValue(),
            Last: namesObj.inpels[2].getInpValue(),
            Email: namesObj.inpels[3].getInpValue(),
//            Phone: namesObj.inpels[4].getInpValue(),
        };
        const inpJsonStr = JSON.stringify(inpVal)
        console.log('hello inp: ' + inpJsonStr);
        return inpJsonStr;
    },


    clear(inpdata) {
        for (let i=0; i< inpcnt; i++) {
            let datinp = inpdata[i].inpDiv.inp;
            datinp.value = "";
        }
    },

    checkData (inpdata) {
		const inpcnt = inpdata.length;
        for (let i=0; i< inpcnt; i++) {
            let datinp = inpdata[i].inpDiv.inp;
            if (datinp.Req && datinp.value.length == 0) {
                datinp.Err = true;
//              datinp.style.borderBottom = datinp.errorStyle;
                datinp.focus();
                console.log("error -- required field: " + i);
                return false;
            } else {
                datinp.Err = false;
            }
        }
        return true;
    },

};

const dbNew = {

    parObj: {
        typ: 'h2',
        textContent: 'Add New Person',
        style: {
            margin: 'auto',
            textAlign: 'center',
         },
    },

    subFunc(inpdata) {
        const inpcnt = inpdata.length;
//      console.log('inp els: ' + inpcnt);
        const chkDat = dbData.checkData(inpdata);
        if (!chkDat) {
            console.log ("error -- checkData");
            return;
        }
        const inpKV = {};
		inpKV['cmd'] = 'add';
        for (let i=0; i< inpcnt; i++) {
            const datinp = inpdata[i].inpDiv.inp;
//          console.log(i + ': ' + datinp.place + ': ' + datinp.value);
            inpKV[datinp.place] = datinp.value;
        }
        let sndDat = JSON.stringify(inpKV);
        console.log('inpkv: ' + sndDat);
        // send data
        this.postDat('/db/person.json',sndDat);
    },

	async postDat(url, data) {
  		try {
    		const response = await fetch(url, {
      			method: 'POST',
      			headers: {'Content-Type': 'application/json',},
				body: data,});

			if (response.ok) {
				console.log('Success');
				this.Status.textContent = 'Status: success!'
				// disable submit
				dbData.subButEl.disabled = true;
    		} else {
     			console.error('Error ' + response.status + ': ' + response.statusText);
				this.Status.textContent = 'Status: error -- ' + response.statusText;
    		}
  		} catch (error) {
    		console.error('Error:', error.message);
			this.Status.textContent = 'Status: error -- ' + error.message;
  		}
	},

    // root is a div
    render() {
		const root = document.createElement('div');
        const txtel = azul.addElement(this.parObj);
		txtel.textContent = 'Add Person';
        root.appendChild(txtel);
		const parEl = document.createElement('p');
		parEl.style.margin='10px';
		parEl.textContent = 'Status: not submitted';
		root.appendChild(parEl);
		this.Status = parEl;

//dbData.rendGrid();
//dbData.rendSubmit();
        const gDiv = dbData.rendGrid();
        root.appendChild(gDiv);
		const subDiv = dbData.rendSubmit();
        root.appendChild(subDiv);
        return root;
    },

	renFun() {
		console.log('add: click!');
		const ldiv = dbNew.render();
		azul.rplDiv(dbMain.dbDat, ldiv);
		dbData.state = 'add';
	}
};

const dbList = {

    parObj: {
        typ: 'h2',
        textContent: 'Person List',
        style: {
            margin: 'auto',
            textAlign: 'center',
         },
    },

    gridObj: {
        nrow: 2,
        ncol: 6,
		cols: '50px 150px 200px 200px 300px 200px',
        style: {
            display: 'grid',
            border: '1px dashed blue',
            margin: '10px',
        },
        elStyle: {
            minHeight: '20px',
//          margin: '5px',
//            outline: '1px dashed magenta',
          border: '1px solid black',
        },
    },

	gridHdObj: {
		typ: 'p',
		style: {
			margin: 'auto',
            textAlign: 'center',
			fontWeight: 'bold',
		},
	},
	gridElObj: {
		typ: 'p',
		style: {
			margin: 'auto',
            textAlign: 'center',
		},
	},

	rendGrid(gridObj) {
        const grid = azul.addGrid(this.gridObj);
        grid.nrow = this.gridObj.nrow;
        grid.ncol = this.gridObj.ncol;

//		for (let c=0; c< this.gridObj.ncol; c++) {
		const par = azul.addElement(this.gridHdObj);
		par.textContent = 'id';
		grid.els[0][0].appendChild(par);
		const par1 = azul.addElement(this.gridHdObj);
		par1.textContent = 'First';
		grid.els[0][1].appendChild(par1);
		const par2 = azul.addElement(this.gridHdObj);
		par2.textContent = 'Middle';
		grid.els[0][2].appendChild(par2);
		const par3 = azul.addElement(this.gridHdObj);
		par3.textContent = 'Last';
		grid.els[0][3].appendChild(par3);
		const par4 = azul.addElement(this.gridHdObj);
		par4.textContent = 'email';
		grid.els[0][4].appendChild(par4);
		const par5 = azul.addElement(this.gridHdObj);
		par5.textContent = 'phone';
		grid.els[0][5].appendChild(par5);

		this.grid = grid;
		return grid;
	},

	linfun(ir) {
		const pers = dbList.list[ir-1];
		dbData.pers = pers;
//		console.log("row: " + ir + " id: " + pers.Id);
		dbDisp.renFun(pers);
	},


	render(list) {
		const div = document.createElement('div')
		const txtel = azul.addElement(this.parObj);
        div.appendChild(txtel);
		this.list = list;
		const nrows = list.length;
//		console.log('list len: ' + nrows);
		this.gridObj.nrow = nrows +1;
		const gr = this.rendGrid(this.gridObj);
		for (let ir=1; ir <nrows+1; ir++) {
			const par = azul.addElement(this.gridElObj);
			par.textContent = list[ir-1].Id;
			gr.els[ir][0].appendChild(par);
			gr.els[ir][0].style.cursor = 'pointer';
			gr.els[ir][0].addEventListener('click', function(){dbList.linfun(ir);}, false);
			const par1 = azul.addElement(this.gridElObj);
			par1.textContent = list[ir-1].First;
			gr.els[ir][1].appendChild(par1);
			const par3 = azul.addElement(this.gridElObj);
			par3.textContent = list[ir-1].Last;
			gr.els[ir][3].appendChild(par3);
			const par4 = azul.addElement(this.gridElObj);
			par4.textContent = list[ir-1].Email;
			gr.els[ir][4].appendChild(par4);

		}
		div.appendChild(gr);
		return div
	},

	rendCmd() {
        const root = dbMain.dbCmd;
        while (root.hasChildNodes()) {
            root.removeChild(root.firstChild);
        };

        dbMain.butNavObj.textContent = 'list';
        this.navBut1 = azul.addElement(dbMain.butNavObj);
        const item1 = azul.addElement(dbMain.itemObj);
        item1.appendChild(this.navBut1);
        root.appendChild(item1);
        this.navBut1.addEventListener('click', dbList.renFun);

        dbMain.butNavObj.textContent = 'add';
        this.navBut2 = azul.addElement(dbMain.butNavObj);
        const item2 = azul.addElement(dbMain.itemObj);
        item2.appendChild(this.navBut2);
        root.appendChild(item2);
        this.navBut2.addEventListener('click', dbNew.renFun);

        dbMain.butNavObj.textContent = 'search';
        this.navBut3 = azul.addElement(dbMain.butNavObj);
        const item3 = azul.addElement(dbMain.itemObj);
        item3.appendChild(this.navBut3);
        root.appendChild(item3);
        this.navBut3.addEventListener('click', dbSearch.renFun);

	},


	renFun() {
		console.log('list: click!');
		// get 
		dbList.getData();
		dbList.rendCmd();
		dbData.state = 'list';
	},

	async getData() {
		const url = '/db/person.json';
		const cmd = '{"cmd":"list"}';
  		try {
	    	const response = await fetch(url, {
   				method: 'POST',
      			headers: {'Content-Type': 'application/json',},
				body: cmd,
    		});

	    	if (response.ok) {
				console.log('Post Reply Success');
				const list = await response.json();
				const ldiv = dbList.render(list);
//				azul.rplDiv(azulSPA.db, ldiv);
				azul.rplDiv(dbMain.dbDat, ldiv);
				return;
			} else {
				console.error('Error: ' + response.status + ', ' + response.statusText);
    		}
		} catch (error) {
			console.error('Error: ' + error.message);
		}
	},
};

const dbUpd = {

	async postDat(url, data) {
  		try {
    		const response = await fetch(url, {
      			method: 'POST',
      			headers: {'Content-Type': 'application/json',},
				body: data,});

			if (response.ok) {
				console.log('Success');
				this.parEl.textContent = 'Status: update success!'

				// disable submit
				this.subButEl.disabled = true;
    		} else {
     			console.error('Error ' + response.status + ': ' + response.statusText);
				this.parEl.textContent = 'Status: error -- ' + response.statusText;
    		}
  		} catch (error) {
    		console.error('Error:', error.message);
			this.parEl.textContent = 'Status: error -- ' + error.message;
  		}
	},



	subFunc(inpEls) {
		console.log('submit upd: ' + inpEls.length);

        const inpKV = {};
		inpKV['cmd'] = 'upd';
        for (let i=0; i< inpEls.length; i++) {
            const datinp = inpEls[i].inpDiv.inp;
            inpKV[datinp.place] = datinp.value;
        }
        let sndDat = JSON.stringify(inpKV);
        console.log('inpkv: ' + sndDat);
        // send data
        this.postDat('/db/person.json',sndDat);
    },

	rendSubmit() {
		const subDiv = document.createElement('div');
        const subBut = new azulButton(dbData.subButRObj);
		this.subButEl = subBut.el;
		subBut.el.textContent = 'submit update';
        subBut.el.addEventListener('click', function() {dbUpd.subFunc(dbData.gridDiv.inpEls);},false);
		subDiv.appendChild(subBut.el);
//		this.subDiv= subDiv;
		return subDiv;
	},


    render() {
		const root = document.createElement('div')
		dbNew.parObj.textContent = 'Update Person';
        const txtel = azul.addElement(dbNew.parObj);
        root.appendChild(txtel);
		this.parEl = document.createElement('p');
		this.parEl.style.margin='10px';
		const pers = dbData.pers;
		if (pers == null) {
			this.parEl.textContent = 'Status: no person to be updated!';
			root.appendChild(this.parEl);
			return root;
		}
		this.parEl.textContent = 'Status: update not submitted!';
		root.appendChild(this.parEl);
		this.Status = this.parEl;
//upd
		const namgrid = dbData.rendGrid();
			namgrid.inpEls[0].inpDiv.inp.value = pers.First;
			namgrid.inpEls[0].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[1].inpDiv.inp.value = pers.Middle;
			namgrid.inpEls[1].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[2].inpDiv.inp.value = pers.Last;
			namgrid.inpEls[2].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[3].inpDiv.inp.value = pers.Email;
			namgrid.inpEls[3].inpDiv.lab.style.visibility = 'visible';
//			namgrid.inpEls[4].inpDiv.inp.value = pers.Phone;
//			namgrid.inpEls[4].inpDiv.lab.style.visibility = 'visible';

		root.appendChild(namgrid);
		const subDiv = this.rendSubmit();
        root.appendChild(subDiv);
        return root;
    },

	rendCmd() {

		const root = dbMain.dbCmd;
		while (root.hasChildNodes()) {
            root.removeChild(root.firstChild);
		};

		dbMain.butNavObj.textContent = 'list';
        this.navBut1 = azul.addElement(dbMain.butNavObj);
        const item1 = azul.addElement(dbMain.itemObj);
        item1.appendChild(this.navBut1);
        root.appendChild(item1);
		this.navBut1.addEventListener('click', dbList.renFun);

		dbMain.butNavObj.textContent = 'add';
        this.navBut2 = azul.addElement(dbMain.butNavObj);
        const item2 = azul.addElement(dbMain.itemObj);
        item2.appendChild(this.navBut2);
        root.appendChild(item2);
		this.navBut2.addEventListener('click', dbNew.renFun);
	},

	renFun() {
		console.log('update');
		const ldiv = dbUpd.render();
		azul.rplDiv(dbMain.dbDat, ldiv);
		dbData.state = 'upd';
	},
};

const dbSearch = {

	async postDat(url, data) {
  		try {
    		const response = await fetch(url, {
      			method: 'POST',
      			headers: {'Content-Type': 'application/json',},
				body: data,});

			if (response.ok) {
				console.log('Search Post Reply Success');
				this.parEl.textContent = 'Status: search success!'
				const list = await response.json();
				const ldiv = dbList.render(list);
				azul.rplDiv(azulSPA.db, ldiv);
				return;
			// disable submit
//				this.subButEl.disabled = true;
    		} else {
     			console.error('Error ' + response.status + ': ' + response.statusText);
				this.parEl.textContent = 'Status: error -- ' + response.statusText;
    		}
  		} catch (error) {
    		console.error('Error:', error.message);
			this.parEl.textContent = 'Status: error -- ' + error.message;
  		}
	},



	subFunc(inpEls) {
		console.log('submit search: ' + inpEls.length);

        const inpKV = {};
		inpKV['cmd'] = 'se';
        for (let i=0; i< inpEls.length; i++) {
            const datinp = inpEls[i].inpDiv.inp;
            inpKV[datinp.place] = datinp.value;
        }
        let sndDat = JSON.stringify(inpKV);
        console.log('inpkv: ' + sndDat);
        // send data
        this.postDat('/db/person.json',sndDat);
    },


	rendSubmit() {

		const subDiv = document.createElement('div');
        const subBut = new azulButton(dbData.subButRObj);
//		this.subButEl = subBut.el;
		subBut.el.textContent = 'submit search';
        subBut.el.addEventListener('click', function() {dbSearch.subFunc(dbData.gridDiv.inpEls);},false);
		subDiv.appendChild(subBut.el);
//		this.subDiv= subDiv;
		return subDiv;
	},

	render() {
		const root = document.createElement('div')
		dbNew.parObj.textContent = 'Search Person';
        const txtel = azul.addElement(dbNew.parObj);
        root.appendChild(txtel);
		const parEl = document.createElement('p');
		parEl.style.margin='10px';
		parEl.textContent = 'Status: not submitted';
		root.appendChild(parEl);

		const namgrid = dbData.rendGrid();
//			namgrid.inpEls[0].inpDiv.inp.value = pers.First;
			namgrid.inpEls[0].inpDiv.inp.value = '';
//			namgrid.inpEls[0].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[1].inpDiv.inp.value = '';
//			namgrid.inpEls[1].inpDiv.inp.value = pers.Middle;
//			namgrid.inpEls[1].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[2].inpDiv.inp.value = '';
//			namgrid.inpEls[2].inpDiv.inp.value = pers.Last;
//			namgrid.inpEls[2].inpDiv.lab.style.visibility = 'visible';
			namgrid.inpEls[3].inpDiv.inp.value = '';
//			namgrid.inpEls[3].inpDiv.inp.value = pers.Email;
//			namgrid.inpEls[3].inpDiv.lab.style.visibility = 'visible';
//			namgrid.inpEls[4].inpDiv.inp.value = pers.Phone;
//			namgrid.inpEls[4].inpDiv.lab.style.visibility = 'visible';

        root.appendChild(namgrid);

		const subDiv = this.rendSubmit();
        root.appendChild(subDiv);
        return root;

	},

	rendCmd() {

		const root = dbMain.dbCmd;
		while (root.hasChildNodes()) {
            root.removeChild(root.firstChild);
		};

		dbMain.butNavObj.textContent = 'list';
        this.navBut1 = azul.addElement(dbMain.butNavObj);
        const item1 = azul.addElement(dbMain.itemObj);
        item1.appendChild(this.navBut1);
        root.appendChild(item1);
		this.navBut1.addEventListener('click', dbList.renFun);

		dbMain.butNavObj.textContent = 'update';
        this.navBut2 = azul.addElement(dbMain.butNavObj);
        const item2 = azul.addElement(dbMain.itemObj);
        item2.appendChild(this.navBut2);
        root.appendChild(item2);
		this.navBut2.addEventListener('click', dbUpd.renFun);
	},



	renFun() {
		console.log('search');
		const ldiv = dbSearch.render();
		azul.rplDiv(dbMain.dbDat, ldiv);
	},

};

const dbDisp = {
    render(pers) {
		const root = document.createElement('div')
		dbNew.parObj.textContent = 'Display Person';
        const txtel = azul.addElement(dbNew.parObj);
        root.appendChild(txtel);
		const parEl = document.createElement('p');
		parEl.style.margin='10px';
		parEl.textContent = 'Status: not submitted';
		root.appendChild(parEl);
		this.Status = parEl;
		const divPN = dbDispPers.rendPrevNxt()
		root.appendChild(divPN);
  		const gdiv = dbDispPers.rendGrid(pers);
		root.appendChild(gdiv);
//		const subDiv = dbData.subDiv;
//        root.appendChild(subDiv);

        return root;
    },

	rendCmd() {

		const root = dbMain.dbCmd;
		while (root.hasChildNodes()) {
            root.removeChild(root.firstChild);
		};

		dbMain.butNavObj.textContent = 'list';
        this.navBut1 = azul.addElement(dbMain.butNavObj);
        const item1 = azul.addElement(dbMain.itemObj);
        item1.appendChild(this.navBut1);
        root.appendChild(item1);
		this.navBut1.addEventListener('click', dbList.renFun);

		dbMain.butNavObj.textContent = 'update';
        this.navBut2 = azul.addElement(dbMain.butNavObj);
        const item2 = azul.addElement(dbMain.itemObj);
        item2.appendChild(this.navBut2);
        root.appendChild(item2);
		this.navBut2.addEventListener('click', dbUpd.renFun)

	},

	renFun(pers) {
		console.log('disp: click!');
		const ldiv = dbDisp.render(pers);
		azul.rplDiv(dbMain.dbDat, ldiv);
		dbDisp.rendCmd();
		dbData.state = 'disp';
	}
};

dbMain.navBut1.addEventListener('click', dbList.renFun);
dbMain.navBut2.addEventListener('click',dbNew.renFun);
//dbMain.navBut3.addEventListener('click',dbUpd.renFun);
dbMain.navBut4.addEventListener('click', dbSearch.renFun);
