/**
 * jsTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 */
class jsTPS_Unit_Tests {
    constructor() {
        this.unitTest = document.getElementById("unitTest"); // DISPLAY THE CURRENT TPS
    }

    /**
     * This JsUnit test is for testing the adding of transactions.
     */
    testAdd() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.unitTest.innerHTML += "<strong>testAdd</strong>";
        //Assert.assertEquals(0, num.getNum());
        let testAdd0 = document.createElement("div");
        testAdd0.innerHTML = "Num == 0 : " + (num.getNum() == 0) + "<br/>";
        this.unitTest.appendChild(testAdd0);

        // ADD 5 TRANSACTION
        let testAdd1 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        testAdd1.innerHTML = ("ADD 5 TRANSACTION"
            + "<br/>Num == 5 : " + (num.getNum() == 5)
            + "<br/>jsTPS size == 1 : " + (tps.getSize() == 1)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 1 : " + (tps.getUndoSize() == 1));
        this.unitTest.appendChild(testAdd1);

        // ADD 10 TRANSACTION
        let testAdd2 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        testAdd2.innerHTML = ("ADD 10 TRANSACTION"
            + "<br/>Num == 15 : " + (num.getNum() == 15)
            + "<br/>jsTPS size == 2 : " + (tps.getSize() == 2)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 2 : " + (tps.getUndoSize() == 2));
        this.unitTest.appendChild(testAdd2);

        // ADD 20 TRANSACTION
        let testAdd3 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        testAdd3.innerHTML = ("ADD 20 TRANSACTION"
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testAdd3);

    }

    /**
     * This JsUnit test is for testing the and-mask transactions.
     */
    testAndMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.unitTest.innerHTML += "<strong>testAndMask</strong>";
        let testAndMask0 = document.createElement("div");
        testAndMask0.innerHTML = "Num == 0 : " + (num.getNum() == 0);
        this.unitTest.appendChild(testAndMask0);

        let testAndMask1 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        testAndMask1.innerHTML = ("AND MASK NUM 12 BY 4"
            + "<br/>Num == 4 : " + (num.getNum() == 4)
            + "<br/>jsTPS size == 2 : " + (tps.getSize() == 2));
        tps.undoTransaction();
        testAndMask1.innerHTML += "<br/>UNDO TRANSACTION"
            + "<br/>Num == 12 : " + (num.getNum() == 12)
            + "<br/>jsTPS size == 2 : " + (tps.getSize() == 2)
            + "<br/>Redo size == 1 : " + (tps.getRedoSize() == 1)
            + "<br/>Undo size == 1 : " + (tps.getUndoSize() == 1);
        this.unitTest.appendChild(testAndMask1);
    }

