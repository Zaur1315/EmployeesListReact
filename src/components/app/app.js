import { Component } from 'react/cjs/react.production.min';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      data : [
        {name:'Edward Northan' , salary: 800, increase: false, id: 1, raise: true},
        {name:'John Smith' , salary: 1000, increase: true, id: 2, raise: false},
        {name:'Alex Michael' , salary: 1200, increase: false, id: 3, raise: false}
      ],
      term: '', 
      filter:'all'
    }
    this.maxId = 4;
  }

  addItem = (name, salary) =>{
      const newItem = {
        name,
        salary,
        increase: false,
        raise: false,
        id: this.maxId++
      }
      this.setState(({data})=>{
        const newArr = [...data, newItem];
        return {
          data: newArr
        }
      });
    }
    


  deleteItem = (id)=>{
    this.setState(({data})=>{
      return {
        data: data.filter(elem => elem.id !== id)
      }
    })
  }



  onToggleProp = (id, prop)=>{
    this.setState(({data})=>({
      data: data.map(item => {
        if( item.id === id){
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }
  searchEmp = (items, term) =>{
      if (term.length === 0){
        return items;
      }

      return items.filter(item => {
        return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
      })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) =>{
    switch(filter){
      case 'raise':
        return items.filter(item => item.raise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter)=>{
    this.setState({filter});
  }

render(){
  const {data, term, filter} = this.state;
  const employees = this.state.data.length;
  const increased = this.state.data.filter(item => item.increase).length;
  const visibleData = this.filterPost(this.searchEmp(data, term), filter);

  return (
    <div className="app">
        <AppInfo employees={employees} increased={increased}/>
        <div className="search-panel">
            <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
        </div>
        
        <EmployeesList 
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          
        />
        <EmployeesAddForm
          onAdd={this.addItem}
        />
    </div>
  );
}
}

export default App;
