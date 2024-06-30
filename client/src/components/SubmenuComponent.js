import React from "react";
import './SubMenuComponent.scss';

const SubMenuComponent = (props) => {
  return (
    <React.Fragment>
      <main className="fullSubMenuComponent">
        {/* Product image */}
        <img
          className="productImage"
          onLoad={props.onImageLoad}
          src={props.path}
          style={{ marginLeft: '-2%', border: 'solid 1px silver', borderLeft: '0' }}
          alt='product'
        />
        <div className="productRightSection" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Product name */}
          <section className="submenuTitle">{props.name}</section>
          {/* Product price */}
          <section className="productPrice">${props.product_price}</section>
        </div>
        {/* Cart icon */}
        <img
          src="/cart-icon-28356.png"
          width='15%'
          height='12%'
          style={{ marginTop: '30%', marginRight: '4%', objectFit: 'contain', overflow: 'hidden' }}
          alt='cart icon'
        />
      </main>
    </React.Fragment>
  );
}

export default SubMenuComponent;
