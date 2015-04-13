# Overview
it's just a slot mashine game base on phiser.io engine

#Install
Clone it to your localhost and run index.html

#Change configuration
Here is two configuration files
config.js  - configuration money, bets and likelihood
language.js - all messages are in this file, it's good for translation

#Architecture
At this game we have four main parts
1. Message - all text messages js/messages.js
2. Money - because it's money games /js/money.js
3. Controls - buttons /js/buttons.js
4. Slots - slots actions /js/slots.js

I made this four objects and separate it in files. It gives me much clear structure of a game