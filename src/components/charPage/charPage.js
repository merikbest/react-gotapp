import React, {Component} from "react";
import {Col, Row, Container} from 'reactstrap';
import ItemList from "../itemList";
import CharDetails, {Field} from "../charDetails";
import ErrorMessage from '../errorMessage';
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class CharPage extends Component {
    gotService = new GotService();

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
    onItemSelected = (id) => {
        this.setState({
            selectedCharacter: id // ???
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={(item) => `${item.name} (${item.gender})`}/>
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedCharacter}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}