import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';
class CharList extends Component {
	state = {
		chars: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	onCharsLoading = () => {
		this.setState({ loading: true, error: false })
	}

	onCharsLoaded = (chars) => {
		this.setState({ chars, loading: false })
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	updateChars = () => {
		this.onCharsLoading();
		this.marvelService
			.getAllCharacters()
			.then(this.onCharsLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateChars();
	}

	render() {
		const { chars, loading, error } = this.state;
		const { onCharSelected } = this.props;

		const items = chars.map(item => <View {...item} key={item.id} onCharSelected={() => onCharSelected(item.id)} />)

		const loadingComponent = loading ? <Spinner /> : null;
		const errorComponent = error ? <Error /> : null;
		const content = !(loadingComponent || errorComponent) ? items : null;

		return (
			<div className="char__list">
				{loadingComponent}
				{errorComponent}
				<ul className="char__grid">
					{content}
				</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}


const View = ({ thumbnail, name, onCharSelected }) => {
	return (
		<li className="char__item"
			onClick={onCharSelected}>
			<img src={thumbnail} alt="abyss" />
			<div className="char__name">{name}</div>
		</li>
	)
}

export default CharList;