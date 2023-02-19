import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImagesByQuery, alertOnResolved, alertOnRejected } from 'services';
import {
  Searchbar,
  ImageGallery,
  Loader,
  LoadButton,
  TopButton,
} from 'components';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
    showTopButton: false,
    status: 'idle',
    hasError: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onWindowScroll);
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });

      getImagesByQuery(query, page)
        .then(({ images, totalImages }) => {
          alertOnResolved(images.length, totalImages, page);
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            totalImages,
            status: 'resolved',
          }));
        })
        .catch(() => {
          this.setState({
            status: 'rejected',
          });
          alertOnRejected();
        });
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error.message || error)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }
  searchFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }

    this.setState({
      images: [],
      query,
      page: 1,
      totalImages: 0,
    });
  };

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onWindowScroll = () => {
    document.documentElement.scrollTop > 20
      ? this.setState({ showTopButton: true })
      : this.setState({ showTopButton: false });
  };

  onTopBtnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong, please try again later</h1>;
    }
    const { images, totalImages, showTopButton, status } = this.state;
    const showLoadButton =
      totalImages !== images.length && status === 'resolved';

    return (
      <>
        <Searchbar onSubmit={this.searchFormSubmit} />
        {!!images.length && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {showLoadButton && <LoadButton onClick={this.onLoadMoreBtnClick} />}
        {showTopButton && <TopButton onClick={this.onTopBtnClick} aria-label="Go to the top" />}
        <ToastContainer autoClose={2000} newestOnTop theme="light" />
      </>
    );
  }
}
