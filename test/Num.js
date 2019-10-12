/**
 * Num.js
 *
 * This class serves as the data class that our transactions will manipulate.
 * It's just an integer wrapper class.
 *
 */
class Num {
    constructor() {
        // THE NUMBER THIS CLASS MANAGES
        this.num = 0;
    }

    /**
     * Mutator method for the num instance variable.
     *
     * @param initNum The value to set num to.
     */
    setNum(initNum) {
        this.num = initNum;
    }

    /**
     * Accessor method for num.
     *
     * @return The num instance variable value.
     */
    getNum() {
        return this.num;
    }

    andMask(mask) {
        num = num & mask;
    }

    orMask(mask) {
        num = num | mask;
    }
}