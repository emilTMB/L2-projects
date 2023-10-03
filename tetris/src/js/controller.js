export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalid = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }
    update() {
        this.game.movePieceDown()
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }
    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }
    reset() {
        this.game.reset();
        this.play();
    }
    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderPauseScreen(state);
        } else {
            this.view.renderMainScreen(state);
        }
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 200;
        if (!this.intervalid) {
            this.intervalid = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }
    
    stopTimer() {
        if (this.intervalid) {
            clearInterval(this.intervalid);
            this.intervalid = null;
        }
    }

    handleKeyDown(event) {
        const state = this.game.getState();
    
        switch(event.key) {
            case 'Enter': // клавиша Enter
                if (state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 'ArrowLeft': // стрелка влево
                if (this.isPlaying) { 
                    this.game.movePieceLeft();
                    this.updateView();
                }
                break;
            case 'ArrowUp': // стрелка вверх
                if (this.isPlaying) { 
                    this.game.rotatePiece(); 
                    this.updateView();
                }
                break;
            case 'ArrowRight': // стрелка вправо
                if (this.isPlaying) { 
                    this.game.movePieceRight();
                    this.updateView();
                }
                break;
            case 'ArrowDown': // стрелка вниз
                if (this.isPlaying) { 
                    this.game.movePieceDown();
                    this.updateView();
                }
                break;
        }
    }
}
