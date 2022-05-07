import { useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetails = (props) => {
  //
  const params = useParams();
  const match = useRouteMatch();

  const {
    status,
    sendRequest,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.id);
  }, [sendRequest, params.id]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <h3>Ooops! found no quote</h3>;
  }

  return (
    <section>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <div className="centered">
        <Route path={match.path} exact>
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments
          </Link>
        </Route>
      </div>
      {/* max made the path as the button/link above */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetails;
