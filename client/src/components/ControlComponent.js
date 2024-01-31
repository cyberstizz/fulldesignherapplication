import React from "react";
import './ControlComponent.scss';


const ControlComponent = (props) => {
    return (
        <React.Fragment>
            <main className="fullSubMenuComponent">
                <img onLoad={props.onImageLoad} src={props.path} width='75%'height='100%' style={{marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 1px silver', borderLeft: '0'}} alt='pants'></img>
                <div className="productRightSection" syle={{display: 'flex', flexDirection: 'column'}}>
                <section className="submenuTitle">{props.name}</section>
                <section className="productPrice">${props.product_price}</section>
                <button className="editButton">edit</button>
                <button className="deleteButton" >delete</button>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ControlComponent;