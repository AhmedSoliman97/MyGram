import React,{Component} from 'react';

import './stories.css'

class Stories extends Component{
    state={
        categories:['PHOTOS','VIDEOES','FAVORITE'],
        classes:{'0':true,'1':false,'2':false}
    };

    categoryChangeHandelr=(index)=>{
        let newClasses={...this.state.classes};
        for(let i in newClasses){
            if(i == index)
            {newClasses[i]=true;}
            else{
                newClasses[i]=false;  
            }
        }
        this.props.clicked(index);//pass th index to the gallery to switch Mode
        this.setState({classes:newClasses})
    }
    
    render(){
        
        const category =this.state.categories.map((cat,index)=>{
            let categoryClass=['Category',this.state.classes[index]?'CategoryActive':'Category'];
            return(
                <div key={index}>
                    <div  className={categoryClass.join(' ')} onClick={()=>this.categoryChangeHandelr(index)}>
                    {cat}
                    </div>
                </div>
                
            )
        })
        return(
            <div>
                <div>
                </div>
                <div className='Line'> </div>
                <div className='Categories' >
                   {category} 
                </div>
            </div>
        )
    }
}

export default Stories;
