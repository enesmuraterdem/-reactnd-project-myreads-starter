import React from 'react'


class Book extends React.Component {
  state = {
    shelfValue: this.props.data && this.props.data.shelf ? this.props.data.shelf : 'none'
  }

  shelveOptions = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
    none: 'None',
  }

  handleChange(e) {
    const value = e.target.value;
    const { data, move } = this.props;
    this.setState({
      shelfValue: value
    }, () => {
      move(data, value)
    })
  }

  render() {
    const { shelfValue } = this.state;
    const { data } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: data.imageLinks && data.imageLinks.thumbnail ? `url(${data.imageLinks.thumbnail})` : undefined }}></div>
            <div className="book-shelf-changer">
              <select value={shelfValue} onChange={e => this.handleChange(e)}>
                <option value="move" disabled>Move to...</option>
                {
                  Object
                    .keys(this.shelveOptions)
                    .map(key => (
                      <option key={key} value={key}>{this.shelveOptions[key]}</option>
                    ))
                }
              </select>
            </div>
          </div>
          <div className="book-title">{data.title || '---'}</div>
          <div className="book-authors">{data.authors || '---'}</div>
        </div>
      </li>
    )
  }
}

export default Book