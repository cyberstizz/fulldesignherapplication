import React from "react";
import './SubMenuComponent.scss';


const SubMenuComponent = (props) => {
    return (
        <React.Fragment>
            <main className="fullSubMenuComponent">
                <img className="productImage" onLoad={props.onImageLoad} src={props.path} style={{marginLeft: '-2%', border: 'solid 1px silver', borderLeft: '0'}} alt='pants'></img>
                <div className="productRightSection" syle={{display: 'flex', flexDirection: 'column'}}>
                <section className="submenuTitle">{props.name}</section>
                <section className="productPrice">${props.product_price}</section>
                </div>
                <img src="/cart-icon-28356.png" width='15%'height='12%' style={{marginTop: '30%', marginRight: '4%', objectFit: 'contain', overflow: 'hidden'}} alt='cart icon'></img>
            </main>
        </React.Fragment>
    )
}

export default SubMenuComponent;