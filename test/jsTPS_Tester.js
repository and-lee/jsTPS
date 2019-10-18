/**
 * This driver demonstrates simple usage of the jTPS API.
 * This runs our demo program. Note that it presents a 
 * menu, retrieves the input, and executes the selected
 * behavior.
 * 
 */
class jsTPS_Tester {
    constructor() {
        // HERE'S OUR TRANSACTION PROCESSING SYSTEM
        this.jsTPS = new jsTPS();

        // HERE'S THE DATA WE'RE MANIPULATING IN THIS DEMO
        this.num = new Num();

        document.getElementById("add").addEventListener("click", this["add"].bind(this));
        document.getElementById("undo").addEventListener("click", this["undo"].bind(this));
        document.getElementById("redo").addEventListener("click", this["redo"].bind(this));
        document.getElementById("clearAll").addEventListener("click", this["clearAll"].bind(this));
        document.getElementById("reset").addEventListener("click", this["reset"].bind(this));

        document.getElementById("value").innerHTML = this.num.getNum(); // DISPLAY NUM
        document.getElementById("currTPS").innerHTML = this.jsTPS.toString(); // DISPLAY THE CURRENT TPS
    }

    add() {
        let addAmount = parseInt(document.getElementById("addAmount").value); // GET THE USER SELECTION

        if (isNaN(addAmount)) {
            alert("Please enter a number.");
            return;
        }
        // ADD AND EXECUTE A TRANSACTION
        let transaction = new AddToNum_Transaction(this.num, addAmount);
        this.jsTPS.addTransaction(transaction);

        this.updateJSTPSAndNum();
        console.log(transaction);
        console.log(this.jsTPS.toString());

    }

    undo() {
        // UNDO A TRANSACTION
        this.jsTPS.undoTransaction();
        this.updateJSTPSAndNum();
        console.log(this.jsTPS.toString());
    }

    redo() {
        // REDO A TRANSACTION
        this.jsTPS.doTransaction();
        this.updateJSTPSAndNum();
        console.log(this.jsTPS.toString());
    }

    clearAll() {
        // CLEAR ALL TRANSACTIONS
        this.jsTPS.clearAllTransactions();
        this.updateJSTPSAndNum();
        console.log(this.jsTPS.toString());
    }

    reset() {
        // CLEAR ALL TRANSACTIONS AND RESET NUM TO 0
        this.jsTPS.clearAllTransactions();
        this.num.setNum(0);
        this.updateJSTPSAndNum();
        console.log(this.jsTPS.toString());
    }

    updateJSTPSAndNum() {
        // DISPLAY NUM
        // DISPLAY THE CURRENT TPS
        document.getElementById("value").innerHTML = this.num.getNum();
        document.getElementById("currTPS").innerHTML = this.jsTPS.toString();
    }

}