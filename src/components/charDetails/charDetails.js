import React, {Component} from 'react';
import gotService from "../../services/gotService";
import './charDetails.css';

const Field = ({character, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{character[field]}</span>
        </li>
    )
}

export {Field}

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        character: null
    }

    // хук вызывается тогда, когда компонент должен быть обновлен
    // это происходит в 2 случаях, 1. когда компонент получает новое проперти
    // 2. когда у нас изменяется стейт
    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

    updateCharacter() {
        // получаем id из пропсов
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        // получаем данные из сервиса (персонажа по Id) и изменяем state
        this.gotService.getCharacterById(charId)
            .then((character) => {
                this.setState({character});
            });
    }

    render() {

        if (!this.state.character) {
            return <span className='select-error'>Please select a character</span>
        }

        const {character} = this.state;
        const {name} = character;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        // произвести операции перед тем как работать с children (Field)
                        // перебор всех "детей" в компоненте
                        React.Children.map(this.props.children, (child) => {
                            // метод создание копии елемента
                            return React.cloneElement(child, {character});
                        })
                    }
                </ul>
            </div>
        );
    }
}