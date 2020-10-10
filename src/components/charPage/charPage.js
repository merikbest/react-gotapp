import React, {Component} from "react";
import {Col, Row, Container} from 'reactstrap';
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import ErrorMessage from '../errorMessage';

export default class CharPage extends Component{

    state = {
        selectedCharacter: null, // какой персонаж выбран в данный момент
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        });
    }

    // когда мы нажмем на какого-нибудь персонажа мы возьмем его id и поместим его в текущий state
    onCharacterSelected = (id) => {
        this.setState({
            selectedCharacter: id // ???
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Row>
                <Col md='6'>
                    <ItemList onCharacterSelected={this.onCharacterSelected}/>
                </Col>
                <Col md='6'>
                    <CharDetails charId={this.state.selectedCharacter}/>
                </Col>
            </Row>
        )
    }
}