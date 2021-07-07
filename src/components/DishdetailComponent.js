import React, {Component} from 'react';
import {Card,CardImg,CardBody,CardText, CardTitle} from 'reactstrap';

class Dishdetail extends Component{
    
    constructor(props){
        super(props);
    }
    renderDish(dish){
        if(dish!=null){
            return(
                
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(<div></div>);
            
        }
    }
    renderComments(dish){
        
        if(dish!=null){
            
            const comments=dish.comments.map((comment)=>{
                return(
                    <div>
                        <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <br></br>
                            <li>{'\n'}--{comment.author}, {new Intl.DateTimeFormat('en-US',{
                                year:'numeric',
                                month:'short',
                                day: "2-digit"
                            }).format(new Date(comment.date))}</li>
                        </ul>
                    </div>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        }
        else{
            return(<div></div>);
            
        }
    }
    render(){
        const dish=this.props.selected_dish;
        return(
            <div className="row">
                <div className=" col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(dish)}
                </div>
            </div>
        );
    }
}
export default Dishdetail;