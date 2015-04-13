/**
 * Created by dima on 4/12/15.
 */
function Money(obj)
{
    this.money = obj.config;
    this.messages = obj.messages;
    this.wins = obj.wins;
    this.Bet = 0;
    this.coef =  [2,2,3,7,16];

    this.init = function()
    {
        this.messages.moneyMessage('moneyMinBet', this.moneyFormatter(this.money.MinBet));
        this.messages.moneyMessage('moneyMaxBet', this.moneyFormatter(this.money.MaxBet));
        this.messages.moneyMessage('moneyTotal', this.moneyFormatter(this.money.Total));
        this.messages.moneyMessage('moneyBet', this.moneyFormatter(this.Bet));
        this.messages.moneyMessage('moneyWin', this.moneyFormatter(0));
        this.coefPrise();
    }

    this.actionReset = function ()
    {
        this.money.Total = this.money.Total + this.Bet;
        this.messages.updateMoneyMessage('moneyTotal', this.moneyFormatter(this.money.Total));
        this.Bet = 0;
        this.messages.updateMoneyMessage('moneyBet', this.moneyFormatter(this.Bet));
    }

    this.actionAddBet = function()
    {
        if(this.Bet + this.money.MinBet <= this.money.MaxBet && this.Bet + this.money.MinBet <= this.money.Total + this.Bet)
        {
            this.Bet += this.money.MinBet;
            this.messages.updateMoneyMessage('moneyBet', this.moneyFormatter(this.Bet));
            this.money.Total -= this.money.MinBet;
            this.messages.updateMoneyMessage('moneyTotal', this.moneyFormatter(this.money.Total));
        }
    }

    this.actionMaxBet = function()
    {
        if(this.money.Total + this.Bet - this.money.MaxBet > 0)
        {
            this.money.Total = this.money.Total + this.Bet - this.money.MaxBet;
            this.Bet = this.money.MaxBet;

        }
        else
        {
            this.Bet = this.money.Total;
            this.money.Total = 0;
        }
        this.messages.updateMoneyMessage('moneyTotal', this.moneyFormatter(this.money.Total));
        this.messages.updateMoneyMessage('moneyBet', this.moneyFormatter(this.Bet));
    }

    this.actionLoose = function()
    {
        this.messages.userMessage('loose', 'blue');

        if(this.money.Total - this.Bet >= 0)
        {
            this.money.Total -= this.Bet;
            this.messages.updateMoneyMessage('moneyTotal', this.moneyFormatter(this.money.Total));
        }
        else
        {
            if(this.money.Total)
            {
                this.Bet = this.money.Total;
                this.actionLoose();
            }
            else
                this.Bet = 0 ;

        }
        this.messages.updateMoneyMessage('moneyBet', this.moneyFormatter(this.Bet));
        this.messages.updateMoneyMessage('moneyWin', this.moneyFormatter(0));
    }

    this.actionWin = function(index)
    {
        this.messages.userMessage('win', 'red', 'blink');
        var priseWin = this.Bet * this.coef[index]
        this.money.Total += priseWin;
        this.messages.updateMoneyMessage('moneyTotal', this.moneyFormatter(this.money.Total));
        this.messages.updateMoneyMessage('moneyWin', this.moneyFormatter(priseWin));
    }

    /*
     * count coefficients for a prices
     *
     */
    this.coefPrise = function()
    {

        for(var i = 0; i < this.wins.length; i++)
        {
            var k = i == 0 ? 1 : i;
            var y = bshiftY + bstepY * i;
            this.messages.boardMessage(y, this.coef[i]);
        }
    }

    /*
     *   function shows money as decimal (with cents)
     *
     *   summ - int
     *   @return decimal
     */
    this.moneyFormatter = function(summ)
    {
        return (summ/100).toFixed(2)
    }
}

