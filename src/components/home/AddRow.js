import React from 'react';

class AddRow extends React.Component {
  constructor(props) {
    super(props);

    this.cellWidth = props.cellWidth;
    this.company = props.company;

    // get list of column names
    this.columns = Object.keys(this.company);
  }

  render() {
    return (
      <div className="newRow">
        {this.columns.map((column, i) =>
          // set header rows to width of 150px, starting at 30px from the left to create a margin
          <div className="addRowGroup" key={i}>
            <div
              index={i}
              className="addRowCell"
              aria-label="New Row"
            >
                <input type="text"
                    placeholder={column}
                    style={{width:120}}
                    searchfield={column}
                    onBlur={this.props.onBlur}
                    aria-label={`${column} input field`}
                    className="addInput" />
            </div>
          </div>
        )}
        <button type="button"
            className="btn btn-primary"
            onClick={this.props.onAdd}
            style={{marginBottom:20}}>
            Add Row
        </button>
      </div>
    )
  }
}
export default AddRow;
