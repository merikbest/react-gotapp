import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

import './app.css';

export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false,
        selectedCharacter: 130 // какой персонаж выбран в данный момент
    }

    // переключение кнопки (скрыть контент)
    hideRandomCharacter = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    // когда мы нажмем на какого-нибудь персонажа мы возьмем его id и поместим его в текущий state
    onCharacterSelected = (id) => {
        this.setState({
            selectedCharacter: id
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            <>
                <Container>
                    <Header/>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={this.hideRandomCharacter}>Toggle random character
                            </button>
                        </Col>
                    </Row>

                    <Row>
                        <Col md='6'>
                            <ItemList onCharacterSelected={this.onCharacterSelected}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedCharacter}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}