import React, { Component }from 'react';
import {Card,CardImg,CardBody,CardText, CardTitle, Breadcrumb, BreadcrumbItem,Button,
     Label, Row, Col,Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'; 
import { FadeTransform, Fade, Stagger }from 'react-animation-components';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/BaseUrl';



function RenderDish({dish}){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}
function RenderComments({comments}){
    if (comments != null)
            return(
                <div >
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in>
                                        <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',{
                                        year:'numeric',
                                        month:'short',
                                        day: "2-digit"
                                        }).format(new Date(comment.date))}</p>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                </div>
            );
        else
            return(
                <div></div>
            ); 
}
const Dishdetail=(props)=>{
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish!=null){
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem ><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
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
                    <RenderComments comments={props.comment} />
                    <CommentForm postComment={props.postComment}
                    dishID={props.dish.id} />
                </div>
            </div>
        </div>
    );
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
        this.props.postComment(this.props.dishID, values.rating, values.author, values.comment);
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