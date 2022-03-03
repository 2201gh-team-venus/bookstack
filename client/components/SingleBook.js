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

        const { name, description, imageURL, price } = this.props.book;
        const author = this.props.book.author || {};

        return (
            <div className="book">
                <img src={imageURL} />
                <div className="book-info">
                    <h3>{name}</h3>
                    <h5>By: {author.name}</h5>
                    <p>{description}</p>
                    <h3>${price}</h3>
                    <button>Add To Cart</button>
                </div>

                
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