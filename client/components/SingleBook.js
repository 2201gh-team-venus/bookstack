import React from "react";
import { connect } from "react-redux";
import { fetchSingleBook } from "../store/singleBook";

class SingleBook extends React.Component {
    componentDidMount() {
        this.props.loadSingleBook(this.props.match.params.bookId);
    }

    render() {
        if (!this.props.book) {
            return <h1>No book found</h1>
        }
        
        const book = this.props.book || [];
        const {name, description, imageURL, price} = book;
        const author = this.props.book.author || {};
       
        return (
            <div>
                <img src={imageURL}/>
                <h3>{name}</h3>
                <h5>{author.name}</h5>
                <h5>{price}</h5>
                <p>{description}</p>
            </div>

        )
    }
}

const mapStateToProps = ({ book }) => {
    return { book };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSingleBook: (bookId) => dispatch(fetchSingleBook(bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)