import { Component } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Header, Form, Input, Button } from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ searchQuery: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      return toast.warning('Please, enter something to search...');
    }
    this.props.onSubmit(searchQuery);
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" aria-label="Search pictures">
            <BsSearch size={24} />
          </Button>

          <Input
            type="text"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}
