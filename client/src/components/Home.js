import '../App.css';
import './Home.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import Header from './Header';
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

      

      const slideShow = [crocsOne,
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
        ]

      const sneakerStyle = {
          height: '30vh',
          width: '80%',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          margin: '0 auto',
          borderRadius: '20px',
          marginBottom: '4vh',
      }  

  const iconStyle = {
    fontSize: '360px', // Set the desired font size for the icon
    color: '#FF0000', // Set the desired color for the icon
    height: '20vh', // Set the height (adjust as needed)
    width: '25%',
    display: 'inline-flex', // Ensure icons align properly
    alignItems: 'center', // Align content vertically
    justifyContent: 'center',
    objectFit: 'cover',
    marginLeft: '6vw'
  };


  const [currentNumber, setCurrentNumber] = useState(0);



  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNumber((prevNumber) =>
        prevNumber === slideShow.length - 1 ? 0 : prevNumber + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [slideShow.length]);



  return (
    <React.Fragment>
      <Header />
{/* <header className="mainHeader">

<div className='mainLogo' alt="designHerLogo" src="../public/Designher.jpg" > </div>
<form className='headerRightSide'>
    <input type='search' className='searchBar'></input>
    <div className='navigationBar'>
      <ul className='navUlTag'>
       <Link to="/jackets"><li className='firstNavItem'>Jackets</li></Link>
       <Link to="/crocs"><li className='navItem'>Crocs</li></Link>
      </ul>
    </div>

    <div className='navigationBarTwo'>
       <ul className='navUlTag'> 
        <Link to='/sneakers'><li className='firstNavItem'>Sneakers</li></Link>
        <Link to='/boots'><li className='navItem'>Boots</li></Link>
      </ul>
    </div>
</form>
</header> */}

{/* <video className="homeVideo" width="100%" height="50%" loop="true" autoPlay muted>
  <source src="/output_video.mp4" type="video/mp4"/>
  Your browser does not support the video tag.projects/designherCustomKreations/designhercustomkreations/public/VID_158480824_122841_103.mp4
</video> */}

<div className="homeVideo">
</div> 

<section className='slideShowSection'>
  <h1 className='slideShowText'>As seen on </h1>

  <a className='customIcon' href="https://m.facebook.com/DesignHerInc" target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <FontAwesomeIcon icon={faFacebookSquare} style={{ fontSize: '100px' }} />
      </a>

      <a className='customIcon' href="https://www.instagram.com/designher_incllc?utm_source=qr&igshid=YjE5NDMyY2FhOQ%3D%3D&img_index=1" target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '100px' }} />
      </a>

      <a className='customIcon' href="https://www.tiktok.com/@designher_inc" target="_blank" rel="noopener noreferrer" style={iconStyle}>
      <FontAwesomeIcon icon={faTiktok} style={{ fontSize: '100px' }} />
      </a>

<img className='theSlideShow' src={slideShow[currentNumber]} alt="pic of crcocs"></img>
</section>

<section className='categoriesSection'>
<h1 className='categoriesHeaderOne'>Crocs</h1>

<Link to='/crocs'><div className='imageCard'></div></Link>
<h1 className='categoriesHeaderTwo'>Jackets</h1>

<Link to='/jackets'><div className='imageCardTwo'></div></Link>
<h1 className='categoriesHeaderThree'>Sneakers</h1>

<Link to='/sneakers'><div s className='imageCardThree'></div></Link>
<h1 className='categoriesHeaderFour'>Boots</h1>

<Link to='/boots'><div className='imageCardFour'></div></Link>



</section>



<section className='videosSection'>
<h1 className='videosHeader'>Videos</h1>


{/* <video className="homeVideo" width="95%" height="50%" loop="true" autoPlay muted>
  <source src="/newVideoThree.mp4" type="video/mp4"/>
  Your browser does not support the video tag
</video> */}

<video className="homeVideoTwo" width="95%" height="50%" loop="true" controls>
  <source src="/newVideoTwo.mp4" type="video/mp4"/>
  Your browser does not support the video tag
</video>

<video className="homeVideoThree" width="95%" height="50%" loop="true" controls>
  <source src="/newVideoOne.mp4" type="video/mp4"/>
  Your browser does not support the video tag
</video>

</section>

<section className='aboutSection'>
<h1 className='aboutHeader'>About</h1>
<p className='aboutParagraph'>
DesignHerInc Custom Kreations, born from the visionary mind of Dianna Beaty in 2022, embodies the fusion of creativity and fabric. 
<br />
<br />


What began as a fervent dream has blossomed into an artistic venture, redefining fashion and individual expression.

<br />
<br />


Dianna, an artistic virtuoso, wielded her innate flair for clothing decoration, embellishing fabrics with rhinestones and intricate designs that left onlookers spellbound. 
<br />
<br />


Specializing in bespoke designs for Women, children, and Men, DesignHerInc has ignited a sartorial revolution. 
<br />
<br />


The allure of personalized apparel has captured the city's heart, ushering in an era of distinctive style. With each stitch, DesignHerInc crafts narratives woven into fabric, resonating with individuals seeking unique sartorial statements.

<br />
<br />


As our brand takes flight, painting the city in vibrant hues, DesignHerInc remains rooted in its digital abode, catering to customers nationwide. 
<br />
<br />


While our storefronts are in the making, our website stands as a beacon, offering nationwide delivery.

With a 14-day turnaround for custom orders, we invite you to join the DesignHerInc narrative, where fashion meets artistry, and every garment tells a tale. Embrace the personalized elegance that is uniquely yours, as DesignHerInc marches toward becoming a household name."

This excerpt aims to capture the essence of DesignHerInc, portraying its evolution from a dream to a burgeoning fashion entity, inviting customers to become part of its narrative while emphasizing the uniqueness and artistry embedded within each creation. Adjustments can be made to suit specific preferences or requirements.
</p>
</section>



    
        </React.Fragment>
  );
}

export default Home;
