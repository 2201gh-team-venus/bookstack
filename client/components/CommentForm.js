import React, { Component } from 'react';
import { createComment } from '../store/singleBook'
import { connect } from 'react-redux';

class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };

        this.handleChange  = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.createComment({...this.state})
        console.log("handleSubmit", this.state)
    }

    render() {
        const  { message } = this.state;
        const { handleChange, handleSubmit } = this;

        return (
            <form id='comment-form' onSubmit={handleSubmit}>
    
            <label htmlFor='message'>Leave a Review:</label>
            <br />
            <textarea name='message' onChange={handleChange} value={message} />
            <br />
            <br />
            <button type='submit'>Submit</button>
          </form>
        )
    }
}

const mapDispatchToProps = (dispatch, { history }) => ({
    createComment:  (comment) => dispatch(createComment(comment, history))
})

export default connect(null, mapDispatchToProps)(CommentForm)