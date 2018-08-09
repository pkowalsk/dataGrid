import React from 'react';

class CompanyRow extends React.Component {
  constructor(props) {
    super(props);

    this.rowNum = props.rowNum;
    this.sortedIndex = props.sortedIndex;

    this.state = {
      headerIndex: -1,
      sortedIndex: props.sortedIndex,
      company: props.company,
      rowNum: props.rowNum,
      cellWidth: 151,
      isEditing: false,
      editFieldIndex: -1
    };

    this.makeEditable = this.makeEditable.bind(this);
    this.updateField = this.updateField.bind(this);
    this.getTextClass = this.getTextClass.bind(this);
    this.getInputClass = this.getInputClass.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  // update sortColumn whenever it is updated from parent component
  componentWillReceiveProps(newProps) {
    this.setState({ sortedIndex: newProps.sortedIndex, company: newProps.company, rowNum: newProps.rowNum });
  }

  deleteRow(e){
      this.props.onDelete(e, this.state.rowNum);
  }

  makeEditable(e){
      this.setState({ isEditing: true, editFieldIndex: e.target.getAttribute('index') });
  }

  updateField(e){
      this.setState({ isEditing: false, editFieldIndex: -1 });
      this.props.updateField(e, this.state.rowNum);
  }

  getTextClass(index){
      if(this.state.isEditing && index == this.state.editFieldIndex){
          return 'cellText hidden';
      } else {
          return 'cellText';
      }
  }

  getInputClass(index){
      if(this.state.isEditing && index == this.state.editFieldIndex){
          return 'cellInput';
      } else {
          return 'cellInput hidden';
      }
  }

  render() {
    // get list of column names
    let columns = Object.keys(this.state.company),
        curState = this.state;

    // calculate data cell width to match width of header cells
    function getWidth(i){
      let headerCells = document.getElementsByClassName('headerCell');
      let headerCell = headerCells[i];

      if(headerCell !== undefined){
        return headerCell.offsetWidth;
      } else {
        return ''
      }
    }

    function formatDataCell(column){
      let data = curState.company[column];

      // if we have a number, treat the data as currency
      // if data is boolean, return Yes or No
      if(isNumeric(data)) {
        return parseFloat(data).formatMoney(2);
      } else if (typeof data == 'boolean'){
        if(data === true){
          return 'Yes';
        } else {
          return 'No';
        }
      } else {
        return data;
      }
    }

    // test if an input is a float or int
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // take number and convert it to currency
    Number.prototype.formatMoney = function(c, d, t){
      var n = this,
      c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "- $" : "$",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
   };

    return (
      <div className="dataRow" >
      <div className="dataCell" style={{width: 40}}>
        <div className="deleteIcon" onClick={this.deleteRow}></div>
      </div>

        {columns.map((column, i) =>
          // set header rows to width of 100px, starting at 100px from the left to create a margin
          <div className="dataCell" key={i} style={{width: getWidth(i) }} >
            <div className="innerDataCell">
                <span
                    className={this.getTextClass(i)}
                    index={i}
                    onClick={this.makeEditable}>
                        {formatDataCell(column)}
                </span>
                <input
                    className={this.getInputClass(i)}
                    datacolumn={column}
                    type="text"
                    defaultValue={formatDataCell(column)}
                    onBlur={this.updateField} />
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default CompanyRow;
