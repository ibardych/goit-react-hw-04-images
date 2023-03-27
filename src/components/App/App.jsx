import { useState } from 'react';
import { AppStyled } from './App.styled';
import { POPULAR_QUERIES } from 'constants';
import Searchbar from 'components/Searchbar/Searchbar';
import PopularQueries from 'components/PopularQueries/PopularQueries';
import Gallery from 'components/Gallery/Gallery';
import Copyright from 'components/Copyright/Copyright';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const handleSearch = searchQuery => {
    const query = searchQuery.replace(/[&?=]/g, '').toLowerCase().trim();
    setQuery(query);
    setPage(1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <AppStyled>
      <Searchbar onHandleSearch={handleSearch} searchQuery={query} />
      <PopularQueries
        queries={POPULAR_QUERIES}
        searchQuery={query}
        OnHandlePopularQuery={handleSearch}
      />
      <Gallery query={query} page={page} nextPage={nextPage} />
      <Copyright message="©2023 Made by Iurii Bardych" />
    </AppStyled>
  );
};

export default App;
