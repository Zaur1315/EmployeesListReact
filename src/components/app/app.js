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
      ]
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


  onToggleIncrease = (id)=>{
    // this.setState(({data})=>{
    //   const index = data.findIndex(elem => elem.id ===id);

    //   const old = data[index];
    //   const newItem = {...old, increase: !old.increase};
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //   return {
    //     data: newArr
    //   }
    // })

    this.setState(({data})=>({
      data: data.map(item => {
        if( item.id === id){
          return {...item, increase: !item.increase}
        }
        return item;
      })
    }))
  }

  onToggleRaise = (id)=>{
    console.log(`Raise this ${id}`)

    
  }

render(){
  const employees = this.state.data.length;
  const increased = this.state.data.filter(item => item.increase).length;

  return (
    <div className="app">
        <AppInfo />
        <div className="search-panel">
            <SearchPanel/>
            <AppFilter/>
        </div>
        
        <EmployeesList 
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRaise={this.onToggleRaise}
        />
        <EmployeesAddForm
          onAdd={this.addItem}
        />
    </div>
  );
}
}

export default App;
