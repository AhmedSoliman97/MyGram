import React,{Component} from "react";
import { connect } from "react-redux";

import  './gallary.css';
import Spinner from '../components/Spinner/Spinner';
import Toolbar from "../components/toolbar/toolbar";
import Image from '../components/image'
import Backdrop from "../components/backdrop/backdrop";
import Model from "../components/Model/Model";
import axios from '../axios-order';
import Profile from "../components/Profile/Profile";
import Stories from "../components/stories/stories";
import {upload_success, uploading } from "../store/index";


class Gallary extends Component{
    state={
        show:false,
        selectedImage:null,
        Mode:0
    } 
    componentDidMount(){
        axios.get('/users.json').then(response=>{
            for(let key in response.data){
                if(response.data[key].user_Id === localStorage.getItem('localId')){
                    let newobj= response.data[key].data;
                    if(!response.data[key].data.images)
                    newobj={...newobj,images:[]};
                    if(!response.data[key].data.favorites)
                    newobj={...newobj,favorites:[]};
                    if(!response.data[key].data.videos)
                    newobj={...newobj,videos:[]};
                    this.props.onSettingData(newobj);

                }
            } 
        }
        ).catch(err=>{console.log(err)}) 
    }

    itemReadHandelr=(event)=>{
        const item = event.target.files[0];
        event.preventDefault();
        const reader =new FileReader();
        reader.onload=(event)=>{
            if(this.state.Mode === 0){
                const imgArr={...this.props.Data};
                imgArr.images.unshift(event.target.result);
                this.props.onUploading(imgArr); 
            }
            else if( this.state.Mode === 1){
                if(this.props.Data.videos){
                    const vidArr={...this.props.Data};
                    vidArr.videos.unshift(event.target.result);
                    this.props.onUploading(vidArr); 
                }
                else{
                    const vidArr={...this.props.Data,videos:[]};
                    vidArr.videos.unshift(event.target.result);
                    this.props.onUploading(vidArr); 
                }
            }
        };
        reader.onerror=()=>{
            console.log('Error while uploading',reader.error)
        };
        reader.readAsDataURL(item);
    }

    showModelHandelr=(img)=>{
        this.setState({show:true,selectedImage:img})
    } 

    closeModelHandelr=()=>{
        this.setState({show:false,selectedImage:null})
    }

    removeItemHandelr=(src)=>{
        
        const imagesArray= this.props.Data;
        if(this.state.Mode === 0){
            const newImagesArray= imagesArray.images.filter(image=> image!== src);
            imagesArray.images=[...newImagesArray];
        }
        
        else if(this.state.Mode === 2){
            const newImagesArray= imagesArray.favorites.filter(image=> image!== src);
            imagesArray.favorites=[...newImagesArray];
        }
        else if(this.state.Mode === 1){
            const newImagesArray= imagesArray.videos.filter(video=> video!== src);
            imagesArray.videos=[...newImagesArray];
        }
        this.props.onUploading(imagesArray);
    }

    makeFavoritHandelr=(src)=>{
        if(this.props.Data.favorites){
            const imagesArray= {...this.props.Data};
            imagesArray.favorites.unshift(src);
            this.props.onUploading(imagesArray);    
        }
        else{
            const imagesArray= {...this.props.Data,favorites:[]};
            imagesArray.favorites.unshift(src);
            this.props.onUploading(imagesArray);
        }
         
    }
    removeFavoritHandelr=(src)=>{
        
        const imagesArray= {...this.props.Data};
        const updatedFavorites = imagesArray.favorites.filter(fav=> fav!==src);
        imagesArray.favorites = updatedFavorites;
        this.props.onUploading(imagesArray);    
          
    }

    changeModeHandelr=(index)=>{
        this.setState({Mode:index});

    }
    
    render(){
        let spin=null;
        let allImages=null;
        let choosenData=[];
        if(this.state.Mode === 0){
            choosenData=this.props.Data.images;
        }
        else if(this.state.Mode === 2){
            choosenData=this.props.Data.favorites;
        }
        else if(this.state.Mode === 1){
            choosenData=this.props.Data.videos;
        }
        
        allImages = choosenData.map((src,index)=>
            (<Image
                index={this.state.Mode}  
                key={src+index} 
                image={src} 
                clicked={()=>this.showModelHandelr(src)} 
                removed={()=>this.removeItemHandelr(src)}  
                makeFavorite={()=>this.makeFavoritHandelr(src)}
                removeFavorite={()=>{this.removeFavoritHandelr(src)}} 
            />)
        )

        if(this.props.loading){ spin =<Spinner/>}
        return(
            <div className="Gallery">
                    <Toolbar />
                    <Profile 
                    profileSrc={this.props.Data.userPersonalData.ProfilePic}
                    changed={this.itemReadHandelr}
                     
                    imageNum={this.props.Data.images.length} 
                    videoNum={this.props.Data.videos.length} 
                    favoriteNum={this.props.Data.favorites.length}/>

                    <Stories clicked={this.changeModeHandelr}/>
                    {spin}
                    <div className="Images">
                        {this.props.error?<p>{this.props.error}</p>:allImages}
                    </div>
                    <Backdrop show={this.state.show} closed={this.closeModelHandelr}/>
                    <Model 
                        show={this.state.show} 
                        closeModel={this.closeModelHandelr} 
                    ><img src={this.state.selectedImage} alt="its not uploaded"/>
                    </Model>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuth:state.Auth.token !== null,
        Data: state.Data.data,
        loading: state.Data.loading,
        error: state.Auth.error
    }
}

const mapPropsToDispatch=dispatch=>{
    return{
        onUploading:(data)=>dispatch(uploading(data)),
        onSettingData:(data)=>dispatch(upload_success(data))
    }
}



export default connect(mapStateToProps,mapPropsToDispatch)(Gallary);

