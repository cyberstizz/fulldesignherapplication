import React from "react";
import './SubMenuComponent.scss';


const SubMenuComponent = (props) => {
    return (
        <React.Fragment>
            <main className="fullSubMenuComponent">
                <img onLoad={props.onImageLoad} src={props.path} width='122'height='105' style={{marginTop: '3vh', marginLeft: '6vw'}} alt='pants'></img>
                <section className="submenuTitle">{props.name}</section>
            </main>
        </React.Fragment>
    )
}

export default SubMenuComponent;