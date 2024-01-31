import React from "react";
import './ControlComponent.scss';


const ControlComponent = (props) => {
    return (
        <React.Fragment>
            <main className="fullSubMenuComponent">
                <img onLoad={props.onImageLoad} src={props.path} width='75%'height='100%' style={{marginLeft: '-2%', borderTopRightRadius: '50px', borderBottomRightRadius: '50px', border: 'solid 1px silver', borderLeft: '0'}} alt='pants'></img>
                <div className="productRightSection" style={{display: 'flex', flexDirection: 'column'}}>
                    <section className="submenuTitle">{props.name}</section>
                    {/* <section className="productPrice">${props.product_price}</section> */}
                    <div className="controlbuttonsdiv" style={{display: 'flex', flexDirection: 'row'}} >
                        <button className="editButton">Edit</button>
                        <button className="deleteButton" >delete</button>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default ControlComponent;