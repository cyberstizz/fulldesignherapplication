# DesignHer Custom Kreations
This is a web application that sells jackets sneakers, boots and crocs.
With several designs and custom orders, DesignHer is a New York made brand
that captures the excellence of the city in great detail and spirit. Orders
are typically fulfilled in 2 weeks depending on your location.

<p align="center">
  <br>
  <img src="./client/src/designherscreenshot.png" alt="wb" width="400">
  <br>
</p>
<p align="center" >
  <a href="#features">Features</a> •
  <a href="#Files">Files</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#packages">Packages</a>   
</p>
<p align="center" >
<a href="http://www.designhercustomkreation.com/">Try it out here</a> 
</p>

## Features

* How to run locally
```bash
# Install dependencies
$ npm i
# run the app
$ npm run build
```

## Files

- src: contains all of the main files and coponentes
- components: reusable pieces of code that define the appearance and behavior of a part of the UI.


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en) and [Postgresql](https://www.postgresql.org/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone git@github.com:cyberstizz/fulldesignherapplication.git

# Install dependencies
$ npm i

# Run the app
$ npm run build
```

## Packages

This software uses the following open source packages:

- [React](https://reactjs.org/)
- [ReactRouter](https://reactrouter.com/en/main)
- [Redux](https://redux.js.org/)
- [Express](https://expressjs.com/)
- [Stripe](https://stripe.com/)
- [PassportJs](https://www.passportjs.org/)
- [Postgresql](https://www.postgresql.org/)
















### how to use it
Gutties can only be used as a demo now but it still works similar to how it
did before. it is an online store similar to the likes of Amazon, when you 
first enter the website the first thing that you see are a list of producst
from which you can browse or search for other products within the marketplace.
to view an item individually just click on it. and to save to your cart or make 
a purchase, just go to the items page and click on the appropriate action.


### Biggest challenges
my biggest challenge with gutties outlet was learning about why state manaagement
is important. sure it is common knowledge to the seasoned developer, however when
you come from a front end background and start with smaller projects you can tend
to misunderstand why state management is so important.

in this case I tried to manage a cart before understanding Redux on a deeper level,
and this project taught me why you need a state management library to keep state 
consistent across components, and especially if you have a cart.

further, this project introduced me to e commerce within a web application as I had
no idea how it worked. For this application I used the Stripe api for purchases on
a users account, and all purchases went to the business account of Gutties Outlet.



### Code Review
the code uses Node js as the backend and React as the frontend to display the ui.

as mentioned earlier Redux is used as the state management tool and stripe is used
as the merchant.

### final thought
gutties outlet was a very educational project and I will never forget the
valuable lessons I learned while building it.


### for more projects by CyberStizz visit: [Charleslambjr.com](https://www.charleslambjr.com/)