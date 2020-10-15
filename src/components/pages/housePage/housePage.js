import React, {Component} from "react";
import GotService from "../../../services/gotService";
import ErrorMessage from "../../errorMessage";
import ItemList from "../../itemList";
import RowBlock from "../../rowBlock";
import ItemDetails, {Field} from "../../itemDetails/itemDetails";
import {withRouter} from 'react-router-dom';

class HousePage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: 1,
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => `${item.name} (${item.region})`}/>
        )

        const houseDetails = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHousesById}>
                <Field field='region' label='Region' />
                <Field field='titles' label='Titles' />
                <Field field="words" label="Words" />
                <Field field='overlord' label='Lord' />
                <Field field='ancestralWeapons' label='Ancestral Weapons' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={houseDetails} />
        )
    }
}

export default withRouter(HousePage);