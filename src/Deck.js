import React, { Component } from "react";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deck: null, drawn: [] };
		this.getCard = this.getCard.bind(this);
	}

	async componentDidMount() {
		let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
		this.setState({ deck: deck.data });
	}

	async getCard() {
		let deck_id = this.state.deck.deck_id;

		try {
			let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
			//make request using deck id
			let cardRes = await axios.get(cardUrl);

			if (cardRes.data.remaining === 0) {
				throw new Error("No cards remaining");
			}
			//set state using new card info from api
			let card = cardRes.data.cards[0];
			this.setState(st => ({
				drawn: [
					...st.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.value} of ${card.suit}`
					}
				]
			}));
		} catch (err) {
			alert(err);
		}
	}

	render() {
		return (
			<div>
				<h1>Card Dealer</h1>
				<button onClick={this.getCard}>Get Card!</button>
			</div>
		);
	}
}

export default Deck;
