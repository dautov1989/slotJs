/**
 * Created by dima on 4/13/15.
 */
function Buttons(obj)
{
    this.game = obj.game;
    this.messages = obj.messages;
    this.money = obj.money;
    this.slots = obj.slots;
    this.buttonReset = {x: 195, y: 480};
    this.buttonAddBet = {x: 345, y: 480};
    this.buttonMaxBet = {x: 465, y: 480};
    this.buttonSpin = {x: 650, y: 480};

    this.loadSprite = function()
    {
        this.game.load.spritesheet('buttons', 'assets/color.png', 128, 123);
    }
    this.init = function()
    {
        this.game.add.button(this.buttonReset.x, this.buttonReset.y, 'buttons', this.actionReset, this, 14, 14, 14);
        this.messages.buttonsMessage('buttonReset');
        this.game.add.button(this.buttonAddBet.x, this.buttonAddBet.y, 'buttons', this.actionAddBet, this, 13, 13, 13);
        this.messages.buttonsMessage('buttonAddBet');
        this.game.add.button(this.buttonMaxBet.x, this.buttonMaxBet.y, 'buttons', this.actionMaxBet, this, 13, 13, 13);
        this.messages.buttonsMessage('buttonMaxBet');
        this.game.add.button(this.buttonSpin.x, this.buttonSpin.y, 'buttons', this.actionSpin, this, 19, 19, 19);
        this.messages.buttonsMessage('buttonSpin')
    }

    this.actionReset = function ()
    {
        if (buttonsEnable) this.money.actionReset();
    }

    this.actionAddBet = function()
    {
        if (buttonsEnable) this.money.actionAddBet();
    }
    this.actionMaxBet = function()
    {
        if (buttonsEnable) this.money.actionMaxBet();
    }

    this.actionSpin = function()
    {
        if (buttonsEnable) this.slots.spin();
    }
}