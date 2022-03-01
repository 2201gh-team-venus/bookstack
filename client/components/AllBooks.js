import React from 'react';
import  {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchBooks} from '../store/books';

export class AllBooks extends React.Component {
    componentDidMount(){
        this.props.fetchBooks();
    }
    render(){
        if(this.props.books !== undefined || null){
            return(
                <div>
                    <h1>All Books</h1>
                    <div>
                        {this.props.books.map((book) => (
                            <div className="book" key={book.id}>
                                <img src={book.imageURL}/>
                                <Link to={`/books/${book.id}`}>
                                    <h3>{book.name}</h3>
                                </Link>
                                {/*Include Author name and genre for book*/}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {books: state.books};
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: () => dispatch(fetchBooks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
