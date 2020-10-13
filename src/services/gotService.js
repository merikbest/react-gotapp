export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    };

    // this.getResource - Асинхронная функция получает данные с сервера.
    // Для того что бы функция сработала необходимо подождать ответа сервера иначе ошибка.
    // Для этого необходимо сделать функцию getAllCharacters асинхронной (async),
    // а метод this.getResource пометить ключевым словом await.
    getAllCharacters = async () => {
        const listOfCharacters = await this.getResource(`/characters?page=5&pageSize=10`);
        return listOfCharacters.map(this._transformCharacter); // .map - трансформируем данные в ._transformCharacter
    }

    getCharacterById = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const listOfBooks = await this.getResource('/books')
        return listOfBooks.map(this._transformBook);
    }

    getBooksById = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const listOfHouses = await this.getResource('/houses')
        return listOfHouses.map(this._transformHouse());
    }

    getHousesById = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isSet(data) {
        if (data) {
            return data;
        } else {
            return '---';
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    // Функция выборки данных (избавляемся от дублирования кода)
    _transformCharacter = (character) => {
        return {
            id: this._extractId(character),
            name: this.isSet(character.name),
            gender: this.isSet(character.gender),
            born: this.isSet(character.born),
            died: this.isSet(character.died),
            culture: this.isSet(character.culture)
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overload: this.isSet(house.overload),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }
}
