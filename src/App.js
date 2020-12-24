import './App.css';
import React, { useState, useRef } from 'react';
import ApiClient from './api/apiClient';
import UserCard from './components/userCard';
import image from './assets/icons/magIcon.png';
import ResultCard from './components/resultCard';

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
      search && SearchApiCall();
      if (search === '' && searchData.length === 0) {
        setSearchData([]);
      }
      setCursor(-1);
      if (refContainer.current) {
        refContainer.current.scrollTop = 0;
      }
    },
    [search]
  );

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
    setSelectedUser([searchData[cursor]]);
    setShowSuggestionList(false);
    setCursor(-1);
    setSearch('');
  };

  // handling key up, key down and enter fron input element
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && cursor === -1) {
      setSelectedUser(searchData);
      setShowSuggestionList(false);
      setCursor(-1);
      setSearch('');
    } else if (e.keyCode === 13 && cursor >= 0) {
      onSelect();
    }
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);

      refContainer.current.scrollTop =
        refContainer.current.scrollTop -
        refContainer.current.children[1].scrollHeight;
    } else if (e.keyCode === 40 && cursor < searchData.length - 1) {
      setCursor(cursor + 1);

      refContainer.current.scrollTop =
        refContainer.current.children[1].scrollHeight * cursor + 1;
    }
  };

  return (
    <div className="App">
      <header className="App-Container" style={{ paddingTop: 20 }}>
        <div className="inputContainer">
          <img src={image} height={20} width={20} alt="profileImage" />
          <input
            className="inputText"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={
              'Search users by ID, address, name, items & pincode... '
            }
            value={search}
            onKeyDown={handleKeyDown}
            ref={refInput}
            onFocus={() => {
              if (search.length > 0) {
                setShowSuggestionList(true);
              }
            }}
            // onBlurCapture={() => setShowSuggestionList(false)}
          />
        </div>
        <div className="suggestions-search-list">
          <div className="span-list-header" ref={refContainer}>
            {searchData.length > 0 &&
            showSuggestionList && (
              <div
                style={{
                  color: '#4e4e4e',
                  fontSize: 14,
                  fontWeight: 300,
                  padding: 15,
                  borderBottomWidth: 0.1,
                  borderColor: '#f0f0f0',
                  borderStyle: 'double',
                  borderTopWidth: 0.1,
                }}
              >
                "{search}" found in items
              </div>
            )}
            {searchData && showSuggestionList && searchData.length > 0 ? (
              searchData.map((val, index) => (
                <UserCard
                  val={val}
                  index={index}
                  key={index}
                  className={cursor === index ? 'active' : null}
                  onHover={(val) => setCursor(val)}
                  searchText={search}
                  onSelect={() => onSelect()}
                />
              ))
            ) : (
              searchData &&
              showSuggestionList &&
              search.length > 0 && (
                <div
                  style={{
                    color: '#5e6267',
                    height: 40,
                    textAlign: 'center',
                  }}
                >
                  No User found
                </div>
              )
            )}
          </div>
        </div>
        {selectedUser &&
        !showSuggestionList && (
          <div className="search-results">
            {selectedUser.map((user, index) => (
              <ResultCard val={user} key={index} />
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
