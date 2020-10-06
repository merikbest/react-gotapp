import React, {Component} from 'react';
import gotService from "../../services/gotService";

import './charDetails.css';

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
            .then((char) => {
                this.setState({char});
            });
    }

    render() {

        if (!this.state.character) {
            return <span className='select-error'>Please select a character</span>
        }

        const {name, gender, born, died, culture} = this.state.character;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}