export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
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
    async getAllCharacters() {
        const listOfCharacters = await this.getResource('/characters?page=5&pageSize=10');
        return listOfCharacters.map(this._transformCharacter); // .map - трансформируем данные в ._transformCharacter
    }

    async getCharacterById(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        const listOfBooks = await this.getResource('/books/')
        return listOfBooks.map(this._transformBook);
    }

    async getBooksById(id) {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }

    async getAllHouses() {
        const listOfHouses = await this.getResource('/houses/')
        return listOfHouses.map(this._transformHouse());
    }

    async getHousesById(id) {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    // Функция выборки данных (избавляемся от дублирования кода)
    _transformCharacter(character) {
        return {
            name: character.name,
            gender: character.gender,
            born: character.born,
            died: character.died,
            culture: character.culture
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overload: house.overload,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}
