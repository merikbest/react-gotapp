import React, {Component} from 'react';
import './randomChar.css';
import gotService from "../../services/gotService";
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage";

export default class RandomChar extends Component {

    constructor(props) {
        super(props);
        this.updateCharacter(); // Когда будет создан инстанс RandomChar у него будет вызван метод updateCharacter()
    }

    gotService = new gotService();

    state = {
        // пустой объект который будет возвратится в виде name: character.name и т.д. (описан в класс GotService)
        character: {},
        loading: true,
        error: false
    }

    // Обработчик событий который устанавливает state
    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false
        });
    }

    onError= (err) => {
        this.setState({
            error: true,
            loading: false
        });
    }

    // Функция обновления рандомного персонажа
    updateCharacter() {
        const id = Math.floor(Math.random() * 140 + 25); // от 25 до 140
        this.gotService.getCharacterById(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        const {character, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = error ? <Spinner/> : null;
        const content = (!loading || error) ? <View character={character}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

// Локальный компонент
const View = ({character}) => {

    const {name, gender, born, died, culture} = character;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
