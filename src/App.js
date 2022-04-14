import {useState, useEffect} from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import './App.css';

const App = () => {
    const [searchField, setSearchField] = useState('');
    const [title, setTitle] = useState('');
    const [monsters, setMonsters] = useState([]);
    const [filteredMonsters, setFilteredMonsters] = useState(monsters);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setMonsters(users))
    }, []);

    useEffect(() => {
        const newFilteredMonsters = monsters.filter(monster => {
            return monster.name.toLowerCase().includes(searchField);
        })
        setFilteredMonsters(newFilteredMonsters);
    }, [monsters, searchField])

    const onSearchChange = (event) => {
        setSearchField(event.target.value.trim().toLowerCase());
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value.trim().toLowerCase());
    }

    return (
        <div className="App">
            <h1 className='app-title'>Monsters Rolodex</h1>
            <SearchBox
                onChangeHandler={onSearchChange}
                placeholder='search monsters'
                className='search-box'
            />
            <br/>
            {/*<SearchBox*/}
            {/*    onChangeHandler={onTitleChange}*/}
            {/*    placeholder='search title'*/}
            {/*    className='title-search-box'*/}
            {/*/>*/}
            <CardList monsters={filteredMonsters}/>
        </div>
    );
}

export default App;
