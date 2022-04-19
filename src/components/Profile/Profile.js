import React, { useState } from "react";
import { connect } from "react-redux";

import './Profile.css'

const Profile=(props)=>{
    
    
    return(
        <div className="Profile">
           <div className="ImageDiv">
               <img src={props.profileSrc} alt='profile'  className="ProfileImage"/>
            </div>
            
            <div className="PersonaDetails">
                
                <div className="Buttons">
                    <div className="Name"> {props.data.userPersonalData.Name}</div>
                    <label htmlFor="files" style={{display:props.isAuth?'block':'none'}} className="Button1" >Upload Item</label><br/>
                    <input  id="files" style={{visibility:"hidden",width:'1%'}} type="file"  accept=".jpg,.mp4" onChange={props.changed} />
                </div>
                <div className="AccountDetails">
                    <div><b>{props.imageNum}</b> photo</div>
                    <div><b>{props.videoNum}</b>video</div>
                    <div><b>{props.favoriteNum}</b>favorite</div>
                </div>
                <div className="Demo">
                    <div><b>UserPage</b></div>
                    <div style={{color:'grey'}}>{props.data.userPersonalData.Title}</div>
                    <div>{props.data.userPersonalData.Bio}</div>
                    <a href="https://github.com/AhmedSoliman97" >{props.data.userPersonalData.WebSiteink}</a>
                </div>
            </div>
            
            
        </div> 
    )
}

const mapStateToProps=state=>{
    return{
        data: state.Data.data,
        isAuth:state.Auth.token !== null
    }
}

export default connect(mapStateToProps)(Profile);
