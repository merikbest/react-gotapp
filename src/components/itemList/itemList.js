import React, {Component} from 'react';
import './itemList.css';
import gotService from "../../services/gotService";
import Spinner from "../spinner";

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                });
            });
    }

    renderItems(array) {
        return array.map((item, i) => {
            return (
                // когда создаем в реакте элемент путем перебора массива необходимо у каждого элемента определить ключ key={i}
                <li
                    key={i}
                    className="list-group-item"
                    onClick={ () => this.props.onCharacterSelected(41 + i)}>
                    {item.name}
                </li>
            )
        });
    }

    render() {

        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}