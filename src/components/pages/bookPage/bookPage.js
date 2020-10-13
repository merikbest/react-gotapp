import React, {Component} from "react";
import GotService from "../../../services/gotService";
import ErrorMessage from "../../errorMessage";
import ItemList from "../../itemList";
import RowBlock from "../../rowBlock";
import ItemDetails, {Field} from "../../itemDetails";

export default class BookPage extends Component {

    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => `${item.name} (${item.numberOfPages})`}/>
        )

        const bookDetails = (
            <ItemDetails
                itemId={this.state.selectedBook}
                getData={this.gotService.getBooksById}>
                <Field field='numberOfPages' label='Number of pages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails} />
        )
    }

}