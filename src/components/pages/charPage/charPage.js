import React, {Component} from "react";
import ItemList from "../../itemList";
import ErrorMessage from '../../errorMessage';
import GotService from "../../../services/gotService";
import RowBlock from "../../rowBlock";
import ItemDetails, {Field} from "../../itemDetails/itemDetails";
import {withRouter} from 'react-router-dom';

class CharPage extends Component {

    gotService = new GotService();

    state = {
        selectedCharacter: 130, // какой персонаж выбран в данный момент
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
            <ItemDetails
                itemId={this.state.selectedCharacter}
                getData={this.gotService.getCharacterById}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}

export default withRouter(CharPage);