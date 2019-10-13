/**
 *
 */
//import jsTPS_Transaction from "./jsTPS_Transaction.js";

class AndMask_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    constructor(initNum, initIntNum, initMask) {
        super();
        // THIS IS THE OBJECT IT WILL MANIPULATE
        this.num = initNum;
        this.intNum = initIntNum;
        
        // AMOUNT TO MASK FOR NUM
        this.mask = initMask;
    }

    /**
     * This transaction adds the mask to the num.
     */
    doTransaction() {
        this.num.andMask(this.mask);
    }

    /**
     * As the reverse of do, this method removes the mask from num.
     */
    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "And Mask " + this.mask;
    }
}