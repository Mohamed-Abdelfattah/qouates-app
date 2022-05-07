import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import QuoteForm from '../components/quotes/QuoteForm';

const AddQuote = (props) => {
  //
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = (quote) => {
    // console.log(quote);
    sendRequest(quote);
  };

  return (
    <React.Fragment>
      <QuoteForm
        onAddQuote={addQuoteHandler}
        isLoading={status === 'pending'}
      />
    </React.Fragment>
  );
};

export default AddQuote;
