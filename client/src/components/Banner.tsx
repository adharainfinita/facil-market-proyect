
import * as React from 'react';
import image1 from '../assets/Playstation-Transparent-PNG.png';
import image2 from '../assets/casa.png';
import image3 from '../assets/White-Kids-Superstar-Adidas-Shoes-PNG.png';
import image4 from '../assets/celular.png';

const Banner = () => {
  return (
    <div className="container-banner">
      <h1 className='slogan-banner'>COMPRAR NUNCA FUE TAN FÁCIL</h1>
      <img src={image1} alt={image1} className="image1-banner" />
      <img src={image2} alt={image2} className="image2-banner" />
      <img src={image3} alt={image3} className="image3-banner" />
      <img src={image4} alt={image4} className="image4-banner" />
    </div>
  );
};

export default Banner;
