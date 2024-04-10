import React from 'react';
import './Crocs.scss';
import Header from './Header';
import SubMenuComponent from './SubmenuComponent';






const  ProductTest = () => {
  return (
<React.Fragment>
<Header />
<div className='fullCategoryBody'>
<h1 className='categoryHeader'>Crocs</h1>
<div className='submenuBody'>
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />
<SubMenuComponent path='/crocsOne.webp' name='randomCroc' product_price={400.00} />

</div>
</div>
</React.Fragment>);
}

export default ProductTest;
