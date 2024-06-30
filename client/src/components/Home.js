// Import necessary styles and components
import '../App.css';
import './Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import Header from './Header';

// Import images for the slideshow
import crocsOne from '../crocsOne.webp';
import crocsTwo from '../crocsTwo.webp';
import crocsFour from '../crocsFour.webp';
import crocsFive from '../crocsFive.webp';
import crocsSix from '../crocsSix.webp';
import crocsSeven from '../crocsSeven.webp';
import crocsEight from '../crocsEight.webp';
import crocsNine from '../crocsNine.webp';
import crocsTen from '../crocsTen.webp';
import crocsTwelve from '../crocsTwelve.webp';
import crocsThirteen from '../crocsThirteen.heic';
import crocsFourteen from '../crocsFourteen.heic';
import crocsFifteen from '../crocsFifteen.heic';
import crocsSixteen from '../crocsSixteen.heic';
import crocsSeventeen from '../crocsSeventeen.heic';

function Home() {
  // Array of images for the slideshow
  const slideShow = [
    crocsOne,
    crocsTwo,
    crocsFour,
    crocsFive,
    crocsSix,
    crocsSeven,
    crocsEight,
    crocsNine,
    crocsTen,
    crocsTwelve,
    crocsThirteen,
    crocsFourteen,
    crocsFifteen,
    crocsSixteen,
    crocsSeventeen,
  ];

  // Style for the sneaker images
  const sneakerStyle = {
    height: '30vh',
    width: '80%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    margin: '0 auto',
    borderRadius: '20px',
    marginBottom: '4vh',
  };

  // Style for social media icons
  const iconStyle = {
    fontSize: '360px',
    color: '#FF0000',
    height: '20vh',
    width: '25%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
    marginLeft: '6vw',
  };

  // State to keep track of the current slideshow image
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    // Interval to cycle through slideshow images every 2 seconds
    const intervalId = setInterval(() => {
      setCurrentNumber((prevNumber) =>
        prevNumber === slideShow.length - 1 ? 0 : prevNumber + 1
      );
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [slideShow.length]);

  return (
    <React.Fragment>
      <Header />

      {/* Section for the social media icons and slideshow */}
      <section className='slideShowSection'>
        <h1 className='slideShowText'>As seen on </h1>

        {/* Social media links */}
        <a
          className='customIcon'
          href="https://m.facebook.com/DesignHerInc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          style={iconStyle}
        >
          <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: '100px' }} />
        </a>

        <a
          className='customIcon'
          href="https://www.instagram.com/designher_incllc?utm_source=qr&igshid=YjE5NDMyY2FhOQ%3D%3D&img_index=1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={iconStyle}
        >
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '100px' }} />
        </a>

        <a
          className='customIcon'
          href="https://www.tiktok.com/@designher_inc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          style={iconStyle}
        >
          <FontAwesomeIcon icon={faTiktok} style={{ fontSize: '100px' }} />
        </a>

        {/* Slideshow image */}
        <img className='theSlideShow' src={slideShow[currentNumber]} alt="pic of crocs" />
      </section>

      {/* Section for product categories */}
      <section className='categoriesSection'>
        <h1 className='categoriesHeaderOne'>Crocs</h1>
        <Link to='/crocs'><div className='imageCard'></div></Link>

        <h1 className='categoriesHeaderTwo'>Jackets</h1>
        <Link to='/jackets'><div className='imageCardTwo'></div></Link>

        <h1 className='categoriesHeaderThree'>Sneakers</h1>
        <Link to='/sneakers'><div className='imageCardThree'></div></Link>

        <h1 className='categoriesHeaderFour'>Boots</h1>
        <Link to='/boots'><div className='imageCardFour'></div></Link>
      </section>

      {/* Section for videos */}
      <section className='videosSection'>
        <h1 className='videosHeader'>Videos</h1>

        <video className="homeVideoTwo" width="95%" height="50%" loop="true" controls>
          <source src="/newVideoTwo.mp4" type="video/mp4" />
          Your browser does not support the video tag
        </video>

        <video className="homeVideoThree" width="95%" height="50%" loop="true" controls>
          <source src="/newVideoOne.mp4" type="video/mp4" />
          Your browser does not support the video tag
        </video>
      </section>

      {/* Section for the about information */}
      <section className='aboutSection'>
        <h1 className='aboutHeader'>About</h1>
        <p className='aboutParagraph'>
          DesignHerInc Custom Kreations, born from the visionary mind of Dianna Beaty in 2022, embodies the fusion of creativity and fabric.
          <br /><br />
          What began as a fervent dream has blossomed into an artistic venture, redefining fashion and individual expression.
          <br /><br />
          Dianna, an artistic virtuoso, wielded her innate flair for clothing decoration, embellishing fabrics with rhinestones and intricate designs that left onlookers spellbound.
          <br /><br />
          Specializing in bespoke designs for Women, children, and Men, DesignHerInc has ignited a sartorial revolution.
          <br /><br />
          The allure of personalized apparel has captured the city's heart, ushering in an era of distinctive style. With each stitch, DesignHerInc crafts narratives woven into fabric, resonating with individuals seeking unique sartorial statements.
          <br /><br />
          As our brand takes flight, painting the city in vibrant hues, DesignHerInc remains rooted in its digital abode, catering to customers nationwide.
          <br /><br />
          While our storefronts are in the making, our website stands as a beacon, offering nationwide delivery. With a 14-day turnaround for custom orders, we invite you to join the DesignHerInc narrative, where fashion meets artistry, and every garment tells a tale. Embrace the personalized elegance that is uniquely yours, as DesignHerInc marches toward becoming a household name.
        </p>
      </section>
    </React.Fragment>
  );
}

export default Home;
