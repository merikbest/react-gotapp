import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharPage from "../pages/charPage";
import './app.css';
import {BookPage} from "../pages/bookPage";
import HousePage from "../pages/housePage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {BooksItem} from "../pages/bookPage";

export default class App extends Component {

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
            <Router>
                <div className="app">
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

                        <Route path='/characters' component={CharPage}/>

                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                            return <BooksItem bookId={id}/>
                        }
                        }/>

                        <Route path='/houses' component={HousePage} />

                    </Container>
                </div>
            </Router>
        );
    }
}