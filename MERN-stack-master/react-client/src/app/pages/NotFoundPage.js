import { default as React} from 'react';

const NotFoundPage = ({children}) => {
  return (
      

    <div className="">
      <p className="sub-title"><p className="blue">404</p>Sorry, we can't find this page.</p>
      <p className="description">Try searching or go to <a href="/" target="_self">The welcomepage.</a></p>
    </div>

  );
};

export default NotFoundPage;
