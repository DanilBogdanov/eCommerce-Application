import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';

export default function SearchBar(): ReactElement {
  const [searchText, setSearchText] = useState<string>('');
  const [isTextValid, setIsTextValid] = useState<boolean>(false);
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number>(0);
  const navigate = useNavigate();

  const search = () => {
    if (isTextValid) {
      navigate(`/catalog?search=${searchText}`);
      setSearchText('');
      setIsTextValid(false);
    } else {
      clearTimeout(timeoutId);
      setIsShowInfo(true);
      const timeout = setTimeout(() => setIsShowInfo(false), 3000);
      setTimeoutId(+timeout);
    }
  };

  const handleKeyDown = (key: string) => {
    setIsShowInfo(false);
    if (key === 'Enter') {
      search();
    }
  };

  const handleTextChange = (value: string) => {
    setIsShowInfo(false);
    setSearchText(value);
    if (value.trim().length < 5) {
      setIsTextValid(false);
    } else {
      setIsTextValid(true);
    }
  };

  return (
    <div className='search-bar'>
      <input
        className='search-bar__input'
        placeholder='search...'
        type='search'
        onChange={(e) => handleTextChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e.key)}
        value={searchText}
      />
      <button
        className='search-bar__btn'
        type='button'
        aria-label='search'
        onClick={() => search()}
      />
      {isShowInfo && (
        <div className='search-bar__info'>Minimum length 5 characters</div>
      )}
    </div>
  );
}
