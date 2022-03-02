import React from "react";
import { connect } from "react-redux";
import { fetchSingleBook } from "../store/singleBook";

class SingleBook extends React.Component {
    componentDidMount() {
        this.props.loadSingleBook(this.props.match.params.bookId);
    }

    render() {
        const {name, author, description, imageURL, price} = this.props.book

        return (
            <div>
                <img src={imageURL}/>
                <h3>{name}</h3>
                <h5>{author}</h5>
                <h5>{price}</h5>
                <p>{description}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.book,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSingleBook: (bookId) => dispatch(fetchSingleBook(bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)