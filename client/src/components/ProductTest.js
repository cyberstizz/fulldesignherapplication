import React from 'react';
import './ProductTest.scss';
import Header from './Header';
import SubMenuComponent from './SubmenuComponent';





const  ProductTest = () => {
  return (
<React.Fragment>
<Header />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />


</React.Fragment>);
}

export default ProductTest;
