import React, { useState, useEffect } from 'react';
import {
  IconButton,
  TextField,
  Grid,
  CircularProgress,
  Container,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NewsCard from './NewsCard';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('pinball');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=pinball'
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    setNews([]);
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setNews(data.hits);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showNews = () => {
    return (
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
      >
        {news.map((item) => (
          <NewsCard
            className='app-news-card'
            variant='outlined'
            key={item.objectID}
            title={item.title}
            url={item.url}
            createAt={item.created_at}
          />
        ))}
      </Grid>
    );
  };

  const showLoading = () =>
    loading ? <CircularProgress className='app-loading' /> : '';

  const showSearchForm = () => {
    return (
      <form onSubmit={handleSubmit} className='app-form'>
        <TextField
          label='Search'
          size='small'
          value={searchQuery}
          onChange={handleChange}
        />
        <IconButton color='primary' aria-label='search' onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </form>
    );
  };

  return (
    <Container maxWidth='xl'>
      <h2 className='app-header'>Pinball News</h2>
      <section className='content'>
        {showSearchForm()}
        {showLoading()}
        {showNews()}
      </section>
    </Container>
  );
};

export default App;
