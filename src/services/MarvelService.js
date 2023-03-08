class MarvelService {
	_apikey = '70188d3e9736e22562d84fdd1a130aeb';
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	offset = 193;

	getData = async (url) => {
		const response = await fetch(url);

		if (!response.ok) {
			console.log('ошибка');
			throw new Error(`Could not fetch ${url}, status: ${response.status}`);
		}

		return await response.json()
	}

	getAllCharacters = async () => {
		const { data: { results } } = await this.getData(`${this._apiBase}characters?limit=9&offset=${this.offset}&apikey=${this._apikey}`);

		return results.map(item => this._transformCharData(item))
	}

	getCharacter = async (id) => {
		const { data: { results } } = await this.getData(`${this._apiBase}characters/${id}?apikey=${this._apikey}`);
		return this._transformCharData(results[0])
	}
	_transformCharData = (char) => {

		return {
			id: char.id,
			name: char.name,
			description: char.description.length === 0 ? "There is no description for this character" : char.description.length >= 210 ? char.description.slice(0, 210) + '...' : char.description,
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			wiki: char.urls[0].url,
			homepage: char.urls[1].url,
		}
	}

}

export default MarvelService;