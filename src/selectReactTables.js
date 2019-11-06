import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import getSchoolsList from '../Actions/Index'; 
    import ReactTable from "react-table";
    import checkboxHOC from "react-table/lib/hoc/selectTable";
    import "react-table/react-table.css";


    const CheckboxTable = checkboxHOC(ReactTable);


    class Home extends Component {

      constructor(props){
        super(props);
        this.state = {
          selection: [],
          selectAll: false
        };
      }

      componentDidMount(){
        this.props.getSchoolsList();
      }



      toggleSelection = (key, shift, row) => {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if (keyIndex >= 0) {
          selection = [
            ...selection.slice(0, keyIndex),
            ...selection.slice(keyIndex + 1)
          ];
        } else {
          selection.push(key);
        }
        this.setState({ selection });
      };

      toggleAll = () => {
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
          const wrappedInstance = this.checkboxTable.getWrappedInstance();
          const currentRecords = wrappedInstance.getResolvedState().sortedData;
          currentRecords.forEach(item => {
            selection.push(item._original._id);
          });
        }
        this.setState({ selectAll, selection });
      };

      isSelected = key => {
        console.log(key);
        return this.state.selection.includes(key);
      };

      logSelection = () => {
        console.log("selection:", this.state.selection);
      };
        render() {
          const { toggleSelection, toggleAll, isSelected, logSelection } = this;
          const { selectAll } = this.state;

        const checkboxProps = {
          selectAll,
          isSelected,
          toggleSelection,
          toggleAll,
          selectType: "checkbox",
        };
          const data = this.props.StateData?this.props.StateData.data:[];
          const {loading, StateData} = this.props;
        if (loading) {
          {console.log(loading)}
          return <div>Loading...</div>;
        }
        return (
          <div>
          {console.log(this.checkboxTable)}
          <button onClick={logSelection}>Log Selection</button>
          <CheckboxTable
            ref={r => (this.checkboxTable = r)}
            data={data}
            columns={[
              {
                Header: "School Name",
                accessor: "name"
              },
              {
                Header: "Location",
                id: "lastName",
                accessor: d => d.area + ',' + d.city
              },
              {
                Header: "Curriculum",
                accessor: "curriculum"
              },

              {
                Header: "Grade",
                accessor:"grade"
              },
              {
                Header: "Web App_URL",
                accessor: "webapp_url",
              },
              {
                Header: "Status",
                id: "status",
                accessor: d =>{
                  if(d.publish === true){
                    console.log(d.publish)
                    return 'Publish';
                  }else{
                    return 'Unpublished'
                  }
                }
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            {...checkboxProps}
          />
        </div>
        );
        }
    }

    function mapStateToProps (state) {
      return {
        StateData:state.login.schools,
        loading: state.login.loading,
      }
    };  

    export default connect(mapStateToProps, {getSchoolsList})(Home);