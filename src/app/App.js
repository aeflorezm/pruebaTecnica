import React, {Component} from 'react';

class App extends Component {
    constructor(){
       super();
       this.state={
           title:'',
           description:'',
           prioridad:'',
           tasks:[]
       };
       this.agregarTarea=this.agregarTarea.bind(this);
       this.handleChange=this.handleChange.bind(this);
    }
    agregarTarea(e){
        // console.log(this.state)
        fetch('/api/tasks',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            
            this.setState({title:'', description:'',prioridad:''})
        })
        .catch(res=>console.log(res))
        e.preventDefault();
        this.obtenerTareas()
        
    }

    componentDidMount(){
        this.obtenerTareas()
        
    }

    obtenerTareas(){
        fetch('/api/tasks')
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
           this.setState({tasks:data})
           console.log(this.state.tasks)
            
        })
    }

    eliminarTarea(id){
        let bodyReq={"id":id};
        fetch('/api/tasks/',{
            method:'DELETE',
            body:JSON.stringify(bodyReq),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
        
        this.obtenerTareas()

        console.log("Eliminando:"+id)
    }

    handleChange(e){
        console.log(e.target.name)
        const {name,value}= e.target;
        this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <div style={{backgroundColor:'#313a3d', height:'100%'}}  className=".container-fluid" >
            <h4 style={{color:'white'}}>Bienvenido a tu lista de tareas</h4>
           <div className="row" >
        
           

           <div  className="col-sm-7">
           

           
            
           
            {
                this.state.tasks.map(task =>{
                    return(
                        <div key={task._id}>
                        
                        <div className={`alert alert-${task.prioridad}`}   >{task.description}  <button
                        onClick={ () => this.eliminarTarea(task._id)} 
                        className="btn red"
                        >
                          <i className="material-icons"> delete </i>

                       </button>

                       <button 
                        style={{margin:'4px'}}
                         className="btn light-blue darken-4">
                         <i className="material-icons" >edit</i>
                        </button>
                       </div>

                       
                       {/** <div>{task.description}</div>*/}

                       
                       {/**   */}
                       
                        
                       
                       
                        </div>
                    )
                })
            }
            
         

            </div>

            <div className="col s5">
            <h4 style={{color:'white'}}>Tarea</h4>
              <div className="card">
              
              <div className="card-content d-flex justify-content-center">
              <form onSubmit={this.agregarTarea}>
              <div className="row">
               <div className="input-field col s12"
                >

                <input
                    className="form-control"
                    onChange={this.handleChange}
                    name="title"  
                    placeholder="Titulo" 
                    type="text"
                    value={this.state.title}
                    />

               </div>

               

              </div>
              <div className="column">

              <div style={{display:'flex'}}>
              
              </div>

              <div className="input-field col s12"
                >

                <input
                   className="form-control mr-5"
                    onChange={this.handleChange}
                    name="prioridad"  
                    placeholder="Prioridad" 
                    type="text"
                    value={this.state.prioridad}
                    />

               </div>
              
               <div className="input-field col s12"
                >
               

                <textarea  
                    className="form-control"
                    onChange={this.handleChange}
                    className="materialize-textarea"
                    name="description"
                    placeholder="contenido" 
                    type="text"
                    value={this.state.description}
                    >
                    </textarea>

               </div>

              </div>
              
              <button type="submit" className="btn btn-primary ml-2">
              Agregar
              </button>
            </form>
              
              </div>
              </div>
            </div>

            


           </div>
            
           
            
            </div>
        )
    }
}

export default App;