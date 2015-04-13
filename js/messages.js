/**
 * Created by dima on 4/13/15.
 */
function Messages(obj)
{
    this.game = obj.game;
    this.Lang = obj.gameLang;
    this.buttonReset    = {x: 220, y: 520, size: '24px'};
    this.buttonAddBet   = {x:360, y: 520, size: '24px'};
    this.buttonMaxBet   = {x:480, y: 520, size: '24px'};
    this.buttonSpin     = {x:665, y: 515, size: '34px'};

    this.moneyMinBet = {x:10, y: 480};
    this.moneyMaxBet = {x:10, y: 500};
    this.moneyTotal = {x:10, y: 540};
    this.moneyBet   = {x: 10, y: 560};
    this.moneyWin   = {x: 10, y: 580};
    this.counter = 0;

    this.loadImage = function()
    {
        this.game.load.image('board', 'assets/sprite_board.png');
    }

    this.init = function()
    {
        this.game.add.sprite(20, 20, 'board');
    }

    this.buttonsMessage = function(type)
    {
        this.game.add.text(this[type].x, this[type].y, this.Lang[type], { font: this[type].size + ' cursive', fill: '#000' });
    }

    this.moneyMessage = function(type, summ)
    {
        this['_'+type] = this.game.add.text(this[type].x, this[type].y, this.Lang[type] + summ + ' $', { font: '14px Arial', fill: '#fff' });
    }

    this.updateMoneyMessage = function(type, summ)
    {
        this['_'+type].setText(this.Lang[type] + summ + ' $');
    }

    this.boardMessage = function(y, coef)
    {
        this.game.add.text(160, y, this.Lang['x3'] + '       ' + coef, { font: '34px Arial', fill: '#000' });
    }

    this.userMessage = function(message, color, blink)
    {
        var k = this.Lang[message].length;
        this.game.world.remove(this.text);
        this.text = this.game.add.text(550 - k * 12 , 115, this.Lang[message], { font: '44px cursive', fill: color });
        if(typeof blink != 'uindefined')
        {
            this.game.timer = this.game.time.create(false);
            this.game.timer.loop(500, this.updateCounter, this);
            this.game.timer.start();
        }
    }

    this.updateCounter = function()
    {
        this.counter++;
        this.text.visible = !this.text.visible;
        if(this.counter == 4)
        {
            this.counter = 0;
            this.game.timer.stop();

        }

    }

}