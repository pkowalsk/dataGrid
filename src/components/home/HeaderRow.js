import React from 'react';

class HeaderRow extends React.Component {
  constructor(props) {
    super(props);

    this.cellWidth = props.cellWidth;
    this.company = props.company;

    this.state = {
      headerIndex: -1,
      sortCol: props.sortCol,
      sortOrder: ''
    };

    // get list of column names
    this.columns = Object.keys(this.company);
  }

  // update sortColumn whenever it is updated from parent component
  componentWillReceiveProps(newProps) {
    this.setState({ sortCol: newProps.sortCol, sortOrder: newProps.sortOrder });
  }

  render() {
    // find out which class to assign the header cell up/down sort
    function headerClassName(sortCol, columnName, sortOrder) {
      if (sortCol === columnName && sortOrder === '')
        return ' sortedAscCol'
      // className is reverse of sortOrder due to state update occurring in parent
      else if (sortCol === columnName && sortOrder === 'desc')
        return ' sortedAscCol'
      else if (sortCol === columnName && sortOrder === 'asc')
        return ' sortedDescCol'
      else
        return ' unsortedCol'
    }

    return (
      <div className="headerRow">
        <div className="headerGroup" style={{verticalAlign: "bottom"}}>
          <div
            style={{width: 40 }}
            className="staticHeaderCell"
            />
        </div>
        {this.columns.map((column, i) =>
          // set header rows to width of 150px, starting at 30px from the left to create a margin
          <div className="headerGroup" key={i}>
            <div
              index={i}
              className="headerCell"
              onClick={this.props.headerClick}
              onMouseUp={this.props.handleResize}
              aria-label="Sort and Resize"
            >
              <input  type="text"
                      placeholder={column}
                      style={{width:100}}
                      searchfield={column}
                      onBlur={this.props.onBlur}
                      aria-label={`${column} search field`}
                      className="searchInput" />

              <div className={headerClassName(this.state.sortCol, column, this.state.sortOrder)} aria-label="Sort Direction"></div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default HeaderRow;
