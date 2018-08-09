import React from 'react';
import CompanyRow from './companyRow';
import HeaderRow from './HeaderRow';
import AddRow from './AddRow';
import appData from '../../assets/data.txt'

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            appData: appData.appData, // set data to be used for grid
            allData: appData.appData, // save all data to replace filtered results,
            prevResults: appData.appData, // allow for previous search results to hold over for additional searches on othere columns
            cellWidth: 150,
            sortOrder: 'asc',
            sortCol: '',
            sortedIndex: -1,
            resizeHeaderIndex: -1,
            resizeHeaderWidth: 150,
            showAddRow: false
        };

        this.headerClick = this.headerClick.bind(this);
        this.getColumnName = this.getColumnName.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.filterResults = this.filterResults.bind(this);
        this.updateField = this.updateField.bind(this);
        this.showRow = this.showRow.bind(this);
        this.hideRow = this.hideRow.bind(this);
        this.addRow = this.addRow.bind(this);
        this.setAddRowClass = this.setAddRowClass.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    deleteRow(e, rowNum){
        let data = [...this.state.appData];

        data = data.filter((row,i) => i != rowNum);

        this.setState({ appData: data});
    }

    addRow(e){
        let data = [...this.state.allData],
            newRow = {},
            addInputs = document.getElementsByClassName('addInput');

        Object.keys(addInputs).forEach(function(input,index) {
            let field = addInputs[input],
                inputVal = field.value,
                fieldName = field.getAttribute('searchfield');

            newRow[fieldName] = inputVal;

            // reset fields
            field.value = '';
        });

        data.push(newRow);
        this.setState({appData: data, showAddRow: false});
    }

    showRow(){
        this.setState({showAddRow: true});
    }

    hideRow(){
        this.setState({showAddRow: false});
    }

    setAddRowClass(){
        if(this.state.showAddRow){
            return 'addRow';
        } else {
            return 'addRow hidden';
        }
    }

    updateField(e, rowNum){
        let data = this.state.appData,
            inputVal = e.target.value,
            dataColumn = e.target.getAttribute('datacolumn');

        // update value of columnName
        data[rowNum][dataColumn] = inputVal;

        this.setState({ appData: data});
    }

  filterResults(e){
    let data = [...this.state.allData],
        inputVal,
        fieldName,
        inputs = document.querySelectorAll('.searchInput'), // get all search inputs
        searchFieldsBlank = true; // initially, assume all search fields to be empty

    // function to test if field should be filtered
    function fieldTest(row,index){
        // if field is boolean, search by true/false or yes/no
        if(typeof row[fieldName] === 'boolean'){
            if(row[fieldName] && ( inputVal === 'true' || inputVal === 'yes' )){
                return true;
            } else if (!row[fieldName] && ( inputVal === 'false' || inputVal === 'no' )){
                return true;
            } else {
                return true;
            }
        } else {
            return row[fieldName].toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
        }
    }

    inputs.forEach(function(input,index) {
        inputVal = input.value,
        fieldName = input.getAttribute('searchfield');

        // if a field has a value, update searchFieldsBlank

        if(inputVal.length > 0){
            searchFieldsBlank = false;
        }

        // update data
        data = data.filter(fieldTest);
    });

    // if fields are not blank, update state with filtered data
    if(!searchFieldsBlank){
        this.setState({appData: data});
    } else {
        this.setState({appData: this.state.allData});
    }
  }

  headerClick(e){
    let columnIndex = e.target.getAttribute('index'),
        sortCol = this.getColumnName(columnIndex),
        sortedArray = [...this.state.appData],
        curSort = this.state.sortOrder,
        that = this;

    // we're not sorting, so stop sort and filter results
    if(columnIndex === null){
      return;
    }

    // get width of resized column
    let headerCells = document.getElementsByClassName('headerCell');
    let headerCell = headerCells[columnIndex];

    sortedArray.sort(function(a, b){

      let keyA = a[sortCol],
          keyB = b[sortCol];

      // check if column is a date for sorting
      let colIsDate = !isNaN(Date.parse(keyA));

      if(colIsDate) {
        keyA = new Date(keyA),
        keyB = new Date(keyB);
      }
      // compare numbers
      else if (!isNaN(keyA)) {
        if(curSort === 'asc'){
          that.setState({ sortOrder:'desc' });

          return keyA - keyB;
        }
        else {
          that.setState({ sortOrder:'asc' });

          return keyB - keyA;
        }
      }

      // Compare the 2 columns
      if(curSort === 'asc') {
        that.setState({ sortOrder:'desc' });

        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      } else {
        that.setState({ sortOrder:'asc' });

        if(keyB < keyA) return -1;
        if(keyB > keyA) return 1;
        return 0;
      }
    });

    this.setState({ appData:sortedArray, sortCol, sortedIndex: columnIndex, colWidth: headerCell.style.width });
  }

  handleResize(e) {
    let resizeHeaderIndex = e.target.getAttribute('index');
    let resizeHeaderWidth = e.target.clientWidth;

    this.setState({resizeHeaderIndex, resizeHeaderWidth});
  }

  getColumnName(index){
    let appData = this.state.appData,
        columnNames = Object.keys(appData[0]),
        sortCol = columnNames[index];

        return sortCol;
  }

  render() {
    let appData = this.state.appData;

      return (
          <div>
            <h1>ServiceNow Exercise</h1>

            <div className={this.state.showAddRow ? 'addRowIcon hidden' : 'addRowIcon'} onClick={this.showRow} aria-label="Show Add New Row"></div>
            <div className={this.state.showAddRow ? 'hideRowIcon' : 'hideRowIcon hidden'} onClick={this.hideRow} aria-label="Hide Add New Row"></div>

            <div className={this.setAddRowClass()}>
                <AddRow
                  key={1}
                  company={appData[0]}
                  cellWidth={this.state.cellWidth}
                  onAdd={this.addRow}
                />
            </div>

            <div className="dataPanel">
                <HeaderRow
                  key={1}
                  company={appData[0]}
                  cellWidth={this.state.cellWidth}
                  headerClick={this.headerClick}
                  sortCol={this.state.sortCol}
                  sortOrder={this.state.sortOrder}
                  handleResize={this.handleResize}
                  onBlur={this.filterResults}
                />
                <div className="dataRows">
                  {appData.map((company, i) =>
                      <CompanyRow
                          key={company.extdesc}
                          company={company}
                          rowNum={i}
                          sortedIndex={this.state.sortedIndex}
                          resizeHeaderIndex={this.state.resizeHeaderIndex}
                          resizeHeaderWidth={this.state.resizeHeaderWidth}
                          updateField={this.updateField}
                          onDelete={this.deleteRow}
                          />
    			   )}
                </div>
            </div>
          </div>
      );
  }
}

export default HomePage;
