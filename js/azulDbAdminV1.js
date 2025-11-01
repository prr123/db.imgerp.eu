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
//      const result = await response.json();
//      console.log('Success:', result);
      console.log('Success');
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const dbDat = {
	first: "",
	last: "",
};

const dbInpNew = {

	render() {

	},

	sendInp() {

	},
};

const dbList = {
	
	getList(num) {
		return plist;
	},
};

const dbFind = {

};

const dbGet = {

};

const dbDisp = {

	render() {

	},
};

const dataTest = {
    parObj: {
        typ: 'h2',
        textContent: 'Add New Person',
        style: {
            margin: 'auto',
            textAlign: 'center',
         },
    },

    subButObj: {
        text: 'submit test',
        style: {
            display: 'block',
            textAlign: 'center',
            width: '200px',
            margin: '20px auto',
        },
    },

    gridObj: {
//        rows: 3,
//        cols: 1,
        matrix: [[{Field: 'First', Length: '150px', idx: 1, Req: true},{Field: 'Middle', Length: '200px', idx: 2},{Field: 'Last', Length: '200px', idx: 3, Req: true}],
        [{Field: 'Email',Length: '250px', idx: 4, Req: true}]],
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

        this.gridObj.rows = this.gridObj.matrix.length;
        this.gridObj.cols = 1;

        const namgrid = azul.addGrid(this.gridObj);

        namgrid.rows = this.gridObj.matrix.length;
        namgrid.cols = 1;

        namgrid.inpels = [];
        for (let r=0; r< this.gridObj.matrix.length; r++) {
            for (let c=0; c< this.gridObj.matrix[r].length; c++) {
                let inpel = new azulInp(this.gridObj.matrix[r][c]);
                namgrid.inpels.push(inpel);
                namgrid.els[r][0].appendChild(inpel.inpDiv);
//                namgrid.els[r].appendChild(inpel.inpDiv);
            }
        }
        let elcnt = namgrid.inpels.length

        for (let i=0; i< elcnt; i++) {
            let inxt = i +1;
            if (inxt>elcnt-1) {inxt=0;}
            let iprv = i - 1;
            if (iprv<0) {iprv=elcnt-1;}
            InpSetNextPrev(namgrid.inpels[i].inpDiv.inp, namgrid.inpels[inxt].inpDiv.inp, namgrid.inpels[iprv].inpDiv.inp);
        }

        return namgrid;
    },

    getInpValues: function(namesObj) {
        let inpVal = {
            First: namesObj.inpels[0].getInpValue(),
            Middle: namesObj.inpels[1].getInpValue(),
            Last: namesObj.inpels[2].getInpValue(),
            Email: namesObj.inpels[3].getInpValue(),
//            Phone: namesObj.inp5.getInpValue(),
        };
        const inpJsonStr = JSON.stringify(inpVal)
        console.log('hello inp: ' + inpJsonStr);
        return inpJsonStr;
    },

    // root is a div
    render(root) {
        let txtel = azul.addElement(this.parObj);
        root.appendChild(txtel);
        let namGrid = this.rendGrid();
        root.appendChild(namGrid);
        let subBut = new azulButton(this.subButObj);
        subBut.el.addEventListener('click', function() {dataTest.subfunc(namGrid.inpels);},false);
        root.appendChild(subBut.el);
        return root;
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

    subfunc(inpdata) {
        const inpcnt = inpdata.length;
//      console.log('inp els: ' + inpcnt);
        const chkDat = this.checkData(inpdata);
        if (!chkDat) {
            console.log ("error -- checkData");
            return;
        }
        inpKV = {};
        for (let i=0; i< inpcnt; i++) {
            let datinp = inpdata[i].inpDiv.inp;
//          console.log(i + ': ' + datinp.place + ': ' + datinp.value);
            inpKV[datinp.place] = datinp.value;
        }
        let sndDat = JSON.stringify(inpKV);
        console.log('inpkv: ' + sndDat);
        // send data
        postData('/xjs/person.json',sndDat);
    },
};

dataTest.render(azulSPA.db);
