var Players = [];
var Cards = [];
var CardsInHand;


class Card {
    static numCards = 0;

    //these variables do not change after creation
    numID;// number id (starts at 0)
    type;// type of card (0, 1, 2 for who, what, where)
    name;

    //these variables can change after creation
    owner = null; //the player who owns this card
    defDoesnt = []; // list of players who dont have this card
    maybe = []; // a player who might have this card (not added if in defDoesnt)

    /**
     * 
     * @param {*} initName the name of the card
     * @param {*} initType the type of the card
     */
    constructor(initName, initType) {
        this.numID = numCards;
        numCards++;
        this.type = initType;
        this.name = initName;
    }

    // accessors *************************************************

    /**
     * 
     * @returns the number of cards that have been created
     */
    getTotalNumCards() {
        return numCards;
    }

    /**
     * 
     * @returns the number id of this card
     */
    getID() {
        return this.numID;
    }

    /**
     * 
     * @returns the type of the card it is (1, 2, 3 for who, what, where)
     */
    getType() {
        return this.type;
    }

    /**
     * 
     * @returns the name of this card
     */
    getName() {
        return this.name;
    }

    /**
     * 
     * @returns the owner of the card. returns null if no one owns it
     */
    getOwner() {
        return this.owner;
    }

    /**
     * 
     * @returns list of players who dont have this card
     */
    getDeffDoesnt() {
        return this.defDoesnt;
    }

    /**
     * 
     * @returns the list of players who might have this card
     */
    getMaybe() {
        return this.maybe;
    }
    /**
     * 
     * @param {*} initCard the card that this card is being compared to 
     * @returns true if this card equals initCard false if this card doesnot equal initcard
     */
    equals(initCard) {
        if (initCard.getID() == this.numID) {
            return true;
        }
        return false;
    }

    // modifiers *************************************************

    /**
     * 
     * @param {*} initPlayer sets a player as owner
     */
    setOwner(initPlayer) {
        this.owner = initPlayer;
        // adds all players other players to defDoesnt which also clears maybe list
        for (i = 0; i < Players.length; i++) {
            if (!initPlayer.equals(Players[i])) {
                this.addDefDoesnt(Players[i]);
            }
        }

    }

    /**
     * 
     * @param {*} initPlayer adds player to defDoesnt. player is removed if in maybe
     */
    addDefDoesnt(initPlayer) {
        // removes from maybe        
        for (i = 0; i < this.maybe.length; i++) {
            if (initPlayer.equals(this.maybe[i])) {
                this.maybe.splice(i);
            }
        }

        // if already in defdoesnt skip rest of function
        for (i = 0; i < this.defDoesnt; i++) {
            if (this.defDoesnt[i].equals(initPlayer)) {
                return;
            }
        }
        // add to defdoesnt
        this.defDoesnt.push(initPlayer);
    }

    /**
     * 
     * @param {*} initPlayer the player being added to maybe players
     */
    addMaybe(initPlayer) {
        // If player is already owned
        if (this.owner != null) {
            return;
        }

        // if player is already in defDoesnt skip rest of function
        for (i = 0; i < this.defDoesnt.length; i++) {
            if (initPlayer.equals(this.defDoesnt[i])) {
                return;
            }
        }

        // adds player to maybe if not already in maybe
        for (i = 0; i < this.maybe.length; i++) {
            if (this.maybe[i].equals(initPlayer)) {
                return;
            }
        }
        this.maybe.push(initPlayer);
    }
}

class Player {
    static totalNumPlayers = 0;

    numID;
    name;

    myHand = [];
    maybeCards = [];

    // constructor *************************************************

    constructor(initName) {
        this.numID = totalNumPlayers;
        totalNumPlayers++;
        this.name = initName;
    }

    // accessors *************************************************

    /**
     * 
     * @returns the id of this player
     */
    getID() {
        return this.numID;
    }

    /**
     * 
     * @returns the name of this player
     */
    getName() {
        return this.name;
    }

    /**
     * 
     * @returns the known cards of a players hand
     */
    getMyHand() {
        return this.myHand;
    }

    /**
     * 
     * @returns the cards this player might have based on what they have proved wrong. returns in the format of [[who, what, where], ...]
     */
    getMaybe() {
        return this.maybeCards;
    }

    /**
     * 
     * @param {*} initPlayer if this player equals initplayer
     * @returns true if both players are the same players false otherwise
     */
    equals(initPlayer) {
        if (this.numID == initPlayer.getID()) {
            return true;
        }
        return false;
    }

    //modifiers *************************************************

    /**
     * 
     * @param {*} initCard the card being added to this players hand
     */
    addCard(initCard){
        for(i = 0; i < this.myHand.length;i++){
            if(this.myHand[i].equals(initCard)){
                return;
            }
        }
        this.myHand.push(initCard);
    }

    /**
     * 
     * @param {*} initCard if initcard is in players hand it is removed
     */
    removeCard(initCard){
        for(i = 0; i < this.myHand.length; i++){
            if(this.myHand[i].equals(initCard)){
                this.myHand.splice(i);
            }
        }
    }

    /**
     * 
     * @param {*} initWhoCard the card that was guessed when this player proved wrong
     * @param {*} initWhatCard the card that was guessed when this player proved wrong
     * @param {*} initWhereCard the card that was guessed when this player proved wrong
     */
    addMaybeCards(initWhoCard, initWhatCard, initWhereCard){
        this.maybeCards.push([initWhoCard, initWhatCard, initWhereCard]);
    }

}