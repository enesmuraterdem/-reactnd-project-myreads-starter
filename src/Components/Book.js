import React from 'react'


class Book extends React.Component {
  state = {
    shelfValue: ''
  }

  shelveOptions = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
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
                    .filter(key => key !== data.shelf)
                    .map(key => (
                      <option key={key} value={key}>{this.shelveOptions[key]}</option>
                    ))
                }
                <option value="none">None</option>
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