class MarvelService {
	_apikey = '70188d3e9736e22562d84fdd1a130aeb';
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	offset = 193;

	getData = async (url) => {
		const response = await fetch(url);

		if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`);

		return await response.json()
	}

	getAllCharacters = async () => {
		const { data: { results } } = await this.getData(`${this.apiBase_}characters?limit=9&offset=${this.offset}&apikey=${this.apikey_}`);

		return results.map(item => this.transformCharData(item))
	}

	getCharacter = async (id) => {
		const { data: { results } } = await this.getData(`${this.apiBase_}characters/${id}?apikey=${this.apikey_}`);
		return this.transformCharData(results)
	}
	transformCharData = (data) => {
		console.log(data);
	}

}

export default MarvelService;