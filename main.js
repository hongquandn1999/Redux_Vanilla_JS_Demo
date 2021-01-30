console.log(window.Redux);

// Setup Redux store
// State
// Reducer
// Store

const { createStore } = window.Redux;

const initialCharacter = [];

const characterReducer = (state = initialCharacter, action) => {
	switch (action.type) {
		case 'ADD_CHARACTER':
			const newListCharacter = [...state];
			newListCharacter.push(action.payload);
			return newListCharacter;

		default:
			return state;
	}
};

const store = createStore(characterReducer);

// -------------------------------------------------

// Render initial character list
const renderCharacterList = (characterList) => {
	if (!Array.isArray(characterList)) return;

	const ulElement = document.querySelector('#ulCharacterId');
	if (!ulElement) return;

	// reset previous content of ul
	ulElement.innerHTML = '';

	for (const character of characterList) {
		const liElement = document.createElement('li');
		liElement.textContent = character;

		ulElement.appendChild(liElement);
	}
};
// Render initial character list
const initialCharacterList = store.getState();
console.log(initialCharacterList);
renderCharacterList(initialCharacterList);

// Handle form input
const idFormElement = document.querySelector('#formInput');
if (idFormElement) {
	const handleAddCharacter = (e) => {
		e.preventDefault();

		const characterTextElement = idFormElement.querySelector('#inputCharacter');
		if (!characterTextElement) return;

		const action = {
			type: 'ADD_CHARACTER',
			payload: characterTextElement.value,
		};

		store.dispatch(action);

		idFormElement.reset();
	};

	idFormElement.addEventListener('submit', handleAddCharacter);
}

store.subscribe(() => {
	const newListCharacter = store.getState();
	renderCharacterList(newListCharacter);
});
