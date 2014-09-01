#JobCoin Sending Interface

######Jobcoins have “addresses” that are just arbitrary strings, and there’s no mining or transaction signing - anyone can create jobcoins out of thin air, or send them between addresses.

-------

You can access the Jobcoin management interface and APIs at 

    http://jobcoin.projecticeland.net/upspurt

Your challenge will be to make a website that allows users to send jobcoins and check their balance.  It will have two screens:

1. A welcome screen where you type your Jobcoin address.
2. After entering an address, another screen with three functions:
   A. Sign out (i.e. go back to the welcome screen).
   B. A rather contrived English-based interface to send jobcoins to another address.
   C. A Chart with a single line showing the address’s balance over time.

There are some very rough mockups of the two screens available at 

    http://imgur.com/a/kQh3b
    
You certainly don’t have to be pixel-perfect to those mockups - feel free to change the colors if you like, or make small changes, but please make sure the right elements are in the right places relative to each other.

For the Jobcoin sending interface, please allow the user to **Click on two places inside the sentence, on the number of Jobcoins or on the destination address, to turn either of those fields into a textbox.**  When the **user clicks away or presses Send, it should turn back into a sentence**.  To “hint” the user that the two fields are clickable, please **show a border around the number or around the destination address when the mouse is within 30px of the respective clickable area.**

You’re welcome to implement the line chart of account balance over time however you’d like - its look and feel is up to you.  **Make sure it updates when a new transaction is made.**

Please use any framework, libraries, or tools that you think are appropriate to solve the problem.  And don’t hesitate to ask any questions.

Good luck!