import React from 'react';
import image from '../../../assets/icons/magIcon.png';
import './textInput.css';

const TextInput = props =>{
    const {setSearch,search,refInput,handleKeyDown,setShowSuggestionList} = props;

    return(
        <>
        <img src={image} height={20} width={20} alt="profileImage" />
          <input
          // input style
            className="inputText"
            // onText change calling setSearch and ApiCall is initiated on change
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            // textinput placeholder
            placeholder={
              'Search users by ID, address, name, items & pincode... '
            }
            // input text value
            value={search}
            // callings on keydown
            onKeyDown={handleKeyDown}
            // ref for DOM manipulation
            ref={refInput}
            // on focus shows suggestion list of searched text
            onFocus={() => {
              if (search.length > 0) {
                setShowSuggestionList(true);
              }
            }}
          
          /></>
    )
}

export default TextInput