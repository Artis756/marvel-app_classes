import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	onCharLoading = () => {
		this.setState({ loading: true, error: false })
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false })
	}

	onError = () => {
		this.setState({ loading: false, error: true })
	}

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

		this.onCharLoading();
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	componentDidMount() {
		this.updateChar();
	}

	render() {
		const { char, loading, error } = this.state;

		const loadingComponent = loading ? <Spinner /> : null;
		const errorComponent = error ? <Error /> : null;
		const charInfo = !(loadingComponent || errorComponent) ? <View {...char} /> : null;

		return (
			<div className="randomchar">
				{loadingComponent}
				{errorComponent}
				{charInfo}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main"
						onClick={this.updateChar}>
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
}

const View = ({ name, description, thumbnail, homepage, wiki, }) => {
	const objectFit = thumbnail.indexOf('image_not_available') >= 0 ? 'contain' : 'cover';

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" style={{ objectFit }} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;