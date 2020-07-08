const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    TOTAL: Symbol("total"),
    STOP: Symbol("stop"),
    YES: Symbol("yes"),
    READY: Symbol("ready"),
    BAD: Symbol("bad"),
    NO: Symbol("no"),
    SYMPTOMS: Symbol("symptoms"),
    TEMPERATURE: Symbol("temperature"),
    QUESTION: Symbol("sure"),
    THERMOMETER: Symbol("thermometer"),
    COUGH: Symbol("cough"),
    NAUSEA: Symbol("nausea"),
    HEADACHE: Symbol("headache"),
    FATIGUE: Symbol("fatigue")
});

const questions = [
    "Are you feeling well?",
    "Have you travelled outside of Canada in the past month?",
    "Have you been in contact with anyone that has viral symptoms"
];

var symptoms = ["fatigue", "cough", "sore throat", "diarrhea", "nausea", "fever", "headache", "vomit", "skin rash", "chills", "sneezing"];
var a =0;
module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
        this.total = 0;
        this.make = 0;

    }
    makeAMove(sInput) {
        let sReply = "";
        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply = "Are you ready to have a viral adventure? Ready to begin? Yes or No";
                this.stateCur = GameState.YES;
                break;

            case GameState.YES:
                if (sInput.toLowerCase().match("yes")) {
                    sReply = "Did you pack your adventure kit already? READY or NO";
                    this.stateCur = GameState.GOOD;
                } else if (sInput.toLowerCase().match("no")) {
                    sReply = "It seems you are feeling unwell, Let's check the temperature";
                    this.stateCur = GameState.THERMOMETER;
                }
                else {
                    sReply = "I do not understand your selection, please restart your adventure";
                    this.stateCur = GameState.WELCOMING;
                }
                break;

            case GameState.READY:
                if (sInput.toLowerCase().match("ready")) {
                    sReply = "Now, lets check if you have the following symptoms? Please enter 'sure' if you are ready"
                    this.stateCur = GameState.QUESTION;
                } else if (sInput.toLowerCase().match("NO")) {
                    sReply = "It seems you are feeling unwell, Let's check your temperature";
                    this.stateCur = GameState.THERMOMETER;
                }
                else {
                    sReply = "I do not understand your choice, let's restart the adventure";
                    this.stateCur = GameState.WELCOMING;
                }
                break;

            case GameState.QUESTION:
                if (sInput.toLowerCase().match("sure")) {
                    for (var i = 0; i < 3; i++) {
                        sReply = `${questions[i]}`;
                        if (sInput = "yes") {
                            this.stateCur = GameState.THERMOMETER;
                        }
                    }
                }
                else {
                    while (a < 1) {
                        sReply = `${questions[a]}`;
                        a++;
                      }
                    this.stateCur = GameState.THERMOMETER;
                }
                break;

            case GameState.THERMOMETER:
                if (sInput.toLowerCase().match("thermometer")) {
                    sReply = "Thermometer! Please enter the word temperature to check your temperature, or enter the word fever if you know you got a fever already";
                    this.make++;
                    if (this.make ===3){
                        this.stateCur = this.temperature;
                    }
                }
                else {
                    sReply = "Tell me your temperature in celcius.";
                    this.stateCur = this.fever;
                }
                break;

            case GameState.TEMPERATURE:
                if (sInput.toLowerCase().match("temperature")) {
                    sReply = "What's is your temperature now?";
                    this.stateCur = GameState.FEVER;
                }
                else {
                    sReply = "Your thermometer is not working. I will check your temperature myself";
                    this.stateCur = GameState.FEVER;
                }
                break;

            case GameState.FEVER:
                if (sInput >= 37) {
                    sReply = "You have a high fever. Please type 'symptoms' to check check your symptoms or press 'end' to end the story";
                    this.stateCur = GameState.SYMPTOMS;

                } else if (sInput < 36){
                    sReply = " Your temprature is normal. Please type 'symptoms' to check check your symptoms or press 'end' to end the story";
                    this.stateCur = GameState.SYMPTOMS;
                }
                else {
                    sReply = " Enter your temperature in celcius."
                    this.stateCur = GameState.FEVER;
                }
                break;

                case GameState.SYMPTOMS:
                    if (sInput.toLowerCase().match("symptoms")) {
                        for (var j = 0; j < symptoms.length; j++) {
                            sReply = "There are " + [j] + "common symptoms. Type 'cough' if you have a cough. Type 'fatigue' if you have fatigue.";
                        }
                        this.stateCur = GameState.COUGH;
                    }
                    else{
                        while (a < 2) {
                            sReply = `${questions[a]}`+". Let's try to type symptoms again.";
                            a++;
                          }
                        this.stateCur = this.SYMPTOMS;
                    }
                    break;

            case GameState.COUGH:
                if (sInput.toLowerCase().match("cough")) {
                    sReply = "Type 'headache' if you have a headache. Type 'fatigue' if you have fatigue.";
                    this.stateCur = GameState.HEADACHE;
                } 
                else {
                    sReply = "Type 'headache' if you have headache. Type 'end' if you want to end the game";
                    this.stateCur = GameState.HEADACHE;
                }
                break;

                case GameState.HEADACHE:
                    if (sInput.toLowerCase().match("headache")) {
                        sReply = "Type 'fatigue' if you have fatigue. Press 'end' to end the game.";
                        this.stateCur = GameState.Fatigue;
                    } 
                    else{
                            sReply = "I think you are healthy. Press 'end' to end the game.";
                            this.stateCur = GameState.END;
                        }
                    break;

                case GameState.FATIGUE:
                    if  (sInput.toLowerCase().match("fatigue")) {
                        sReply = "I think you are sick. Press 'end' to end the game.";
                        this.stateCur = GameState.FATIGUE;
                    }
                    else{
                        sReply = "I think you are healthy. Press 'end' to end the game.";
                        this.stateCur = GameState.END;
                    }
                    break;

            case GameState.END:
                if (sInput.toLowerCase().match("end")) {
                    sReply="Thanks for participating ";
                    break;
                } else {
                    sReply = "I advance you to start again";
                    this.stateCur = GameState.WELCOMING;
                }
        }
        return ([sReply]);
    }
}