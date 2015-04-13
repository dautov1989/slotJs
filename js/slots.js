/**
 * Created by dima on 4/11/15.
 */
function Slot(obj)
{
    this.x = 370;
    this.y = 280;
    this.xStep = 130;

    this.whilesCount = 3;
    this.slotsCount = 5;

    this.minLoopsCount = 5;
    this.loopsStep = 5;

    this.winsTotal = 0;
    this.game = obj.game;
    this.wins = obj.wins;
    this.money = obj.money;
    this.messages = obj.messages;
    this.items = [];
    this.gameWin;


    this.loadSprite = function()
    {
        this.game.load.spritesheet('slots', 'assets/s1.png', 110, 126, 5);
    }

    this.init = function()
    {
        for(i = 0; i < this.whilesCount; i++)
        {
            this.items.push(this.game.add.sprite(this.x + i * this.xStep, this.y, 'slots'));
            //init start slot
            this.items[i].frame = Math.floor((Math.random() * this.slotsCount));
            // loops count while slots runing
            this.items[i].countLoops = this.countLoops(i);
            //enable buttons
            this.items[i].enableButtons = (i == this.whilesCount - 1) ? true : false;
            if (i == this.whilesCount - 1)
            {
                this.items[i].money = this.money;
            }
        }
    }
    this.spin = function()
    {
        if(this.money.Bet == 0)
        {
            this.money.money.Total
                ? this.messages.userMessage('put_your_bet', 'red', 'blink')
                : this.messages.userMessage('you_loose_all_money', 'red', 'blink');
            return false;
        }

        buttonsEnable = false;
        //before spining we should to know we win or loose
        var itemsFrame = this.winOrLoose();
        if (typeof itemsFrame == 'undefined')
            itemsFrame = this.winOrLoose();
        // here is a bug sometymes
        this.items[this.items.length - 1].gameWin = this.gameWin;

        //spining animation
        var anim = [];
        for(var i = 0; i < this.items.length; i++)
        {
            this.items[i].frameVal = itemsFrame[i];
            anim[i] = this.items[i].animations.add('run');
            anim[i].onLoop.add( this.animationLooped, this.items[i]);
            anim[i].onComplete.add(this.animationStopped, this.items[i]);
            anim[i].play(31, true);
        };
    }
    this.animationLooped = function(sprite, animation) {

        if (animation.loopCount == this.countLoops)
        {
            animation.loop = false;
        }
    }
    this.animationStopped = function(sprite, animation)
    {
        this.frame = this.frameVal;
        if (this.enableButtons) buttonsEnable = true;

        //change money count
        if(typeof this.money != 'undefined')
            (!this.gameWin) ? this.money.actionLoose() : this.money.actionWin(this.frameVal);
    }

    this.countLoops = function(i)
    {
        return this.minLoopsCount + i * this.loopsStep;
    }

    // function decides player win or loose current round and return array of slots that we have to
    // display after spinning
    this.winOrLoose = function()
    {
        /*
            when people chane configuration of wins we can't be sure that we have exactly 100%
            it may be little less or bigger.. so recount
        */
        var c = 10;

        if(this.winsTotal == 0 )
        {
            for(var i = 0 ; i < wins.length; i++)
            {
                this.winsTotal += wins[i];
            }
            this.coef = (1-this.wins[0]/this.winsTotal).toFixed(2) * 1;
            this.winsTotal *= c;
        }
        var gameResult = Math.floor(Math.random() * this.winsTotal);
        console.log('Game Result: ', gameResult, ' of ', this.winsTotal);
        switch (true)
        {
            // no result return 3 diffrent values
            case gameResult <= parseInt(this.wins[0] * (this.coef + 1) * c) :
                function rend()
                {
                    var arr = [];
                    while(arr.length < 3){
                        var randomnumber = Math.floor(Math.random()*5);
                        var found=false;
                        arr[arr.length] = randomnumber;
                    }
                    if(arr[0] == arr[1] && arr[1] == arr[2])
                        rend();
                    else
                        return arr;
                }

                this.gameWin = false;
                return rend();
            // small win - return [0,0,0] or [1,1,1]
            case gameResult <= parseInt((this.wins[0] * (this.coef + 1)  + this.wins[1] * this.coef) * c ) :
                var randomnumber = Math.floor(Math.random()*2);
                this.gameWin = true;
                return [randomnumber,randomnumber,randomnumber];
            case gameResult <= parseInt((this.wins[0] * (this.coef + 1) + (this.wins[1] +  this.wins[2]) * this.coef) * c ) :
                this.gameWin = true;
                return [2, 2, 2];
            case gameResult <= parseInt((this.wins[0] * (this.coef + 1) + (this.wins[1] +  this.wins[2] + this.wins[3]) * this.coef) *c) :
                this.gameWin = true;
                return [3, 3, 3];
            case gameResult <= parseInt((this.wins[0] * (this.coef + 1) + (this.wins[1] +  this.wins[2] + this.wins[3] + this.wins[4]) * this.coef) * c) :
                this.gameWin = true;
                return [4, 4, 4];
            default :
                console.log('Game calculation Error');
        }
    }
}