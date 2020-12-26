import './App.css';
import React, { useState, useRef } from 'react';
import ApiClient from '../../api/apiClient';
import { SuggestionsList, TextInput, ResultList } from '../index';

function App() {
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [cursor, setCursor] = useState(-1);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const refContainer = useRef();
  const refInput = useRef();

  React.useEffect(
    () => {
      // api call on input search value changes
      search && SearchApiCall();
      if (search === '') {
        // if search value is empty save empty list
        setSearchData([]);
      }
      // setting navigation cursor to default while searching
      setCursor(-1);
      if (refContainer.current) {
        // reset suggestion list height back to top position
        refContainer.current.scrollTop = 0;
      }
    },
    [search]
  );

  // inital focus on inputText component
  React.useEffect(() => {
    refInput.current.focus();
  }, []);

  // api call to search for users with the search text
  const SearchApiCall = () => {
    ApiClient.get(`/user/userDetails?searchData=${search}`)
      .then((res) => {
        setSearchData(res.data);
        setShowSuggestionList(true);
      })
      .catch((e) => {
        alert(e);
      });
  };

  // on keyboard enter and click selects the user card to render as result
  const onSelect = () => {
    // saving Selected user state
    setSelectedUser([searchData[cursor]]);
    // closing suggestion list
    setShowSuggestionList(false);
    // setting cursor back to default
    setCursor(-1);
    // reset search input
    setSearch('');
  };

  // handling key up, key down and enter fron input element
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && cursor === -1) {
      // on enter from keyboard executes this part and selects one user (current cursor keyboard submit)
      setSelectedUser(searchData);
      setShowSuggestionList(false);
      setCursor(-1);
      setSearch('');
    } else if (e.keyCode === 13 && cursor >= 0) {
      // on enter from keyboard & selecting all input search field data
      onSelect();
    }
    if (e.keyCode === 38 && cursor > 0) {
      // navigates suggestions list upwards
      setCursor(cursor - 1);

      refContainer.current.scrollTop =
        refContainer.current.scrollTop -
        refContainer.current.children[1].scrollHeight;
    } else if (e.keyCode === 40 && cursor < searchData.length - 1) {
      // navigates suggestions list downwards
      setCursor(cursor + 1);

      refContainer.current.scrollTop =
        refContainer.current.children[1].scrollHeight * cursor + 1;
    }
  };

  return (
    <div className="App">
      <header className="App-Container" style={{ paddingTop: 20 }}>
        <div className="inputContainer">
          {/* Text input for searching data */}
          <TextInput
            setShowSuggestionList={(e) => setShowSuggestionList(e)}
            setSearch={(e) => setSearch(e)}
            search={search}
            handleKeyDown={(e) => handleKeyDown(e)}
            refInput={refInput}
          />
        </div>
        <div className="suggestions-search-list">
          <div className="span-list-header" ref={refContainer}>
            {/* Shows search text for data found */}
            {searchData.length > 0 &&
            showSuggestionList && (
              <div className="notFoundDiv">"{search}" found in items</div>
            )}
            {/* Suggestions data list */}
            <SuggestionsList
              search={search}
              searchData={searchData}
              showSuggestionList={showSuggestionList}
              setCursor={(val) => setCursor(val)}
              onSelect={() => onSelect()}
              cursor={cursor}
            />
          </div>
        </div>

        {/* Show results list on selecting a user card / on submitting initial search text(shows list of data)  */}
        <ResultList
          selectedUser={selectedUser}
          showSuggestionList={showSuggestionList}
        />
      </header>
    </div>
  );
}

export default App;
