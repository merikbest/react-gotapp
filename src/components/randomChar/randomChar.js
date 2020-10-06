import React, {Component} from 'react';
import './randomChar.css';
import gotService from "../../services/gotService";
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage";

export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        // пустой объект который будет возвратится в виде name: character.name и т.д. (описан в класс GotService)
        character: {},
        loading: true,
        error: false
    }

    // Mounting - метод вызывается когда компонент успешно отрисовался и появился на странице
    // Этот метод самое лучшее место для инициализации нашего компонента
    // Плохая практика делать запросы к серверу в конструкторе,
    // для этого лучше всего использовать методы жизненного цикла componentDidMount() и componentWillUnmount()
    componentDidMount() {
        this.updateCharacter(); // Когда будет создан инстанс RandomChar у него будет вызван метод updateCharacter()
        this.timerId = setInterval(this.updateCharacter, 2000); // обновление каждые 2 сек
    }

    componentWillUnmount() {
        clearInterval(this.timerId); // остановить таймер когда скрыт контент
    }

    // Обработчик событий который устанавливает state
    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    }

    // Функция обновления рандомного персонажа
    updateCharacter = () => {
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
