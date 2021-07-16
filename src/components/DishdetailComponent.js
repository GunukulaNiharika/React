import React, { Component }from 'react';
import {Card,CardImg,CardBody,CardText, CardTitle, Breadcrumb, BreadcrumbItem,Button,
     Label, Row, Col,Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'; 


function RenderDish({dish}){
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
function RenderComments({comments}){
        const comment=comments.map((comment)=>{
            return(
                <div key={comment.id}>
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
                {comment}
            </div>
        );  
}
const Dishdetail=(props)=>{
    if(props.dish!=null){
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem ><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active><Link  >{props.dish.name}</Link></BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12"> 
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            
            <div className="row">
                <div className=" col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comment}/>
                    <CommentForm/>
                </div>
            </div>
        </div>
    );
    }
    else{
    return(<div></div>);
    
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isCommentModalOpen: false
        }
        this.toggleCommentModal=this.toggleCommentModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    toggleCommentModal(){
        this.setState({isCommentModalOpen: !this.state.isCommentModalOpen});
    }
    handleSubmit(values){
        this.toggleCommentModal();
        console.log("Current State is: "+ JSON.stringify(values));
        alert("Current State is: "+ JSON.stringify(values));
    }
    render(){
        return(
            <div className="row">
                <button onClick={this.toggleCommentModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment
                </button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>{this.handleSubmit(values)}}>
                            <Row className="form-group mt-2">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" name="rating" 
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                    rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
    

export default Dishdetail;