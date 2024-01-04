-- Create the designher database
CREATE DATABASE designher;

-- Switch to the designher database
\c designher;

-- Enable the uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email_address VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- Create the crocs table with product_id as UUID
CREATE TABLE crocs (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the jackets table with product_id as UUID
CREATE TABLE jackets (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the sneakers table with product_id as UUID
CREATE TABLE sneakers (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the boots table with product_id as UUID
CREATE TABLE boots (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_path VARCHAR(255),
    description TEXT,
    product_type VARCHAR(100),
    product_price DECIMAL(10, 2)
);

-- Create the orders table
CREATE TABLE orders (
    order_number UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id INTEGER REFERENCES users(user_id),
    order_date DATE DEFAULT CURRENT_DATE
);

-- Create the order_items table
CREATE TABLE order_items (
    order_id UUID REFERENCES orders(order_number),
    product_id UUID REFERENCES (
        SELECT product_id FROM crocs 
        UNION SELECT product_id FROM jackets 
        UNION SELECT product_id FROM sneakers 
        UNION SELECT product_id FROM boots
    )
);
----------------------------------------------------

-- For Crocs products
INSERT INTO crocs (name, image_path, description, product_type, product_price)
VALUES
  ('lol', 'https://designherbucket.s3.amazonaws.com/lol.jpeg', 'Pink and blue crocs with a bow and a fairy', 'crocs', 160.00),
  ('silver_pearl', 'https://designherbucket.s3.amazonaws.com/silverPearl.jpg', 'Encrusted in shimmering pieces, the silver pearl is a dedicated design to the social workers of the world...', 'crocs', 170.00),
  ('celebrity', 'https://designherbucket.s3.amazonaws.com/celebrity.jpg', 'In celebration of creativity and elegance that we all have inside of us, DesignHer presents the Celebrity', 'crocs', 150.00),
  ('free_spirit', 'https://designherbucket.s3.amazonaws.com/freeSpirit.jpg', 'Orchestrated chaos. But the type of chaos to bring the spirit and essence of life. We bring you the free spirit', 'crocs', 200.00),
  ('zebra_stripe', 'https://designherbucket.s3.amazonaws.com/zebraStripe.jpg', 'You now how to light up a room? All black everything. Come steal the show with the black and white zebra stripe.', 'crocs', 150.00),
  ('foxy_black', 'https://designherbucket.s3.amazonaws.com/foxyBlack.jpg', 'With the shimmering black stones of grace and haste, we introduce the foxy black which is a sister model of the zebra stripe except in this case, you can also have a letter in the right foot', 'crocs', 150.00),
  ('pink_dancer', 'https://designherbucket.s3.amazonaws.com/pickDancer.jpg', 'Born for YouTube with the swag of Prada, this girls croc will take your princess to the throne room', 'crocs', 125.00),
  ('black_swan', 'https://designherbucket.s3.amazonaws.com/blackSwan.jpg', 'From the all black everything line comes in the black swan, with its very own unique essence and tone… with glimmering ankles, you can shine up everyone’s night and match that tone with your etiquette', 'crocs', 160.00),
  ('royalty', 'https://designherbucket.s3.amazonaws.com/royalty.jpg', 'The smooth meets the glamorous in a thunderous handshake, then everything subsides and the only thing that remains is the blue and silver glimmer of the royalty', 'crocs', 170.00),
  ('belinda', 'https://designherbucket.s3.amazonaws.com/belinda.jpg', 'With the customizable letter in the front, and dancing champagne stones dancing around the sides dripping with mustard, we present the Belinda', 'crocs', 170.00),
  ('nicholas', 'https://designherbucket.s3.amazonaws.com/Nicholas.jpg', 'Boys croc for the Nintendo fan that plays Sonic even more, we give you the Nicholas which is customizable with your own name of course (btw these might or might not be based on a real boy)', 'crocs', 160.00),
  ('coco_blue', 'https://designherbucket.s3.amazonaws.com/cocoBlue.jpg', 'Dressed up in blue and white stones and crafted to represent passion Design Her presents Coco Blue', 'crocs', 180.00),
  ('ballerina', 'https://designherbucket.s3.amazonaws.com/ballerina.jpg', 'This violet gem is an artistic daydream styled with rainbows, butterflies, and everything otherwise! The ballerina will twist your world around and around forever', 'crocs', 100.00),
  ('biker', 'https://designherbucket.s3.amazonaws.com/biker.jpg', 'From the concrete to the mall, the biker takes you wherever your mind can ride', 'crocs', 100.00),
  ('candytopia', 'https://designherbucket.s3.amazonaws.com/candytopia.jpg', 'Swirling with candy alluring styles and a little bit of Minnie. The candytopia is a thing of pure imagination', 'crocs', 100.00),
  ('call_me_king', 'https://designherbucket.s3.amazonaws.com/callMeKing.jpg', 'Versace, Versace, Versace, Versace, Versace, Versace!!!!', 'crocs', 150.00),
  ('pink_unicorn', 'https://designherbucket.s3.amazonaws.com/pinkUnicorn.jpg', 'With the rainbow lashes closed in grace…. The pink unicorn is for the girl that is one of a kind and is not afraid to stand out and look good doing it', 'crocs', 100.00),
  ('the_showstopper', 'https://designherbucket.s3.amazonaws.com/theShowstopper.jpg', 'Welcome to elegance in layers, glittered with the beautiful glows of gold and silver, and shining to perfection, the only appropriate name for this masterpiece was the showstopper', 'crocs', 200.00),
  ('gold_digger', 'https://designherbucket.s3.amazonaws.com/goldDigger.jpg', 'Dressed in glittering gold and wrapped with a brownish-orange bow, you can’t resist but put up the bill', 'crocs', 100.00),
  ('purple_fizzle', 'https://designherbucket.s3.amazonaws.com/purpleFizzle.jpg', 'This purple little girls croc has it all, from rainbows to unicorns and gems. It is dressed in blue, purple, and silver stones to add the dreamy touch', 'crocs', 100.00),
  ('bb', 'https://designherbucket.s3.amazonaws.com/bb.jpg', 'This one just hits different. With the customizable letter stitching in the front and the Burberry coating, this orange croc is not only unique but it is verified', 'crocs', 100.00),
  ('cute_cupcake', 'https://designherbucket.s3.amazonaws.com/cuteCupcake.jpg', 'No description details', 'crocs', 100.00),
  ('locket', 'https://designherbucket.s3.amazonaws.com/locket.jpg', 'No description details', 'crocs', 120.00),
  ('pink_bubblegum', 'https://designherbucket.s3.amazonaws.com/pinkBubblegum.jpg', 'No description details', 'crocs', 100.00),
  ('princesses', 'https://designherbucket.s3.amazonaws.com/princesses.jpg', 'No description details', 'crocs', 100.00),
  ('power', 'https://designherbucket.s3.amazonaws.com/power.jpg', 'No description details', 'crocs', 150.00),
  ('royal_elegance', 'https://designherbucket.s3.amazonaws.com/royalElegance.jpg', 'No description details', 'crocs', 160.00),
  ('silver_streak', 'https://designherbucket.s3.amazonaws.com/silverStreak.jpg', 'No description details', 'crocs', 160.00),
  ('tambourine', 'https://designherbucket.s3.amazonaws.com/tambourine.jpg', 'No description details', 'crocs', 100.00);


-- For Boots
INSERT INTO boots (name, image_path, description, product_type, product_price)
VALUES
  ('diamond_girl', 'https://designherbucket.s3.amazonaws.com/diamondGirl.jpg', 'No description details', 'boots', 200.00),
  ;

-- For Jackets
INSERT INTO jackets (name, image_path, description, product_type, product_price)
VALUES
  ('the_diva', 'https://designherbucket.s3.amazonaws.com/theDiva.jpeg', 'No description details', 'jackets', 200.00),
  ;

-- For Sneakers
INSERT INTO sneakers (name, image_path, description, product_type, product_price)
VALUES
  ('unicorn_sneaker', 'https://designherbucket.s3.amazonaws.com/unicornSneaker.jpg', 'No description details', 'sneakers', 100.00),  ;
