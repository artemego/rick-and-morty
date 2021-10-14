import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { SearchContainer } from '../components/Search/SearchContainer';
import { ChTableContainer } from '../components/Table/ChTableContainer';
import { selectIsSearchOpen } from '../state/optionsSlice';

const Home: NextPage = () => {
  const isSearchOpen = useSelector(selectIsSearchOpen);

  return (
    <div>
      {isSearchOpen && <SearchContainer />}

      <ChTableContainer />
    </div>
  );
};

export default Home;
