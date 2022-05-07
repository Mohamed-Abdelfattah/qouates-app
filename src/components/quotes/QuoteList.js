import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotesArray, typeOfSortingIsAscending) => {
  return quotesArray.sort((quoteA, quoteB) => {
    if (typeOfSortingIsAscending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  //
  const history = useHistory();
  const location = useLocation();
  // console.log(location);
  const queryParams = new URLSearchParams(location.search);
  // for (let val of queryParams.keys()) {
  //   console.log(val, queryParams.get(val));
  // }
  const shouldSortingBeAscending = queryParams.get('sort') === 'asc';
  const sortedQuotes = sortQuotes(props.quotes, shouldSortingBeAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${shouldSortingBeAscending ? 'desc' : 'asc'}`,
    });
    // history.push(
    //   `${location.pathname}?sort=${shouldSortingBeAscending ? 'desc' : 'asc'}`
    // );
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {shouldSortingBeAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