    /**
     * This JsUnit test is for testing the or-mask transactions.
     */
    testOrMask() {
        let tps = new jsTPS();
        let num = new Num();
        this.unitTest.innerHTML += "<strong>testOrMask</strong>";
        let testOrMask0 = document.createElement("div");
        testOrMask0.innerHTML = "Num == 0 : " + (num.getNum() == 0);
        this.unitTest.appendChild(testOrMask0);

        let testOrMask1 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 11));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 4));
        testOrMask1.innerHTML = ("OR MASK NUM 11 BY 4"
            + "<br/>Num == 15 : " + (num.getNum() == 15)
            + "<br/>jsTPS size == 2 : " + (tps.getSize() == 2));
        tps.undoTransaction();
        testOrMask1.innerHTML += "<br/>UNDO TRANSACTION"
            + "<br/>Num == 11 : " + (num.getNum() == 11)
            + "<br/>jsTPS size == 2 : " + (tps.getSize() == 2)
            + "<br/>Redo size == 1 : " + (tps.getRedoSize() == 1)
            + "<br/>Undo size == 1 : " + (tps.getUndoSize() == 1);
        this.unitTest.appendChild(testOrMask1);

    }

    /**
     * This JsUnit test is for testing the undoing of transactions.
     */
    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.unitTest.innerHTML += "<strong>testUndo</strong>";
        let testUndo0 = document.createElement("div");
        testUndo0.innerHTML = "Num == 0 : " + (num.getNum() == 0)
            + "<br/>jsTPS has transaction to Undo == false : " + (tps.hasTransactionToUndo() == false)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false);

        // ADD 3 TRANSACTIONS (5, 10, and 20)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        testUndo0.innerHTML += ("<br>ADD 3 TRANSACTIONS (5, 10, 20)"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false)
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testUndo0);

        // UNDO A TRANSACTION
        tps.undoTransaction();
        let testUndo1 = document.createElement("p");
        testUndo1.innerHTML = ("UNDO TRANSACTION"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == true : " + (tps.hasTransactionToRedo() == true)
            + "<br/>Num == 15 : " + (num.getNum() == 15)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 1 : " + (tps.getRedoSize() == 1)
            + "<br/>Undo size == 2 : " + (tps.getUndoSize() == 2));
        this.unitTest.appendChild(testUndo1);

        // UNDO ANOTHER
        tps.undoTransaction();
        let testUndo2 = document.createElement("p");
        testUndo2.innerHTML = ("UNDO ANOTHER TRANSACTION"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == true : " + (tps.hasTransactionToRedo() == true)
            + "<br/>Num == 5 : " + (num.getNum() == 5)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 2 : " + (tps.getRedoSize() == 2)
            + "<br/>Undo size == 1 : " + (tps.getUndoSize() == 1));
        this.unitTest.appendChild(testUndo2);

        // AND ANOTHER
        tps.undoTransaction();
        let testUndo3 = document.createElement("p");
        testUndo3.innerHTML = ("UNDO ANOTHER TRANSACTION AGAIN"
            + "<br/>jsTPS has transaction to Undo == false : " + (tps.hasTransactionToUndo() == false)
            + "<br/>jsTPS has transaction to Redo == true : " + (tps.hasTransactionToRedo() == true)
            + "<br/>Num == 0 : " + (num.getNum() == 0)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 3 : " + (tps.getRedoSize() == 3)
            + "<br/>Undo size == 0 : " + (tps.getUndoSize() == 0));
        this.unitTest.appendChild(testUndo3);

        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        let testUndo4 = document.createElement("p");
        testUndo4.innerHTML = ("UNDO TRANSACTION, NO MORE UNDO SO DOES NOTHING"
            + "<br/>jsTPS has transaction to Undo == false : " + (tps.hasTransactionToUndo() == false)
            + "<br/>jsTPS has transaction to Redo == true : " + (tps.hasTransactionToRedo() == true)
            + "<br/>Num == 0 : " + (num.getNum() == 0)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 3 : " + (tps.getRedoSize() == 3)
            + "<br/>Undo size == 0 : " + (tps.getUndoSize() == 0));
        this.unitTest.appendChild(testUndo4);

    }

    /**
     * This JsUnit test is for testing the redoing of transactions.
     */
    testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.unitTest.innerHTML += "<strong>testRedo</strong>";
        let testRedo0 = document.createElement("div");
        testRedo0.innerHTML = "Num == 0 : " + (num.getNum() == 0);

        // ADD 3 TRANSACTIONS (5, 10, and 20)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        testRedo0.innerHTML += ("<br>ADD 3 TRANSACTIONS (5, 10, 20)"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false)
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testRedo0);

        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        let testRedo1 = document.createElement("p");
        testRedo1.innerHTML = ("UNDO AND THEN REDO TRANSACTION"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false)
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testRedo1);

        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        let testRedo2 = document.createElement("p");
        testRedo2.innerHTML = ("UNDO 2 TRANSACTIONS AND REDO THEM"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false)
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testRedo2);

        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        let testRedo3 = document.createElement("p");
        testRedo3.innerHTML += ("UNDO ALL 3 TRANSACTIONS AND REDO THEM"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false)
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testRedo3);

        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        let testRedo4 = document.createElement("p");
        testRedo4.innerHTML = ("UNDO 3 TRANSACTIONS AND REDO 2"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == true : " + (tps.hasTransactionToRedo() == true)
            + "<br/>Num == 15 : " + (num.getNum() == 15)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 1 : " + (tps.getRedoSize() == 1)
            + "<br/>Undo size == 2 : " + (tps.getUndoSize() == 2));
        this.unitTest.appendChild(testRedo4);

        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        let testRedo5 = document.createElement("p");
        testRedo5.innerHTML = ("UNDO ALL 3 TRANSACTIONS AND REDO 4, LAST REDO DOES NOTHING"
            + "<br/>jsTPS has transaction to Undo == true : " + (tps.hasTransactionToUndo() == true)
            + "<br/>jsTPS has transaction to Redo == false : " + (tps.hasTransactionToRedo() == false)
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testRedo5);

    }

    /**
     * This JsUnit test is for testing clearing of transactions.
     */
    testClear() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.unitTest.innerHTML += "<strong>testClear</strong>";
        let testClear0 = document.createElement("div");
        testClear0.innerHTML = "Num == 0 : " + (num.getNum() == 0);

        // ADD 3 TRANSACTIONS (5, 10, and 20)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        testClear0.innerHTML += ("<br/>ADD 3 TRANSACTIONS (5, 10, 20)"
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testClear0);

        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        let testClear1 = document.createElement("p");
        testClear1.innerHTML = ("CLEAR ALL TRANSACTIONS"
            + "<br/>Num == 35 : " + (num.getNum() == 35)
            + "<br/>jsTPS size == 0 : " + (tps.getSize() == 0)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 0 : " + (tps.getUndoSize() == 0));
        this.unitTest.appendChild(testClear1);

        // ADD 3 TRANSACTIONS (5, 10, and 20)
        let testClear2 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        testClear2.innerHTML += ("ADD 3 TRANSACTIONS (5, 10, 20)"
            + "<br/>Num == 70 : " + (num.getNum() == 70)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testClear2);

        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        let testClear3 = document.createElement("p");
        testClear3.innerHTML = ("CLEAR ALL TRANSACTIONS AGAIN"
            + "<br/>Num == 70 : " + (num.getNum() == 70)
            + "<br/>jsTPS size == 0 : " + (tps.getSize() == 0)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 0 : " + (tps.getUndoSize() == 0));
        this.unitTest.appendChild(testClear3);

        // ADD 3 TRANSACTIONS (5, 10, and 20)
        let testClear4 = document.createElement("p");
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        testClear4.innerHTML += ("ADD 3 TRANSACTIONS (5, 10, 20)"
            + "<br/>Num == 105 : " + (num.getNum() == 105)
            + "<br/>jsTPS size == 3 : " + (tps.getSize() == 3)
            + "<br/>Redo size == 0 : " + (tps.getRedoSize() == 0)
            + "<br/>Undo size == 3 : " + (tps.getUndoSize() == 3));
        this.unitTest.appendChild(testClear4);

    }

}