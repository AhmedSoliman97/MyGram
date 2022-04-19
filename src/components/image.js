import React,{useState} from 'react';

import './image.css'


const Image=(props)=>{
    const [showSideOptions,setShowSideOptions]=useState(false);
    const showOptionsHnadelr=()=>{
        setShowSideOptions(true);
    }
    const OptionsListClasses=['OptionsModel',showSideOptions?'OptionsOpen':'OptionsClose'];

    let currentView=(<img src={props.image} alt="not ubloaded" className='Image' onClick={props.clicked} />);
    if(props.index === 1){
        currentView= (
            <video className='Video' controls >
                <source src={props.video}/>
            </video>
        )
    }
    return(
    <div className='all'>
        {showSideOptions?
        <div>
            <div  className={OptionsListClasses.join(' ')} onClick={()=>setShowSideOptions(false)}>
                <div className='OptionsList'>
                    <button  onClick={props.removed}> Delete</button>
                    {props.index == 2?
                        <button  onClick={props.removeFavorite}> Remove Favorite</button>:
                        <button  onClick={props.makeFavorite}> Make Favorite</button>
                        
                    }
                </div> 
            </div>
            <div className='OptionBackDrop' onClick={()=>setShowSideOptions(false)} ></div>
        </div>:null}
        <div className='ShowOptions' onClick={showOptionsHnadelr}></div>
        {currentView}
    </div>
    )
}

export default Image;
