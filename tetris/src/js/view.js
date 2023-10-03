export default class View {

    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red',
    };

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBoarderWidth = 4;
        this.playfieldX = this.playfieldBoarderWidth;
        this.playfieldY = this.playfieldBoarderWidth;
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBoarderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBoarderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }
    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);

    }

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textAlign = 'middle';
        this.context.fillText('Нажми ENTER чтобы начать', this.width / 2, this.height / 2);
        this.context.fillText('Используйте стрелочки', this.width / 2, (this.height / 2) + 50);
        this.context.fillText('⇧ - поворот фигуры', this.width / 2, (this.height / 2) + 80);
        this.context.fillText('⇨ - движение вправо', this.width / 2, (this.height / 2) + 110);
        this.context.fillText('⇦ - движение влево', this.width / 2, (this.height / 2) + 140);
        this.context.fillText('⇩ - ускорить падене', this.width / 2, (this.height / 2) + 170);
        this.context.fillText('ENTER - Пауза', this.width / 2, (this.height / 2) + 230);
    }

    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillRect(0,0, this.width, this.height);


        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textAlign = 'middle';
        this.context.fillText('Нажми ENTER для продолжения', this.width / 2, this.height / 2);
        this.context.fillText('Используйте стрелочки', this.width / 2, (this.height / 2) + 50);
        this.context.fillText('⇧ - поворот фигуры', this.width / 2, (this.height / 2) + 80);
        this.context.fillText('⇨ - движение вправо', this.width / 2, (this.height / 2) + 110);
        this.context.fillText('⇦ - движение влево', this.width / 2, (this.height / 2) + 140);
        this.context.fillText('⇩ - ускорить падене', this.width / 2, (this.height / 2) + 170);
    }
    renderEndScreen({score}) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textAlign = 'middle';
        this.context.fillText('ИГРА ОКОНЧЕНА', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Счет: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText(`ENTER - попробовать снова`, this.width / 2, this.height / 2 + 48);

    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    renderPlayfield({playfield}) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(
                        this.playfieldX + (x * this.blockWidth), 
                        this.playfieldY + (y * this.blockHeight), 
                        this.blockWidth, 
                        this.blockHeight, 
                        View.colors[block]
                    );
                }
            }
        }
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBoarderWidth;
        this.context.strokeRect (0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"'

        this.context.fillText(`Уровень: ${level}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Счет: ${score}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Линий:${lines}`, this.panelX, this.panelY + 48);
        this.context.fillText(`Следующая:`, this.panelX, this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++)
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 100 + (y * this.blockHeight * 0.5),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colors[block]
                    );
                }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
                    this.context.strokeStyle = 'black';
                    this.context.lineWidth = 2;

                    this.context.fillRect(x, y, width, height);
                    this.context.strokeRect(x, y, width, height);
    }
}