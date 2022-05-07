import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import QuoteDetails from './pages/quote-detail';
// import Quotes from './pages/quotes';
// import AddQuote from './pages/add-quote';
// import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const Quotes = React.lazy(() => import('./pages/quotes'));
const AddQuote = React.lazy(() => import('./pages/add-quote'));
const QuoteDetails = React.lazy(() => import('./pages/quote-detail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  //
  return (
    <Layout>
      <React.Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          {/* <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route> */}
          <Redirect exact from="/" to="/quotes" />
          <Route path="/quotes" exact>
            <Quotes />
          </Route>
          <Route path="/quotes/:id">
            <QuoteDetails />
          </Route>
          <Route path="/new-quote">
            <AddQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </React.Suspense>
    </Layout>
  );
}

export default App;
