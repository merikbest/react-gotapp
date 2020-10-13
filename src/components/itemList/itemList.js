import React, {Component} from 'react';
import './itemList.css';
import Spinner from "../spinner";

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({itemList});
            });
    }

    renderItems(array) {
        return array.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                // когда создаем в реакте элемент путем перебора массива необходимо у каждого элемента определить ключ key={i}
                <li
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    render() {

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}