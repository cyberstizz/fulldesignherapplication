import React from "react";
import './SubMenuComponent.scss';


const SubMenuComponent = (props) => {
    return (
        <React.Fragment>
            <main className="fullSubMenuComponent">
                <img onLoad={props.onImageLoad} src={props.path} width='45%'height='100%' style={{marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 2px black', borderLeft: '0'}} alt='pants'></img>
                <div className="productRightSection" syle={{display: 'flex', flexDirection: 'column'}}>
                <section className="submenuTitle">{props.name}</section>
                <section className="productPrice">${props.product_price}</section>
                </div>
                <img src="../cart-icon-28356.png" width='15%'height='30%' style={{marginLeft: '2%', border: 'solid 2px black'}} alt='pants'></img>
            </main>
        </React.Fragment>
    )
}

export default SubMenuComponent;