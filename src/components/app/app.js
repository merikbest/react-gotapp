import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharPage from "../charPage";
import './app.css';
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import GotService from "../../services/gotService";

export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        });
    }

    // переключение кнопки (скрыть контент)
    hideRandomCharacter = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

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
                    <CharPage/>
{/*                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedCharacter}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedCharacter}/>
                        </Col>
                    </Row>*/}
                </Container>
            </>
        );
    }
}