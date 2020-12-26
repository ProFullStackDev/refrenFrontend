const SearchMatchText = (txt, searchText) => {
  const match =
    txt.substring(0, searchText.length).toLowerCase() ===
    searchText.toLowerCase();

  if (match) {
    return (
      <span>
        <span style={{ color: '#327de5' }}>
          {txt.substring(0, searchText.length)}
        </span>
        {txt.substring(searchText.length)}
      </span>
    );
  } else {
    return txt;
  }
};

export default SearchMatchText;
