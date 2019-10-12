/**
 *
 */
class OrMask_Transaction extends jsTPS_Transaction {

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
     * This transaction masks the num.
     */
    doTransaction() {
        this.num.orMask(this.mask);
    }

    /**
     * As the reverse of do, this method unmasks num.
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
        return "Or Mask " + this.mask;
    }
}