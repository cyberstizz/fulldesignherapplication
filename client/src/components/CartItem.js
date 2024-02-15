import React from 'react';
import './CartItem.scss';





const  CartItem = ({path, name, product_price}) => {
  return (
    <main className="fullCartItemComponent">
    <img src={path} width='75%'height='100%' style={{marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 1px silver', borderLeft: '0'}} alt='pants'></img>
    <div className="cartRightSection" syle={{display: 'flex', flexDirection: 'column'}}>
    <section className="cartTitle">{name}</section>
    <section className="cartPrice">${product_price}</section>
    </div>
    <img src="/cart-icon-28356.png" width='15%'height='30%' style={{marginTop: '30%', marginRight: '4%', objectFit: 'contain', overflow: 'hidden'}} alt='cart icon'></img>
</main>
  );
}

export default CartItem;
